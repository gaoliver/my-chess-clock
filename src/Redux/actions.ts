import { Dispatch } from 'react'

export interface setSettingsModel {
	readonly type: 'ON_LOAD_SETTINGS'
	payload: any
}

export type AppActions = setSettingsModel

export const setSettings = (value: any) => {
	return async (dispatch: Dispatch<AppActions>) => {
		dispatch({
			type: 'ON_LOAD_SETTINGS',
			payload: value,
		})
	}
}
