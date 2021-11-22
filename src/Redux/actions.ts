import { Dispatch } from 'react'
import { ISettings } from '../utils/types'

export interface setSettingsModel {
	readonly type: 'ON_LOAD_SETTINGS'
	payload: ISettings
}

export interface setTimerPlayer1 {
	readonly type: 'SET_TIMER_P1'
	payload: any
}
export interface setTimerPlayer2 {
	readonly type: 'SET_TIMER_P2'
	payload?: any
}
export interface setTotalTime {
	readonly type: 'SET_TOTAL_TIME'
	payload: any
}

export interface setPlay {
	readonly type: 'SET_PLAY_PAUSE'
	payload: boolean
}

export type AppActions =
	| setSettingsModel
	| setTimerPlayer1
	| setTimerPlayer2
	| setTotalTime
	| setPlay

export const setSettings = (value: ISettings) => {
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

export const setTotalTime = (value: any) => {
	return async (dispatch: Dispatch<AppActions>) => {
		dispatch({
			type: 'SET_TOTAL_TIME',
			payload: value,
		})
	}
}

export const setPlayPause = (value: boolean) => {
	return async (dispatch: Dispatch<AppActions>) => {
		dispatch({
			type: 'SET_PLAY_PAUSE',
			payload: value,
		})
	}
}
