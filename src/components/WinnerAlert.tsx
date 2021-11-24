import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { store } from '../redux';
import Timer from '../utils/timer';
import { AppModal } from './AppModal';
import { Audio } from 'expo-av';

interface IProps {
	visible?: boolean;
	onDismiss?: () => void;
	name?: string;
	time?: number;
}

const translator = (props: IProps) => ({
	visible: props.visible ? props.visible : false,
	onDismiss: props.onDismiss ? props.onDismiss : () => {},
	name: props.name ? props.name : '',
	time: props.time ? props.time : 0,
});

export const WinnerAlert = (props: IProps) => {
	const { name, onDismiss, time, visible } = translator(props);
	const [winSound, setWinSound] = useState<any>();

	const loadSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require('../../assets/sound/bell-sound-fx.wav')
		);
		setWinSound(sound);
	};

	const playSound = async () => {
		await winSound.replayAsync();
	};

	React.useLayoutEffect(() => {
		loadSound();
	}, []);

	useEffect(() => {
		if (visible && store.getState().settings.playSound) {
			playSound();
		}
	}, [visible]);

	const styles = StyleSheet.create({
		alert: {
			transform: store.getState().settings.landscape
				? [{ rotateZ: '270deg' }]
				: [],
		},
		title: {
			fontSize: 30,
			color: store.getState().settings.themeColor,
			marginTop: -20,
		},
		name: {
			fontSize: 40,
			fontWeight: 'bold',
		},
		time: {
			fontSize: 20,
		},
	});

	return (
		<AppModal
			visible={visible}
			onDismiss={onDismiss}
			justifyContent="space-between"
			alignItems="center"
			style={styles.alert}
		>
			<Text style={styles.title}>Winner!</Text>
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.time}>{`Time: ${Timer(time)}`}</Text>
		</AppModal>
	);
};
