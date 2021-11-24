import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Colors from '../constants/Colors';
import { store } from '../redux';

interface IProps {
	label?: string;
	value?: boolean;
	onValueChange?: () => void;
	noMargin?: boolean;
	disabled?: boolean;
}

const translator = (props: IProps) => ({
	label: props.label ? props.label : '',
	value: props.value ? props.value : false,
	noMargin: props.noMargin ? props.noMargin : false,
	disabled: props.disabled ? props.disabled : false,
	onValueChange: props.onValueChange ? props.onValueChange : () => {},
});

export const AppSwitcher = (props: IProps) => {
	const { label, value, onValueChange, noMargin, disabled } = translator(props);

	const styles = StyleSheet.create({
		line: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: noMargin ? 0 : 10,
			opacity: disabled ? 0.7 : 1,
		},
		label: {
			marginRight: 20,
			fontSize: 20,
			color: Colors.screenTextColor,
		},
	});

	return (
		<View style={styles.line}>
			<Text style={styles.label}>{label}</Text>
			<Switch
				trackColor={{
					false: '#767577',
					true: store.getState().settings.themeColor,
				}}
				thumbColor={Colors.textColor}
				onValueChange={onValueChange}
				value={value}
				style={{ transform: [{ scale: 0.8 }] }}
				disabled={disabled}
			/>
		</View>
	);
};
