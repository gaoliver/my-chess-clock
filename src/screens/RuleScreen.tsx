import { Container, Content } from 'native-base';
import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
	AlertModal,
	AppCheckbox,
	AppHeader,
	AppSwitcher,
	ListCreator,
	SectionTitle,
	TimeInput,
} from '../components';
import Colors from '../constants/Colors';
import { ApplicationState } from '../redux';
import { IRule, IStage, NavigationParamsProp } from '../utils/types';
import * as gameActions from '../redux/actions';

interface IRuleState {
	name: string;
	stages: Array<IStage>;
	hasDelay: boolean;
	delayPlayer1: number;
	delayPlayer2: number;
	hasIncrement: boolean;
	incrementType: IncrementTypeModels | null;
	incrementPlayer1: number;
	incrementPlayer2: number;
}
enum IncrementTypeModels {
	fischer = 'fischer',
	bronstein = 'bronstein',
}
enum RuleActions {
	'SetName',
	'HasDelay',
	'HasIncrement',
	'IncrementType',
	'PushStage',
	'DeleteStage',
	'SetValues',
	'SetDelay1',
	'SetDelay2',
	'SetIncrement1',
	'SetIncrement2',
}

enum FieldOptions {
	'NAME',
	'DELAY1',
	'DELAY2',
	'INCREMENT1',
	'INCREMENT2',
}

function reducer(state: IRuleState, action: { type: any; payload?: any }) {
	switch (action.type) {
		case RuleActions.SetValues:
			return {
				...state,
				name: action.payload.name,
				stages: action.payload.stages,
				hasDelay: action.payload.delay ? true : false,
				delayPlayer1: action.payload.delayPlayer1,
				delayPlayer2: action.payload.delayPlayer2,
				hasIncrement: action.payload.increment ? true : false,
				incrementType: action.payload.increment,
				// incrementPlayer1: action.payload.incrementPlayer1,
				// incrementPlayer2: action.payload.incrementPlayer2,
			};
		case RuleActions.SetName:
			return {
				...state,
				name: action.payload,
			};
		case RuleActions.HasDelay:
			return {
				...state,
				hasDelay: state.hasDelay ? false : true,
			};
		case RuleActions.SetDelay1:
			return {
				...state,
				delayPlayer1: action.payload,
			};
		case RuleActions.SetDelay2:
			return {
				...state,
				delayPlayer2: action.payload,
			};
		case RuleActions.HasIncrement:
			return {
				...state,
				hasIncrement: state.hasIncrement ? false : true,
			};
		case RuleActions.IncrementType:
			return {
				...state,
				incrementType: action.payload,
			};
		case RuleActions.SetIncrement1:
			return {
				...state,
				incrementPlayer1: action.payload,
			};
		case RuleActions.SetIncrement2:
			return {
				...state,
				incrementPlayer2: action.payload,
			};
		case RuleActions.PushStage:
			state.stages.push(action.payload);
			return { ...state };
		case RuleActions.DeleteStage:
			state.stages.splice(action.payload, 1);
			return { ...state };
		default:
			return state;
	}
}

