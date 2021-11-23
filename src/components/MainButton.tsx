import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'

interface IProps {
	label?: string
	onPress?: () => void
}

const translator = (props: IProps) => ({
	label: props.label ? props.label : '',
	onPress: props.onPress ? props.onPress : () => {},
})

export const MainButton = (props: IProps) => {
	const { label, onPress } = translator(props)

	const styles = StyleSheet.create({
		addNewButton: {
			padding: 10,
			backgroundColor: Colors.themeColor,
			borderRadius: 10,
		},
		addNewText: {
			color: Colors.textColor,
			fontWeight: 'bold',
		},
	})

	return (
		<Pressable style={styles.addNewButton} onPress={onPress}>
			<Text style={styles.addNewText}>{label}</Text>
		</Pressable>
	)
}
