import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Container, Content } from 'native-base';

import { AppHeader, AppSwitcher, TimeInput } from '../components';
import Colors from '../constants/Colors';
import { StackParamList } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../redux';
import * as gameActions from '../redux/actions';

export type NavigationParamsProp = NativeStackScreenProps<
	StackParamList,
	'StageScreen'
>;

const StageScreen = ({ route, navigation }: NavigationParamsProp) => {
	const { stage, ruleId } = route.params;
	const { settings } = useSelector((state: ApplicationState) => state);
	const dispatch = useDispatch();

	const [constantTrue, setconstantTrue] = useState<boolean>(false);
	const [counterSameForBoth, setCounterSameForBoth] = useState<boolean>(false);
	const [counterPlayer1, setCounterPlayer1] = useState<number>(0);
	const [counterPlayer2, setCounterPlayer2] = useState<number>(0);
	const [stageHasMovements, setstageHasMovements] = useState<boolean>(false);
	const [stageMovements, setStageMovements] = useState<number>(0);
	const [hasTotalTime, setHasTotalTime] = useState<boolean>(false);
	const [totalTime, setTotalTime] = useState<number>(0);

	const handleSaveStage = () => {
		let ruleIndex = settings.ruleset.findIndex((rule) => rule.id === ruleId);
		let newStage;
		let newSettings = settings;
		if (stage !== undefined) {
			let stageIndex = settings.ruleset[ruleIndex].stages.findIndex(
				(item) => item.id === stage.id
			);
			newStage = {
				...stage,
				maxTime: totalTime,
				movements: stageMovements,
				timePlayer1: counterPlayer1,
				timePlayer2: counterPlayer2,
			};
			newSettings.ruleset[ruleIndex].stages[stageIndex] = newStage;
		} else {
			newStage = {
				id: Math.random() * 135,
				maxTime: totalTime,
				movements: stageMovements,
				timePlayer1: counterPlayer1,
				timePlayer2: counterPlayer2,
			};
			newSettings.ruleset[ruleIndex].stages.push(newStage);
		}
		dispatch(gameActions.setSettings(newSettings));
		navigation.goBack();
	};

	useEffect(() => {
		setCounterPlayer1(counterPlayer1);
		if (counterSameForBoth) {
			setCounterPlayer2(counterPlayer1);
		} else {
			setCounterPlayer2(counterPlayer2);
		}
	}, [counterSameForBoth, counterPlayer1, counterPlayer2]);

	useEffect(() => {
		if (!stageHasMovements) {
			setStageMovements(0);
		}
	}, [stageHasMovements]);

	useEffect(() => {
		if (!hasTotalTime) {
			setTotalTime(0);
		}
	}, [hasTotalTime]);

	useEffect(() => {
		setconstantTrue(true);
		if (stage) {
			setCounterSameForBoth(false);
			setCounterPlayer1(stage.timePlayer1);
			setCounterPlayer2(stage.timePlayer2);
			if (stage.movements > 0) {
				setstageHasMovements(true);
				setStageMovements(stage.movements);
			}
			if (stage.maxTime > 0) {
				setHasTotalTime(true);
				setTotalTime(stage.maxTime);
			}
		} else {
			setCounterSameForBoth(false);
			setCounterPlayer1(0);
			setCounterPlayer2(0);
			setstageHasMovements(false);
			setStageMovements(0);
			setHasTotalTime(false);
			setTotalTime(0);
		}
	}, [stage]);

	const styles = StyleSheet.create({
		content: {
			padding: 20,
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
		stageInnerFieldView: {
			backgroundColor: Colors.sectionBackground,
			padding: 10,
		},
	});

	return (
		<Container>
			<AppHeader
				title={stage ? 'Edit Stage' : 'New Stage'}
				hasGoBack
				hasSave
				onSave={handleSaveStage}
			/>
			<Content style={styles.content}>
				<View>
					<AppSwitcher
						label="Same turn timer for both"
						value={counterSameForBoth}
						onValueChange={() =>
							setCounterSameForBoth((value) => (value ? false : true))
						}
					/>
					{constantTrue && (
						<View style={styles.stageInnerFieldView}>
							<TimeInput
								label={counterSameForBoth ? undefined : 'Player 1'}
								interval={counterPlayer1}
								onChangeTime={(value) => setCounterPlayer1(value)}
								padding
							/>
							{!counterSameForBoth && (
								<TimeInput
									label={'Player 2'}
									interval={counterPlayer2}
									onChangeTime={(value) => setCounterPlayer2(value)}
									padding
								/>
							)}
						</View>
					)}
				</View>
				<View>
					<AppSwitcher
						label="Maximum movements"
						value={stageHasMovements}
						onValueChange={() =>
							setstageHasMovements((value) => (value ? false : true))
						}
					/>
					{stageHasMovements && (
						<TextInput
							style={[styles.input, { marginTop: 10 }]}
							value={stageMovements.toFixed()}
							onChangeText={(value) => {
								setStageMovements(Number(value));
							}}
							keyboardType="numeric"
						/>
					)}
				</View>
				<View>
					<AppSwitcher
						label="Total time"
						value={hasTotalTime}
						onValueChange={() =>
							setHasTotalTime((value) => (value ? false : true))
						}
					/>
					{hasTotalTime && (
						<View style={styles.stageInnerFieldView}>
							<TimeInput
								interval={totalTime}
								onChangeTime={(value) => setTotalTime(value)}
								padding
							/>
						</View>
					)}
				</View>
			</Content>
		</Container>
	);
};

export default StageScreen;
