import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/core';

import { AppTimer, RoundedButton, WinnerAlert } from '../components';
import * as gameActions from '../redux';
import PlayIcon from '../../assets/icons/play.svg';
import PauseIcon from '../../assets/icons/pause.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import RefreshIcon from '../../assets/icons/refresh.svg';
import { ApplicationState } from '../redux';
import { NavigationParamsProp } from '../utils/types';
import Colors from '../constants/Colors';

const ClockScreen = ({ navigation }: NavigationParamsProp) => {
	const isFocused = useIsFocused();
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
	const [turn, setTurn] = useState(0);
	const [thisPlayer1, setThisPlayer1] = useState(player1);
	const [thisPlayer2, setThisPlayer2] = useState(player2);
	const [thisTotalTime, setThisTotalTime] = useState(totalTime);
	const [totalTimer, setTotalTimer] = useState<any>();
	const [timer, setTimer] = useState<any>();
	const [countDown, setCountDown] = useState<any>();
	const [currentStage, setCurrentStage] = useState(0);
	const [movementsPlayer1, setMovementsPlayer1] = useState(
		mainRule.stages[currentStage].movements
	);
	const [movementsPlayer2, setMovementsPlayer2] = useState(
		mainRule.stages[currentStage].movements
	);
	const [showCountDown1, setShowCountDown1] = useState(false);
	const [showCountDown2, setShowCountDown2] = useState(false);
	const [delayCounter1, setDelayCounter1] = useState(mainRule.delayPlayer1);
	const [delayCounter2, setDelayCounter2] = useState(mainRule.delayPlayer2);
	const [stageTimeCounter, setStageTimeCounter] = useState(0);
	const [winnderModal, setwinnderModal] = useState(false);
	const [counterPlayer1, setCounterPlayer1] = useState(
		settings.mainRule?.stages[currentStage].timePlayer1
	);
	const [counterPlayer2, setCounterPlayer2] = useState(
		settings.mainRule?.stages[currentStage].timePlayer2
	);

	const translator = {
		showPlayer1: showCountDown1 ? delayCounter1 : counterPlayer1,
		showPlayer2: showCountDown2 ? delayCounter2 : counterPlayer2,
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
			setTurn(1);
		} else {
			setThisPlayer1(true);
			setThisPlayer2(false);
			setTurn(0);
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
		setCurrentStage(0);
		setCounterPlayer1(settings.mainRule?.stages[currentStage].timePlayer1);
		setCounterPlayer2(settings.mainRule?.stages[currentStage].timePlayer2);
		setMovementsPlayer1(mainRule.stages[currentStage].movements);
		setMovementsPlayer2(mainRule.stages[currentStage].movements);
		setThisTotalTime(0);
		setStageTimeCounter(0);
	};

	const onSettings = () => {
		navigation.navigate('Settings');
	};

	const startCounter = () => {
		let timerId = setInterval(() => {
			if (thisPlayer1) {
				setCounterPlayer1((value) => value && value - 1);
			} else if (thisPlayer2) {
				setCounterPlayer2((value) => value && value - 1);
			}
		}, 1000);
		setTimer(timerId);
	};

	const handleCountDown1 = () => {
		const delayShow = setInterval(() => {
			if (delayCounter1 > 0) {
				setDelayCounter1((value) => value - 1);
			}
		}, 1000);
		setCountDown(delayShow);
	};

	const handleCountDown2 = () => {
		const delayShow = setInterval(() => {
			if (delayCounter2 > 0) {
				setDelayCounter2((value) => value - 1);
			}
		}, 1000);
		setCountDown(delayShow);
	};

	const stopInterval = () => {
		clearInterval(countDown);
		clearInterval(timer);
	};

	const useDelay = () => {
		console.log(mainRule.delayPlayer1);
		if (mainRule.delay && thisPlayer1) {
			setShowCountDown1(true);
			handleCountDown1();
			setTimeout(() => {
				clearInterval(countDown);
				setShowCountDown1(false);
				startCounter();
			}, mainRule.delayPlayer1 * 1000);
		} else if (mainRule.delay && thisPlayer2) {
			setShowCountDown2(true);
			handleCountDown2();
			setTimeout(() => {
				clearInterval(countDown);
				setShowCountDown2(false);
				startCounter();
			}, mainRule.delayPlayer2 * 1000);
		}
	};

	const useFisher = () => {
		if (
			thisPlayer1 &&
			movementsPlayer1 < mainRule.stages[currentStage].movements
		) {
			setCounterPlayer1((value) => value + mainRule.fischerPlayer1);
		} else if (
			thisPlayer2 &&
			movementsPlayer2 < mainRule.stages[currentStage].movements
		) {
			setCounterPlayer2((value) => value + mainRule.fischerPlayer2);
		}
	};

	const useBronstein = () => {
		if (
			thisPlayer1 &&
			movementsPlayer1 < mainRule.stages[currentStage].movements
		) {
			setCounterPlayer1((value) =>
				Math.min(
					value + mainRule.bronsteinPlayer1,
					mainRule.stages[currentStage].timePlayer1
				)
			);
		} else if (
			thisPlayer2 &&
			movementsPlayer2 < mainRule.stages[currentStage].movements
		) {
			setCounterPlayer2((value) =>
				Math.min(
					value + mainRule.bronsteinPlayer2,
					mainRule.stages[currentStage].timePlayer2
				)
			);
		}
	};

	useEffect(() => {
		let update = settings;
		dispatch(gameActions.setSettings(update));
		onReset();
	}, [isFocused]);

	useEffect(() => {
		let thisStage = mainRule.stages[currentStage];
		if (
			(thisStage.movements === 0 ||
				(movementsPlayer1 > 0 && movementsPlayer2 > 0)) &&
			counterPlayer1 > 0 &&
			counterPlayer2 > 0 &&
			(thisStage.maxTime === 0 || stageTimeCounter < thisStage.maxTime)
		) {
			return;
		} else if (currentStage < mainRule.stages.length - 1) {
			setCurrentStage((value) => value + 1);
			setCounterPlayer1(thisStage.timePlayer1);
			setCounterPlayer2(thisStage.timePlayer2);
			setMovementsPlayer1(mainRule.stages[currentStage].movements);
			setMovementsPlayer2(mainRule.stages[currentStage].movements);
			setStageTimeCounter(0);
		} else if (currentStage >= mainRule.stages.length - 1) {
			stopInterval();
			handlePlayPause();
			setwinnderModal(true);
		}
	}, [
		movementsPlayer1,
		movementsPlayer2,
		counterPlayer1,
		counterPlayer2,
		stageTimeCounter,
	]);

	useEffect(() => {
		if (!thisPlay) return;
		if (mainRule.stages[currentStage].movements === 0) return;
		if (thisPlayer1) {
			return setMovementsPlayer1((value) => value - 0.5);
		}
		if (thisPlayer2) {
			return setMovementsPlayer2((value) => value - 1);
		}
	}, [thisPlayer1, thisPlayer2]);

	useEffect(() => {
		if (delayCounter1 === 0) {
			clearInterval(countDown);
			setDelayCounter1((value) => value + mainRule.delayPlayer1);
		} else if (delayCounter2 === 0) {
			clearInterval(countDown);
			setDelayCounter2((value) => value + mainRule.delayPlayer2);
		}
	}, [delayCounter1, delayCounter2]);

	useEffect(() => {
		if (thisPlay) {
			if (mainRule.delay) {
				stopInterval();
				useDelay();
			}
			if (mainRule.increment === 'fischer') {
				useFisher();
				startCounter();
			} else if (mainRule.increment === 'bronstein') {
				useBronstein();
				startCounter();
			} else if (!mainRule.delay) {
				startCounter();
			}
		} else {
			stopInterval();
		}
	}, [thisPlay, turn]);

	useEffect(() => {
		if (thisPlay) {
			const totalTimerId = setInterval(() => {
				setThisTotalTime((value) => value + 1);
				setStageTimeCounter((value) => value + 1);
			}, 1000);
			setTotalTimer(totalTimerId);
		} else {
			clearInterval(totalTimer);
		}
	}, [thisPlay]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
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
				playerTime={translator.showPlayer2}
				totalTime={thisTotalTime}
				stage={currentStage + 1}
				moviments={movementsPlayer1}
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
				stage={currentStage + 1}
				moviments={movementsPlayer2}
				onPress={handleTapPlayer}
			/>
			<WinnerAlert
				visible={winnderModal}
				onDismiss={() => setwinnderModal(false)}
				name={thisPlayer1 ? 'Player 2' : 'Player 1'}
				time={thisTotalTime}
			/>
		</SafeAreaView>
	);
};

export default ClockScreen;
