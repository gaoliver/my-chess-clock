import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'

interface IProps {
	color?: string
	height?: number
}

const translator = (props: IProps) => ({
	color: props.color ? props.color : Colors.themeColor,
	height: props.height ? props.height : 230,
})

export const AppBox = (props: IProps) => {
	const { color, height } = translator(props)

	const styles = StyleSheet.create({
		box: {
			width: '90%',
			height: height,
			backgroundColor: color,
			borderRadius: 20,
		},
	})

	return (
		<View style={styles.box}>
			<Text></Text>
		</View>
	)
}
