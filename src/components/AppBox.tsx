import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Colors from '../constants/Colors'
import Settings from '../constants/Settings'

interface IProps {
	color?: string
	height?: number
	disabled?: boolean
	style?: StyleProp<ViewStyle>
}

const translator = (props: IProps) => ({
	color: props.color ? props.color : Colors.themeColor,
	height: props.height ? props.height : 230,
	disabled: props.disabled ? props.disabled : false,
	style: props.style && props.style,
})

export const AppBox: React.FC<IProps> = (props) => {
	const { color, height, disabled, style } = translator(props)

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

	return <View style={[styles.box, style]}>{props.children}</View>
}
