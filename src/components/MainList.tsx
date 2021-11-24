import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { store } from '../redux';

interface IProps {
	name?: string;
	id?: number;
	onPress?: () => void;
	selected?: number;
}

const translator = (props: IProps) => ({
	name: props.name ? props.name : '',
	id: props.id ? props.id : Math.round(Math.random() * 135),
	onPress: props.onPress ? props.onPress : () => {},
	selected: props.selected ? props.selected : undefined,
});

export const MainList = (props: IProps) => {
	const { name, id, onPress, selected } = translator(props);

	const backgroundColor =
		store.getState().settings.themeColor + (selected === id ? 'FF' : '40');

	const styles = StyleSheet.create({
		container: {
			padding: 10,
			marginBottom: 10,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: backgroundColor,
		},
		label: {
			color: Colors.screenTextColor,
			fontSize: 16,
			fontWeight: selected === id ? 'bold' : 'normal',
		},
	});

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<Text style={styles.label}>{name}</Text>
		</TouchableOpacity>
	);
};
