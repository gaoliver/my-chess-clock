import { ISettings } from '../utils/types';
import { AppActions } from './actions';
import PatternRule from '../json/PatternRule.json';

type initialStateModel = {
	player1: boolean;
	player2: boolean;
	timePlayer1: number;
	timePlayer2: number;
	totalTime: number;
	play: boolean;
	settings: ISettings;
};

const initialSettings: ISettings = {
	landscape: false,
	playSound: true,
	ruleset: [PatternRule],
	mainRule: PatternRule,
	themeColor: '#3B1C95',
};

const initialState: initialStateModel = {
	player1: true,
	player2: false,
	timePlayer1: 0,
	timePlayer2: 0,
	totalTime: 0,
	play: false,
	settings: initialSettings,
};

export const settingsReducer = (
	state: initialStateModel = initialState,
	action: AppActions
) => {
	switch (action.type) {
		case 'ON_LOAD_SETTINGS':
			return {
				...state,
				settings: action.payload,
			};
		case 'SET_TIMER_P1':
			return {
				...state,
				timePlayer1: action.payload,
			};
		case 'SET_TIMER_P2':
			return {
				...state,
				timePlayer2: action.payload,
			};
		case 'SET_TOTAL_TIME':
			return {
				...state,
				totalTime: action.payload,
			};
		case 'SET_PLAY_PAUSE':
			return {
				...state,
				play: action.payload,
			};
		default:
			return state;
	}
};
