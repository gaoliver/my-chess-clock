import React from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import Colors from '../constants/Colors'

interface IProps {
	label?: string
	value?: boolean
	onValueChange?: () => void
}

const translator = (props: IProps) => ({
	label: props.label ? props.label : '',
	value: props.value ? props.value : false,
	onValueChange: props.onValueChange ? props.onValueChange : () => {},
})

export const AppSwitcher = (props: IProps) => {
	const { label, value, onValueChange } = translator(props)

	const styles = StyleSheet.create({
		line: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 10,
		},
		label: {
			marginRight: 20,
			fontSize: 20,
			color: Colors.screenTextColor,
		},
	})

	return (
		<View style={styles.line}>
			<Text style={styles.label}>{label}</Text>
			<Switch
				trackColor={{ false: '#767577', true: Colors.themeColor }}
				thumbColor={Colors.textColor}
				onValueChange={onValueChange}
				value={value}
				style={{ transform: [{ scale: 0.8 }] }}
			/>
		</View>
	)
}
