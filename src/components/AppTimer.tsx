import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppBox } from '../components/AppBox';
import Colors from '../constants/Colors';
import Timer from '../utils/timer';
import { fontFamily } from '../utils/types';

interface IProps {
	playerTime?: number;
	totalTime?: number;
	stage?: number;
	moviments?: number;
	direction?: 'up' | 'down' | 'landscape';
	disabled?: boolean;
	onPress?: () => void;
}

interface directionTranslator {
	height?: string | number;
	width?: string | number;
	transform?: any;
}

const translator = (props: IProps) => ({
	playerTime: props.playerTime ? props.playerTime : 0,
	totalTime: props.totalTime ? props.totalTime : 0,
	stage: props.stage ? props.stage : 1,
	moviments: props.moviments ? props.moviments : false,
	direction: props.direction ? props.direction : 'up',
	disabled: props.disabled ? props.disabled : false,
	onPress: props.onPress ? props.onPress : () => {},
});

export const AppTimer = (props: IProps) => {
	const {
		totalTime,
		playerTime,
		direction,
		disabled,
		onPress,
		stage,
		moviments,
	} = translator(props);

	const directionTranslator: directionTranslator = {
		height: direction === 'landscape' ? '50%' : '40%',
		width: direction === 'landscape' ? '65%' : '90%',
		transform: direction === 'landscape' ? [{ rotateZ: '270deg' }] : [],
	};

	const styles = StyleSheet.create({
		container: {
			height: directionTranslator.height,
			width: directionTranslator.width,
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			transform: directionTranslator.transform,
		},
		topBottomView: {
			flex: 0.1,
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		middleView: {
			flex: 1,
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		total: {
			color: Colors.totalTimerColor,
			fontFamily: fontFamily.digitalNumber,
			fontSize: 20,
		},
		playerTime: {
			color: Colors.textColor,
			fontFamily: fontFamily.digitalNumber,
			fontSize: direction === 'landscape' ? 80 : 90,
		},
	});

	return (
		<AppBox
			style={[direction && styles.container]}
			disabled={disabled}
			onPress={onPress}
		>
			<View style={styles.topBottomView}>
				<Text style={styles.total}>{`total time - ${Timer(totalTime)}`}</Text>
			</View>
			<View style={styles.middleView}>
				<Text style={styles.playerTime}>{Timer(playerTime)}</Text>
			</View>
			<View style={styles.topBottomView}>
				<Text style={styles.total}>
					{`Stage ${stage}`}
					{moviments && ` - Moviments ${moviments}`}
				</Text>
			</View>
		</AppBox>
	);
};
