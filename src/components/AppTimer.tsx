import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppBox } from '../components/AppBox';
import Colors from '../constants/Colors';
import Timer from '../utils/timer';
import { fontFamily, IDirectionTranslator } from '../utils/types';

interface IProps {
	playerTime?: number;
	totalTime?: number;
	direction?: 'up' | 'down' | 'landscape';
	disabled?: boolean;
	onPress?: () => void;
}

const translator = (props: IProps) => ({
	playerTime: props.playerTime ? props.playerTime : 0,
	totalTime: props.totalTime ? props.totalTime : 0,
	direction: props.direction ? props.direction : 'up',
	disabled: props.disabled ? props.disabled : false,
	onPress: props.onPress ? props.onPress : () => {},
});

export const AppTimer = (props: IProps) => {
	const { totalTime, playerTime, direction, disabled, onPress } =
		translator(props);

	const directionTranslator: IDirectionTranslator = {
		container: {
			flexDirection: direction === 'landscape' ? 'row' : 'column',
			justifyContent: direction === 'landscape' ? 'space-around' : 'center',
			rotate: direction === 'down' ? [{ rotateZ: '180deg' }] : [],
		},
		total: {
			top: direction === 'landscape' ? null : 30,
			left: direction === 'landscape' ? 0 : null,
		},
		playerTime: {
			fontSize: direction === 'landscape' ? 60 : 90,
		},
		rotate: direction === 'landscape' ? [{ rotateZ: '270deg' }] : [],
	};

	const styles = StyleSheet.create({
		container: {
			height: '40%',
			flexDirection: directionTranslator.container.flexDirection,
			justifyContent: directionTranslator.container.justifyContent,
			transform: directionTranslator.container.rotate,
		},
		total: {
			position: 'absolute',
			top: directionTranslator.total.top,
			left: directionTranslator.total.left,
			color: Colors.totalTimerColor,
			fontFamily: fontFamily.digitalNumber,
			fontSize: 20,
			transform: directionTranslator.rotate,
		},
		playerTime: {
			color: Colors.textColor,
			fontFamily: fontFamily.digitalNumber,
			fontSize: directionTranslator.playerTime.fontSize,
			transform: directionTranslator.rotate,
		},
	});

	return (
		<AppBox
			style={[direction && styles.container]}
			disabled={disabled}
			onPress={onPress}
		>
			<Text style={styles.total}>{`total time - ${Timer(totalTime)}`}</Text>
			<Text style={styles.playerTime}>{Timer(playerTime)}</Text>
		</AppBox>
	);
};
