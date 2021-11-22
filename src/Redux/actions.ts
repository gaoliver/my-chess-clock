import { Dispatch } from 'react'

export interface setSettingsModel {
	readonly type: 'ON_LOAD_SETTINGS'
	payload: any
}

export interface setTimerPlayer1 {
	readonly type: 'SET_TIMER_P1'
	payload: number
}

export interface setTimerPlayer2 {
	readonly type: 'SET_TIMER_P2'
	payload: number
}

export type AppActions = setSettingsModel | setTimerPlayer1 | setTimerPlayer2

export const setSettings = (value: any) => {
	return async (dispatch: Dispatch<AppActions>) => {
		dispatch({
			type: 'ON_LOAD_SETTINGS',
			payload: value,
		})
	}
}

export const setTimerPlayer1 = (value: any) => {
	return async (dispatch: Dispatch<AppActions>) => {
		dispatch({
			type: 'SET_TIMER_P1',
			payload: value,
		})
	}
}

export const setTimerPlayer2 = (value: any) => {
	return async (dispatch: Dispatch<AppActions>) => {
		dispatch({
			type: 'SET_TIMER_P2',
			payload: value,
		})
	}
}
