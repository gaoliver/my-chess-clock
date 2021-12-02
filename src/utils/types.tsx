import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

export type NavigationProp = StackNavigationProp<StackParamList, 'Home'>;
export type NavigationParamsProp = NativeStackScreenProps<
	StackParamList,
	'Rule'
>;

export type StackParamList = {
	Home: undefined;
	Settings: undefined;
	ColorPicker: undefined;
	StageScreen: { stage?: IStage; ruleId?: number };
	Rule: { rule?: IRule; stage?: IStage };
};

export enum fontFamily {
	digitalNumber = 'digital-number',
	whiteDream = 'white-dream',
}
export interface ISettings {
	themeColor: string;
	playSound: boolean;
	landscape: boolean;
	ruleset: Array<IRule>;
	mainRule: IRule;
}

export interface IRule {
	id: number;
	name: string;
	stages: Array<IStage>;
	increment: 'fischer' | 'bronstein' | null;
	delay: boolean;
	delayPlayer1: number;
	delayPlayer2: number;
	fischerPlayer1: number;
	fischerPlayer2: number;
	bronsteinPlayer1: number;
	bronsteinPlayer2: number;
}

export interface IStage {
	id: number;
	maxTime: number;
	timePlayer1: number;
	timePlayer2: number;
	movements: number;
}

export interface IState {
	currentStage: number;
	thisPlay: boolean;
	thisPlayer1: boolean;
	thisPlayer2: boolean;
	thisTotalTime: number;
	turn: number;
	stageTimeCounter: number;
	winnderModal: boolean;
	showCountDown1: boolean;
	showCountDown2: boolean;
	movementsPlayer1: number;
	movementsPlayer2: number;
	counterPlayer1: number;
	counterPlayer2: number;
	delayCounter1: number;
	delayCounter2: number;
	countDown: any;
	delaying: any;
	totalTime: any;
}

export enum StateActions {
	'TapPlayer1',
	'TapPlayer2',
	'PlayPause',
	'CounterPlayer1',
	'CounterPlayer2',
	'MovementPlayer1',
	'MovementPlayer2',
	'SetCounterPlayer1',
	'SetCounterPlayer2',
	'DelayCounter1',
	'DelayCounter2',
	'TotalTime',
	'SetDelay1',
	'SetDelay2',
	'ShowDelay1',
	'ShowDelay2',
	'SetCountDown',
	'SetDelaying',
	'SetTotalTime',
	'NextStage',
	'FinishGame',
	'CloseModal',
	'Reset',
}

export interface IRuleState {
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
export enum IncrementTypeModels {
	fischer = 'fischer',
	bronstein = 'bronstein',
}
export enum RuleActions {
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

export enum FieldOptions {
	'NAME',
	'DELAY1',
	'DELAY2',
	'INCREMENT1',
	'INCREMENT2',
}

export interface IStageState {
	counterSameForBoth: boolean;
	counterPlayer1: number;
	counterPlayer2: number;
	stageHasMovements: boolean;
	stageMovements: number;
	hasTotalTime: boolean;
	totalTime: number;
}

export enum StageActions {
	'SetCounterSameForBoth',
	'SetCounterPlayer1',
	'SetCounterPlayer2',
	'SetHasMovements',
	'SetMovements',
	'SetHasTotalTime',
	'SetTotalTime',
	'SetStageValues',
}

export enum StageFieldOptions {
	'CounterPlayer1',
	'CounterPlayer2',
	'Movements',
	'TotalTime',
}
