import { ISettings } from '../utils/types'
import { AppActions } from './actions'

type initialStateModel = {
	timePlayer1: number
	timePlayer2: number
	settings: ISettings
}

const initialSettings: ISettings = {
	landscape: false,
	playSound: true,
	ruleset: [],
	mainRule: undefined,
	themeColor: '#3B1C95',
}

const initialState: initialStateModel = {
	timePlayer1: 0,
	timePlayer2: 0,
	settings: initialSettings,
}

export const settingsReducer = (
	state: initialStateModel = initialState,
	action: AppActions
) => {
	switch (action.type) {
		case 'ON_LOAD_SETTINGS':
			return {
				...state,
				settings: action.payload,
			}
		case 'SET_TIMER_P1':
			return {
				...state,
				timePlayer1: action.payload,
			}
		case 'SET_TIMER_P2':
			return {
				...state,
				timePlayer2: action.payload,
			}
		default:
			return state
	}
}
