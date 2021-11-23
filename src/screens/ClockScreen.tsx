import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import { AppTimer, RoundedButton } from '../components';
import * as gameActions from '../redux';
import PlayIcon from '../../assets/icons/play.svg';
import PauseIcon from '../../assets/icons/pause.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import RefreshIcon from '../../assets/icons/refresh.svg';
import { ApplicationState } from '../redux';
import { NavigationParamsProp } from '../utils/types';
import Colors from '../constants/Colors';

const ClockScreen = ({ navigation }: NavigationParamsProp) => {
	const dispatch = useDispatch();
	const { settings, totalTime, play, player1, player2 } = useSelector(
		(state: ApplicationState) => state
	);

	const mainRule = {
		id: settings.mainRule.id,
		name: settings.mainRule.name,
		stages: settings.mainRule.stages,
		increment: settings.mainRule.increment,
		delay: settings.mainRule.delay,
		delayPlayer1: settings.mainRule.delayPlayer1,
		delayPlayer2: settings.mainRule.delayPlayer2,
		fischerPlayer1: settings.mainRule.fischerPlayer1,
		fischerPlayer2: settings.mainRule.fischerPlayer2,
		bronsteinPlayer1: settings.mainRule.bronsteinPlayer1,
		bronsteinPlayer2: settings.mainRule.bronsteinPlayer2,
	};

	const [thisPlay, setThisPlay] = useState(play);
	const [thisPlayer1, setThisPlayer1] = useState(player1);
	const [thisPlayer2, setThisPlayer2] = useState(player2);
	const [thisTotalTime, setThisTotalTime] = useState(totalTime);
	const [totalTimer, setTotalTimer] = useState<any>();
	const [timer, setTimer] = useState<any>();
	const [countDown, setCountDown] = useState<any>();
	const [showCountDown, setshowCountDown] = useState(false);
	const [delayCounter1, setDelayCounter1] = useState(mainRule.delayPlayer1);
	const [delayCounter2, setDelayCounter2] = useState(mainRule.delayPlayer2);
	const [counterPlayer1, setCounterPlayer1] = useState(
		settings.mainRule?.stages[0].timePlayer1
	);
	const [counterPlayer2, setCounterPlayer2] = useState(
		settings.mainRule?.stages[0].timePlayer2
	);

	const translator = {
		showPlayer1: showCountDown ? delayCounter1 : counterPlayer1,
	};

	const landscape = (direction: string) => {
		let landscape = settings.landscape;
		if (landscape) {
			return 'landscape';
		} else if (direction === 'up' || direction === 'down') {
			return direction;
		}
	};

	const handleTapPlayer = () => {
		clearInterval(timer);
		if (thisPlayer1) {
			setThisPlayer1(false);
			setThisPlayer2(true);
		} else {
			setThisPlayer1(true);
			setThisPlayer2(false);
		}
		dispatch(gameActions.setTimerPlayer1(thisPlayer1));
		dispatch(gameActions.setTimerPlayer2(thisPlayer2));
	};

	const handlePlayPause = () => {
		if (thisPlay) {
			setThisPlay(false);
			dispatch(gameActions.setTimerPlayer1(counterPlayer1));
			dispatch(gameActions.setTimerPlayer2(counterPlayer2));
		} else {
			setThisPlay(true);
		}
		dispatch(gameActions.setPlayPause(thisPlay));
	};

	const onReset = () => {
		dispatch(gameActions.setPlayPause(false));
		dispatch(gameActions.setTimerPlayer1(0));
		dispatch(gameActions.setTimerPlayer2(0));
		dispatch(gameActions.setTotalTime(0));

		setThisPlay(false);
		setCounterPlayer1(settings.mainRule?.stages[0].timePlayer1);
		setCounterPlayer2(settings.mainRule?.stages[0].timePlayer2);
		setThisTotalTime(0);
	};

	const onSettings = () => {
		navigation.navigate('Settings');
	};

	const startCounter = () => {
		const timerId = setInterval(() => {
			if (thisPlayer1) {
				setCounterPlayer1((value) => value && value - 1);
			} else if (thisPlayer2) {
				setCounterPlayer2((value) => value && value - 1);
			}
		}, 1000);
		setTimer(timerId);
	};

	const handleCountDown = () => {
		const delayShow = setInterval(() => {
			if (delayCounter1 > 0) {
				setDelayCounter1((value) => value - 1);
			}
		}, 1000);
		setCountDown(delayShow);
	};

	const stopInterval = () => {
		clearInterval(countDown);
		clearInterval(timer);
	};

	useEffect(() => {
		if (delayCounter1 === 0) {
			clearInterval(countDown);
			setDelayCounter1((value) => value + mainRule.delayPlayer1);
		}
	}, [delayCounter1]);

	useEffect(() => {
		if (thisPlay) {
			if (mainRule.delay && thisPlayer1) {
				setshowCountDown(true);
				handleCountDown();
				setTimeout(() => {
					setshowCountDown(false);
					startCounter();
				}, 5000);
			} else {
				startCounter();
			}
		} else {
			stopInterval();
		}
	}, [thisPlay, thisPlayer1, thisPlayer2]);

	useEffect(() => {
		if (thisPlay) {
			const totalTimerId = setInterval(
				() => setThisTotalTime((value) => value + 1),
				1000
			);
			setTotalTimer(totalTimerId);
		} else {
			clearInterval(totalTimer);
		}
	}, [thisPlay]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingVertical: 20,
			alignItems: 'center',
			justifyContent: 'space-around',
		},
		buttons: {
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
		},
	});

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar translucent={false} backgroundColor={Colors.textColor} />
			<AppTimer
				direction={landscape('down')}
				playerTime={counterPlayer2}
				totalTime={thisTotalTime}
				disabled={!thisPlayer2}
				onPress={handleTapPlayer}
			/>
			<View style={styles.buttons}>
				<RoundedButton
					landscape={settings.landscape}
					icon={<SettingsIcon />}
					size={55}
					onPress={onSettings}
				/>
				<RoundedButton
					landscape={settings.landscape}
					onPress={handlePlayPause}
					icon={thisPlay ? <PauseIcon /> : <PlayIcon />}
					size={65}
				/>
				<RoundedButton
					landscape={settings.landscape}
					icon={<RefreshIcon />}
					size={55}
					onPress={onReset}
					disabled={thisTotalTime === 0}
				/>
			</View>
			<AppTimer
				disabled={!thisPlayer1}
				direction={landscape('up')}
				playerTime={translator.showPlayer1}
				totalTime={thisTotalTime}
				onPress={handleTapPlayer}
			/>
		</SafeAreaView>
	);
};

export default ClockScreen;
