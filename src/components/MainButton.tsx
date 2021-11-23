import React from 'react';
import {
	Pressable,
	StyleProp,
	StyleSheet,
	Text,
	ViewStyle,
} from 'react-native';
import Colors from '../constants/Colors';

interface IProps {
	label?: string;
	onPress?: () => void;
	fullWidth?: boolean;
	center?: boolean;
	color?: string;
	fontSize?: number;
	style?: StyleProp<ViewStyle>;
}

const translator = (props: IProps) => ({
	label: props.label ? props.label : '',
	onPress: props.onPress ? props.onPress : () => {},
	fullWidth: props.fullWidth ? props.fullWidth : false,
	center: props.center ? props.center : false,
	color: props.color ? props.color : Colors.themeColor,
	fontSize: props.fontSize ? props.fontSize : 14,
	style: props.style && props.style,
});

export const MainButton = (props: IProps) => {
	const { label, onPress, fullWidth, center, color, fontSize, style } =
		translator(props);

	const styles = StyleSheet.create({
		addNewButton: {
			width: fullWidth ? '100%' : undefined,
			paddingVertical: 10,
			paddingHorizontal: 20,
			backgroundColor: color,
			borderRadius: 8,
			alignItems: center ? 'center' : 'flex-start',
		},
		addNewText: {
			color: Colors.textColor,
			fontWeight: 'bold',
			fontSize: fontSize,
		},
	});

	return (
		<Pressable style={[styles.addNewButton, style]} onPress={onPress}>
			<Text style={styles.addNewText}>{label}</Text>
		</Pressable>
	);
};
