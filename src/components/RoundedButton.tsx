import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Colors from '../constants/Colors'
import Settings from '../constants/Settings'

interface IProps {
	color?: string
	icon?: any
	size?: number
	disabled?: boolean
	onPress?: () => void
}

const translator = (props: IProps) => ({
	color: props.color ? props.color : Colors.themeColor,
	size: props.size ? props.size : 40,
	icon: props.icon ? props.icon : null,
	disabled: props.disabled ? props.disabled : false,
	onPress: props.onPress ? props.onPress : () => {},
})

export const RoundedButton = (props: IProps) => {
	const { color, icon, size, onPress, disabled } = translator(props)

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: color,
			width: size,
			height: size,
			padding: 10,
			borderRadius: 100,
			opacity: disabled ? Settings.disabledOpacity : 1,
		},
	})

	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.7}
			onPress={onPress}
		>
			{icon ? icon : <Text style={{ color: Colors.textColor }}>#</Text>}
		</TouchableOpacity>
	)
}
