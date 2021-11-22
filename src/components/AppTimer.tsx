import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppBox } from '.'
import Colors from '../constants/Colors'
import { fontFamily } from '../utils/types'

interface IProps {
	playerTime?: number
	totalTime?: number
	direction?: 'up' | 'down' | 'landscape'
	disabled?: boolean
}

const translator = (props: IProps) => ({
	playerTime: props.playerTime ? props.playerTime : 0,
	totalTime: props.totalTime ? props.totalTime : 0,
	direction: props.direction ? props.direction : 'up',
	disabled: props.disabled ? props.disabled : false,
})

export const AppTimer = (props: IProps) => {
	const { totalTime, playerTime, direction, disabled } = translator(props)

	const styles = StyleSheet.create({
		total: {
			color: Colors.totalTimerColor,
			fontFamily: fontFamily.digitalNumber,
			fontSize: 20,
		},
		playerTime: {
			color: Colors.textColor,
			fontFamily: fontFamily.digitalNumber,
			fontSize: 80,
			marginTop: '15%',
		},
	})

	return (
		<AppBox disabled={disabled}>
			<Text style={styles.total}>{`total time - 00:00:00`}</Text>
			<Text style={styles.playerTime}>{`00:00:00`}</Text>
		</AppBox>
	)
}
