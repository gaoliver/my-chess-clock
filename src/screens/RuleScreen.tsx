import { Container, Content } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
	AlertModal,
	AppCheckbox,
	AppHeader,
	AppModal,
	AppSwitcher,
	ListCreator,
	MainButton,
	SectionTitle,
	TimeInput,
} from '../components';
import Colors from '../constants/Colors';
import { ApplicationState } from '../redux';
import { IRule, IStage, NavigationParamsProp } from '../utils/types';
import * as gameActions from '../redux/actions';

const RuleScreen = ({ route, navigation }: NavigationParamsProp) => {
	const { rule } = route.params;
	const { settings } = useSelector((state: ApplicationState) => state);
	const ruleset = settings.ruleset;
	const dispatch = useDispatch();

	const [stages, setStages] = useState<Array<IStage>>([]);
	const [name, setName] = useState<string>('');
	const [delayPlayer1, setDelayPlayer1] = useState<number>(0);
	const [delayPlayer2, setDelayPlayer2] = useState<number>(0);
	const [incrementPlayer1, setIncrementPlayer1] = useState<number>(0);
	const [incrementPlayer2, setIncrementPlayer2] = useState<number>(0);
	const [selectedStage, setSelectedStage] = useState<number | undefined>(
		undefined
	);
	const [stageModalOptions, setStageModalOptions] = useState<boolean>(false);
	const [hasDelay, setHasDelay] = useState<boolean>(false);
	const [delaySameForBoth, setDelaySameForBoth] = useState<boolean>(false);
	const [hasIncrement, setHasIncrement] = useState<boolean>(false);
	const [incrementSameForBoth, setIncrementSameForBoth] =
		useState<boolean>(false);
	const [incrementType, setIncrementType] = useState<
		'fischer' | 'bronstein' | null
	>(null);

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

	const handleIncrementValue = () => {
		if (incrementSameForBoth) {
			setIncrementSameForBoth(false);
		} else {
			setIncrementSameForBoth(true);
		}
	};

	const handleIncrement = () => {
		if (hasIncrement) {
			setHasIncrement(false);
		} else {
			setHasIncrement(true);
			setIncrementType('fischer');
		}
	};

	const handleIncrementType = () => {
		if (incrementType === 'fischer') {
			setIncrementType('bronstein');
		} else {
			setIncrementType('fischer');
		}
	};

	const handleModalOptions = (id: number) => {
		setSelectedStage(id);
		setStageModalOptions(true);
	};

	const onPressEdit = () => {
		setStageModalOptions(false);
		let thisStage = stages.find((item) => item.id === selectedStage);
		navigation.navigate('StageScreen', { stage: thisStage, ruleId: rule?.id });
	};

	const onPressDelete = () => {
		let stageIndex = stages.findIndex((item) => item.id === selectedStage);
		if (selectedStage) {
			stages.splice(stageIndex - 1, 1);
		}
		setStageModalOptions(false);
	};

	const handleSave = () => {
		let newSettings = settings;
		let saveData: IRule = {
			id: rule ? rule.id : Math.random() * 135,
			name: name,
			delay: hasDelay,
			delayPlayer1: delayPlayer1,
			delayPlayer2: delayPlayer2,
			increment: hasIncrement ? incrementType : null,
			fischerPlayer1: incrementType === 'fischer' ? incrementPlayer1 : 0,
			fischerPlayer2: incrementType === 'fischer' ? incrementPlayer2 : 0,
			bronsteinPlayer1: incrementType === 'bronstein' ? incrementPlayer1 : 0,
			bronsteinPlayer2: incrementType === 'bronstein' ? incrementPlayer2 : 0,
			stages: stages,
		};
		if (rule) {
			let ruleIndex = ruleset.findIndex((thisRule) => thisRule.id === rule.id);
			ruleset[ruleIndex] = saveData;
			newSettings.ruleset = ruleset;
		} else {
			newSettings.ruleset.push(saveData);
		}
		dispatch(gameActions.setSettings(newSettings));
		navigation.goBack();
	};

	useEffect(() => {
		if (rule) {
			setStages(rule.stages);
			setName(rule.name);
			if (rule.delay) {
				setHasDelay(true);
				setDelaySameForBoth(false);
				setDelayPlayer1(rule.delayPlayer1);
				setDelayPlayer2(rule.delayPlayer2);
			}
			if (rule.increment !== null) {
				setHasIncrement(true);
				setIncrementType(rule.increment);
				setIncrementPlayer1(
					rule.increment === 'bronstein'
						? rule.bronsteinPlayer1
						: rule.fischerPlayer1
				);
				setIncrementPlayer2(
					rule.increment === 'bronstein'
						? rule.bronsteinPlayer2
						: rule.fischerPlayer2
				);
			}
		}
	}, []);

	useEffect(() => {
		if (delaySameForBoth) {
			setDelayPlayer2(delayPlayer1);
		}
	}, [delaySameForBoth, delayPlayer1, delayPlayer2]);

	useEffect(() => {
		if (incrementSameForBoth) {
			setIncrementPlayer2(incrementPlayer1);
		}
	}, [incrementSameForBoth, incrementPlayer1, incrementPlayer2]);

	useEffect(() => {
		if (!hasIncrement) {
			setIncrementType(null);
		}
	}, [hasIncrement]);

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
		input: {
			width: '100%',
			padding: 10,
			borderWidth: 1,
			borderColor: Colors.screenTextColor,
			backgroundColor: Colors.sectionBackground,
			marginBottom: 30,
			borderRadius: 10,
		},
	});

	return (
		<Container>
			<AppHeader
				title={name ? 'Edit Rule' : 'New Rule'}
				onSave={handleSave}
				hasSave
				hasGoBack
			/>
			<Content style={styles.content}>
				<TextInput
					value={name}
					onChangeText={(value) => setName(value)}
					style={styles.input}
					placeholder="Write a name"
				/>
				<ListCreator
					title="Stages"
					buttonTitle="New Stage"
					listData={stages}
					itemName="Stage"
					onPressItem={handleModalOptions}
					onPressButton={() => {
						navigation.navigate('StageScreen', { ruleId: rule?.id });
					}}
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
					{hasDelay && (
						<View style={styles.sectionContent}>
							<AppSwitcher
								label="Same for both"
								value={delaySameForBoth}
								onValueChange={handleDelayValue}
							/>
							<TimeInput
								label={!delaySameForBoth ? 'Player 1' : undefined}
								interval={delayPlayer1}
								onChangeTime={(value) => setDelayPlayer1(value)}
							/>
							{!delaySameForBoth && (
								<View style={{ marginTop: 10 }}>
									<TimeInput
										label="Player 2"
										interval={delayPlayer2}
										onChangeTime={(value) => setDelayPlayer2(value)}
									/>
								</View>
							)}
						</View>
					)}
				</View>
				<View style={[styles.section, { marginBottom: 50 }]}>
					<View style={styles.sectionHeader}>
						<SectionTitle text="Increment" />
						<AppSwitcher
							noMargin
							value={hasIncrement}
							onValueChange={handleIncrement}
						/>
					</View>
					{hasIncrement && (
						<View style={styles.sectionContent}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									paddingHorizontal: 10,
									marginBottom: 10,
								}}
							>
								<AppCheckbox
									label="Fischer"
									value={incrementType === 'fischer'}
									onValueChange={handleIncrementType}
								/>
								<AppCheckbox
									label="Bronstein"
									value={incrementType === 'bronstein'}
									onValueChange={handleIncrementType}
								/>
							</View>
							<AppSwitcher
								label="Same for both"
								value={incrementSameForBoth}
								onValueChange={handleIncrementValue}
							/>
							<TimeInput
								label={!incrementSameForBoth ? 'Player 1' : undefined}
								interval={incrementPlayer1}
								onChangeTime={(value) => setIncrementPlayer1(value)}
							/>
							{!incrementSameForBoth && (
								<View style={{ marginTop: 10 }}>
									<TimeInput
										label="Player 2"
										interval={incrementPlayer2}
										onChangeTime={(value) => setIncrementPlayer2(value)}
									/>
								</View>
							)}
						</View>
					)}
				</View>
				<AlertModal
					visible={stageModalOptions}
					onDismiss={() => setStageModalOptions(false)}
					hide="set"
					onPressEdit={onPressEdit}
					onPressRemove={onPressDelete}
				/>
			</Content>
		</Container>
	);
};

export default RuleScreen;
