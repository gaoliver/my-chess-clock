import React, { useEffect, useReducer } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Container, Content } from 'native-base';

import { AppHeader, AppSwitcher, TimeInput } from '../components';
import Colors from '../constants/Colors';
import {
	IStageState,
	StackParamList,
	StageActions,
	StageFieldOptions,
} from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../redux';
import * as gameActions from '../redux/actions';

export type NavigationParamsProp = NativeStackScreenProps<
	StackParamList,
	'StageScreen'
>;

function reducer(
	state: IStageState,
	action: { type: StageActions; payload?: any }
) {
	switch (action.type) {
		case StageActions.SetCounterPlayer1:
			return {
				...state,
				counterPlayer1: action.payload,
			};
		case StageActions.SetCounterPlayer2:
			return {
				...state,
				counterPlayer2: action.payload,
			};
		case StageActions.SetMovements:
			return {
				...state,
				stageMovements: action.payload,
			};
		case StageActions.SetTotalTime:
			return {
				...state,
				totalTime: action.payload,
			};
		case StageActions.SetStageValues:
			return {
				counterSameForBoth: false,
				counterPlayer1: action.payload.timePlayer1,
				counterPlayer2: action.payload.timePlayer2,
				stageHasMovements: action.payload.movements > 0 ? true : false,
				stageMovements: action.payload.movements,
				hasTotalTime: action.payload.maxTime > 0 ? true : false,
				totalTime: action.payload.maxTime,
			};
		case StageActions.SetCounterSameForBoth:
			return {
				...state,
				counterSameForBoth: state.counterSameForBoth ? false : true,
			};
		case StageActions.SetHasMovements:
			return {
				...state,
				stageHasMovements: state.stageHasMovements ? false : true,
			};
		case StageActions.SetHasTotalTime:
			return {
				...state,
				hasTotalTime: state.hasTotalTime ? false : true,
			};
		default:
			return state;
	}
}

const StageScreen = ({ route, navigation }: NavigationParamsProp) => {
	const { stage, ruleId } = route.params;
	const { settings } = useSelector((state: ApplicationState) => state);
	const dispatch = useDispatch();

	const stageInitialState: IStageState = {
		counterSameForBoth: false,
		counterPlayer1: 0,
		counterPlayer2: 0,
		stageHasMovements: false,
		stageMovements: 0,
		hasTotalTime: false,
		totalTime: 0,
	};

	const [state, stateDispatch] = useReducer(reducer, stageInitialState);

	const handleInput = (field: StageFieldOptions, value: any) => {
		switch (field) {
			case StageFieldOptions.CounterPlayer1:
				return stateDispatch({
					type: StageActions.SetCounterPlayer1,
					payload: value,
				});
			case StageFieldOptions.CounterPlayer2:
				return stateDispatch({
					type: StageActions.SetCounterPlayer2,
					payload: value,
				});
			case StageFieldOptions.Movements:
				return stateDispatch({
					type: StageActions.SetMovements,
					payload: value,
				});
			case StageFieldOptions.TotalTime:
				return stateDispatch({
					type: StageActions.SetTotalTime,
					payload: value,
				});
			default:
				return null;
		}
	};

	const handleSaveStage = () => {
		let ruleIndex = settings.ruleset.findIndex((rule) => rule.id === ruleId);
		let newSettings = settings;
		let newStage = {
			id: stage ? stage.id : Math.random() * 135,
			maxTime: state.totalTime,
			movements: state.stageMovements,
			timePlayer1: state.counterPlayer1,
			timePlayer2: state.counterPlayer2,
		};
		if (stage) {
			let stageIndex = settings.ruleset[ruleIndex].stages.findIndex(
				(item) => item.id === stage.id
			);
			newSettings.ruleset[ruleIndex].stages[stageIndex] = newStage;
		} else {
			if (ruleId !== undefined) {
				newSettings.ruleset[ruleIndex].stages.push(newStage);
			} else {
				return navigation.navigate('Rule', { stage: newStage });
			}
		}
		dispatch(gameActions.setSettings(newSettings));
		navigation.goBack();
	};

	useEffect(() => {
		if (state.counterSameForBoth) {
			stateDispatch({
				type: StageActions.SetCounterPlayer2,
				payload: state.counterPlayer1,
			});
		}
	}, [state.counterSameForBoth, state.counterPlayer1]);

	useEffect(() => {
		if (!state.stageHasMovements) {
			stateDispatch({ type: StageActions.SetMovements, payload: 0 });
		}
	}, [state.stageHasMovements]);

	useEffect(() => {
		if (!state.hasTotalTime) {
			stateDispatch({ type: StageActions.SetTotalTime, payload: 0 });
		}
	}, [state.hasTotalTime]);

	useEffect(() => {
		if (stage) {
			stateDispatch({ type: StageActions.SetStageValues, payload: stage });
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
						value={state.counterSameForBoth}
						onValueChange={() =>
							stateDispatch({ type: StageActions.SetCounterSameForBoth })
						}
					/>
					<View style={styles.stageInnerFieldView}>
						<TimeInput
							label={state.counterSameForBoth ? undefined : 'Player 1'}
							interval={state.counterPlayer1}
							onChangeTime={(value) =>
								handleInput(StageFieldOptions.CounterPlayer1, value)
							}
							padding
						/>
						{!state.counterSameForBoth && (
							<TimeInput
								label={'Player 2'}
								interval={state.counterPlayer2}
								onChangeTime={(value) =>
									handleInput(StageFieldOptions.CounterPlayer2, value)
								}
								padding
							/>
						)}
					</View>
				</View>
				<View>
					<AppSwitcher
						label="Maximum movements"
						value={state.stageHasMovements}
						onValueChange={() =>
							stateDispatch({ type: StageActions.SetHasMovements })
						}
					/>
					{state.stageHasMovements && (
						<TextInput
							style={[styles.input, { marginTop: 10 }]}
							// value={String(state.stageMovements ? state.stageMovements : 0)}
							value={state.stageMovements}
							onChangeText={(value) =>
								handleInput(
									StageFieldOptions.Movements,
									value.replace(/[^0-9]/g, '')
								)
							}
							keyboardType="numeric"
							maxLength={2}
						/>
					)}
				</View>
				<View>
					<AppSwitcher
						label="Total time"
						value={state.hasTotalTime}
						onValueChange={() =>
							stateDispatch({ type: StageActions.SetHasTotalTime })
						}
					/>
					{state.hasTotalTime && (
						<View style={styles.stageInnerFieldView}>
							<TimeInput
								interval={state.totalTime}
								onChangeTime={(value) =>
									handleInput(StageFieldOptions.TotalTime, value)
								}
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
