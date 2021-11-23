import { Container, Content } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	AppHeader,
	AppSwitcher,
	ListCreator,
	SectionTitle,
	TimeInput,
} from '../components';
import Colors from '../constants/Colors';
import { IStage, NavigationParamsProp } from '../utils/types';

const RuleScreen = ({ route, navigation }: NavigationParamsProp) => {
	const { rule } = route.params;
	const [stages, setStages] = useState<Array<IStage>>([]);
	const [hasDelay, setHasDelay] = useState<boolean>(false);
	const [delaySameForBoth, setDelaySameForBoth] = useState<boolean>(true);
	const [delayPlayer1, setDelayPlayer1] = useState<Number>(0);
	const [delayPlayer2, setDelayPlayer2] = useState<Number>(0);

	const handleAddDelay = () => {
		if (hasDelay) {
			setHasDelay(false);
		} else {
			setHasDelay(true);
		}
	};
	const handleDelayValue = () => {
		if (delaySameForBoth) {
			setDelaySameForBoth(false);
		} else {
			setDelaySameForBoth(true);
		}
	};

	useEffect(() => {
		if (rule) {
			setStages(rule.stages);
		}
	}, []);

	const handleSave = () => {
		navigation.goBack();
	};

	const styles = StyleSheet.create({
		content: {
			paddingVertical: 10,
			paddingHorizontal: 20,
		},
		section: {
			marginTop: 20,
		},
		sectionHeader: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
		},
		sectionContent: {
			padding: 10,
			marginTop: 10,
			backgroundColor: Colors.sectionBackground,
		},
	});

	return (
		<Container>
			<AppHeader title={rule.name} onSave={handleSave} hasSave hasGoBack />
			<Content style={styles.content}>
				<ListCreator
					title="Stages"
					buttonTitle="New Stage"
					listData={stages}
					itemName="Stage"
				/>
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<SectionTitle text="Delay" />
						<AppSwitcher
							noMargin
							value={hasDelay}
							onValueChange={handleAddDelay}
						/>
					</View>
					<View style={styles.sectionContent}>
						<AppSwitcher
							label="Same for both"
							value={delaySameForBoth}
							onValueChange={handleDelayValue}
						/>
						<TimeInput label={!delaySameForBoth ? 'Player 1' : undefined} />
						{!delaySameForBoth && (
							<View style={{ marginTop: 10 }}>
								<TimeInput label="Player 2" />
							</View>
						)}
					</View>
				</View>
			</Content>
		</Container>
	);
};

export default RuleScreen;
