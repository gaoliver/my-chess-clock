import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppBox } from '../components/AppBox';
import Colors from '../constants/Colors';
import Timer from '../utils/timer';
import { fontFamily, IDirectionTranslator } from '../utils/types';

interface IProps {
	playerTime?: number;
	totalTime?: number;
	stage?: number;
	direction?: 'up' | 'down' | 'landscape';
	disabled?: boolean;
	onPress?: () => void;
}

const translator = (props: IProps) => ({
	playerTime: props.playerTime ? props.playerTime : 0,
	totalTime: props.totalTime ? props.totalTime : 0,
	stage: props.stage ? props.stage : 1,
	direction: props.direction ? props.direction : 'up',
	disabled: props.disabled ? props.disabled : false,
	onPress: props.onPress ? props.onPress : () => {},
});

export const AppTimer = (props: IProps) => {
	const { totalTime, playerTime, direction, disabled, onPress, stage } =
		translator(props);

	const directionTranslator: IDirectionTranslator = {
		container: {
			rotate: direction === 'down' ? [{ rotateZ: '180deg' }] : [],
		},
		total: {
			top: direction === 'landscape' ? null : 30,
			left: direction === 'landscape' ? 0 : null,
			transform:
				direction === 'landscape'
					? [{ rotateZ: '270deg' }, { translateY: -40 }]
					: [],
		},
		playerTime: {
			fontSize: direction === 'landscape' ? 60 : 90,
		},
		rotate: direction === 'landscape' ? [{ rotateZ: '270deg' }] : [],
	};

	const styles = StyleSheet.create({
		container: {
			height: '40%',
			justifyContent: 'center',
			transform: directionTranslator.container.rotate,
		},
		totalView: {
			position: 'absolute',
			top: directionTranslator.total.top,
			left: directionTranslator.total.left,
			transform: directionTranslator.total.transform,
		},
		total: {
			color: Colors.totalTimerColor,
			fontFamily: fontFamily.digitalNumber,
			fontSize: 20,
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
			<View style={styles.totalView}>
				<Text style={styles.total}>{`total time - ${Timer(
					totalTime
				)} - ST ${stage}`}</Text>
			</View>
			<Text style={styles.playerTime}>{Timer(playerTime)}</Text>
		</AppBox>
	);
};