const RuleScreen = ({ route, navigation }: NavigationParamsProp) => {
	const { rule, stage } = route.params;
	const { settings } = useSelector((state: ApplicationState) => state);
	const ruleset = settings.ruleset;
	const dispatch = useDispatch();

	const [stageModalOptions, setStageModalOptions] = useState<boolean>(false);
	const [delaySameForBoth, setDelaySameForBoth] = useState<boolean>(false);
	const [incrementSameForBoth, setIncrementSameForBoth] =
		useState<boolean>(false);
	const [selectedStage, setSelectedStage] = useState<number | undefined>(
		undefined
	);

	const initialRuleState: IRuleState = {
		name: '',
		stages: [],
		hasDelay: false,
		delayPlayer1: 0,
		delayPlayer2: 0,
		hasIncrement: false,
		incrementType: null,
		incrementPlayer1: 0,
		incrementPlayer2: 0,
	};

	const [ruleState, ruleDispatch] = useReducer(reducer, initialRuleState);

	const handleAddDelay = () => {
		ruleDispatch({ type: RuleActions.HasDelay });
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
		ruleDispatch({ type: RuleActions.HasIncrement });
	};

	const handleIncrementType = () => {
		if (ruleState.incrementType === IncrementTypeModels.fischer) {
			ruleDispatch({
				type: RuleActions.IncrementType,
				payload: IncrementTypeModels.bronstein,
			});
		} else {
			ruleDispatch({
				type: RuleActions.IncrementType,
				payload: IncrementTypeModels.fischer,
			});
		}
	};

	const handleModalOptions = (id: number) => {
		setSelectedStage(id);
		setStageModalOptions(true);
	};

	const onPressEdit = () => {
		setStageModalOptions(false);
		let thisStage = ruleState.stages.find(
			(item: IStage) => item.id === selectedStage
		);
		navigation.navigate('StageScreen', { stage: thisStage, ruleId: rule?.id });
	};

	const onPressDelete = () => {
		let stageIndex = ruleState.stages.findIndex(
			(item: IStage) => item.id === selectedStage
		);
		if (selectedStage) {
			ruleDispatch({ type: RuleActions.DeleteStage, payload: stageIndex });
		}
		setStageModalOptions(false);
	};

	const handleInput = (field: FieldOptions, value: any) => {
		switch (field) {
			case FieldOptions.NAME:
				return ruleDispatch({ type: RuleActions.SetName, payload: value });
			case FieldOptions.DELAY1:
				return ruleDispatch({ type: RuleActions.SetDelay1, payload: value });
			case FieldOptions.DELAY2:
				return ruleDispatch({ type: RuleActions.SetDelay2, payload: value });
			case FieldOptions.INCREMENT1:
				return ruleDispatch({
					type: RuleActions.SetIncrement1,
					payload: value,
				});
			case FieldOptions.INCREMENT2:
				return ruleDispatch({
					type: RuleActions.SetIncrement2,
					payload: value,
				});
			default:
				return null;
		}
	};

	const handleSave = () => {
		let newSettings = settings;
		let saveData: IRule = {
			id: rule ? rule.id : Math.random() * 135,
			name: ruleState.name,
			delay: ruleState.hasDelay,
			delayPlayer1: ruleState.delayPlayer1,
			delayPlayer2: ruleState.delayPlayer2,
			increment: ruleState.hasIncrement ? ruleState.incrementType : null,
			fischerPlayer1:
				ruleState.incrementType === IncrementTypeModels.fischer
					? ruleState.incrementPlayer1
					: 0,
			fischerPlayer2:
				ruleState.incrementType === IncrementTypeModels.fischer
					? ruleState.incrementPlayer2
					: 0,
			bronsteinPlayer1:
				ruleState.incrementType === IncrementTypeModels.bronstein
					? ruleState.incrementPlayer1
					: 0,
			bronsteinPlayer2:
				ruleState.incrementType === IncrementTypeModels.bronstein
					? ruleState.incrementPlayer2
					: 0,
			stages: ruleState.stages,
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
			ruleDispatch({ type: RuleActions.SetValues, payload: rule });
			setDelaySameForBoth(rule.delay ? false : true);
			if (rule.increment === 'bronstein') {
				handleInput(FieldOptions.INCREMENT1, rule.bronsteinPlayer1);
				handleInput(FieldOptions.INCREMENT2, rule.bronsteinPlayer2);
			} else if (rule.increment === 'fischer') {
				handleInput(FieldOptions.INCREMENT1, rule.fischerPlayer1);
				handleInput(FieldOptions.INCREMENT2, rule.fischerPlayer2);
			}
		}
	}, []);

	useEffect(() => {
		if (stage) {
			ruleDispatch({ type: RuleActions.PushStage, payload: stage });
		}
	}, [stage]);

	useEffect(() => {
		if (delaySameForBoth) {
			ruleDispatch({
				type: RuleActions.SetDelay2,
				payload: ruleState.delayPlayer1,
			});
		}
	}, [delaySameForBoth, ruleState.delayPlayer1, ruleState.delayPlayer2]);

	useEffect(() => {
		if (incrementSameForBoth) {
			ruleDispatch({
				type: RuleActions.SetIncrement2,
				payload: ruleState.incrementPlayer1,
			});
		}
	}, [
		incrementSameForBoth,
		ruleState.incrementPlayer1,
		ruleState.incrementPlayer2,
	]);

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
				title={ruleState.name ? 'Edit Rule' : 'New Rule'}
				onSave={handleSave}
				hasSave
				hasGoBack
			/>
			<Content style={styles.content}>
				<TextInput
					value={ruleState.name}
					onChangeText={(value) => handleInput(FieldOptions.NAME, value)}
					style={styles.input}
					placeholder="Write a name"
				/>
				<ListCreator
					title="Stages"
					buttonTitle="New Stage"
					listData={ruleState.stages}
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
							value={ruleState.hasDelay}
							onValueChange={handleAddDelay}
						/>
					</View>
					{ruleState.hasDelay && (
						<View style={styles.sectionContent}>
							<AppSwitcher
								label="Same for both"
								value={delaySameForBoth}
								onValueChange={handleDelayValue}
							/>
							<TimeInput
								label={!delaySameForBoth ? 'Player 1' : undefined}
								interval={ruleState.delayPlayer1}
								onChangeTime={(value) =>
									handleInput(FieldOptions.DELAY1, value)
								}
							/>
							{!delaySameForBoth && (
								<View style={{ marginTop: 10 }}>
									<TimeInput
										label="Player 2"
										interval={ruleState.delayPlayer2}
										onChangeTime={(value) =>
											handleInput(FieldOptions.DELAY2, value)
										}
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
							value={ruleState.hasIncrement}
							onValueChange={handleIncrement}
						/>
					</View>
					{ruleState.hasIncrement && (
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
									value={
										ruleState.incrementType === IncrementTypeModels.fischer
									}
									onValueChange={handleIncrementType}
								/>
								<AppCheckbox
									label="Bronstein"
									value={
										ruleState.incrementType === IncrementTypeModels.bronstein
									}
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
								interval={ruleState.incrementPlayer1}
								onChangeTime={(value) =>
									handleInput(FieldOptions.INCREMENT1, value)
								}
							/>
							{!incrementSameForBoth && (
								<View style={{ marginTop: 10 }}>
									<TimeInput
										label="Player 2"
										interval={ruleState.incrementPlayer2}
										onChangeTime={(value) =>
											handleInput(FieldOptions.INCREMENT2, value)
										}
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
