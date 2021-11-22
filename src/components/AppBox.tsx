import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import Settings from '../constants/Settings'

interface IProps {
	color?: string
	height?: number
	disabled?: boolean
}

const translator = (props: IProps) => ({
	color: props.color ? props.color : Colors.themeColor,
	height: props.height ? props.height : 230,
	disabled: props.disabled ? props.disabled : false,
})

export const AppBox: React.FC<IProps> = (props) => {
	const { color, height, disabled } = translator(props)

	const styles = StyleSheet.create({
		box: {
			width: '90%',
			alignItems: 'center',
			height: height,
			backgroundColor: color,
			padding: 20,
			borderRadius: Settings.radius,
			opacity: disabled ? Settings.disabledOpacity : 1,
		},
	})

	return <View style={styles.box}>{props.children}</View>
}
