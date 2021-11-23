import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Colors from '../constants/Colors';
import Settings from '../constants/Settings';

interface IProps {
	color?: string;
	height?: number;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

const translator = (props: IProps) => ({
	color: props.color ? props.color : Colors.themeColor,
	height: props.height ? props.height : 230,
	disabled: props.disabled ? props.disabled : false,
	style: props.style && props.style,
	onPress: props.onPress ? props.onPress : () => {},
});

export const AppBox: React.FC<IProps> = (props) => {
	const { color, height, disabled, style, onPress } = translator(props);

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
	});

	return (
		<Pressable style={[styles.box, style]} onPress={onPress}>
			{props.children}
		</Pressable>
	);
};
