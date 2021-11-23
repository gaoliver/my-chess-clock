import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'

interface IProps {
	name?: string
	id?: number
	onPress?: () => void
	selected?: boolean
}

const translator = (props: IProps) => ({
	name: props.name ? props.name : '',
	id: props.id ? props.id : Math.round(Math.random() * 135),
	onPress: props.onPress ? props.onPress : () => {},
	selected: props.selected ? props.selected : false,
})

export const MainList = (props: IProps) => {
	const { name, id, onPress, selected } = translator(props)

	const backgroundColor = Colors.themeColor + (selected ? '50' : '15')

	const styles = StyleSheet.create({
		container: {
			backgroundColor: backgroundColor,
			padding: 10,
			marginBottom: 5,
		},
		label: {
			color: Colors.screenTextColor,
			fontSize: 16,
		},
	})

	return (
		<TouchableOpacity style={styles.container} key={id} onPress={onPress}>
			<Text style={styles.label}>{name}</Text>
		</TouchableOpacity>
	)
}
