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
	const [movementsPlayer1, setMovementsPlayer1] = useState(0);
	const [movementsPlayer2, setMovementsPlayer2] = useState(0);
	const [showCountDown1, setShowCountDown1] = useState(false);
	const [showCountDown2, setShowCountDown2] = useState(false);
	const [delayCounter1, setDelayCounter1] = useState(mainRule.delayPlayer1);
	const [delayCounter2, setDelayCounter2] = useState(mainRule.delayPlayer2);
	const [currentStage, setCurrentStage] = useState(0);
	const [stageTimeCounter, setStageTimeCounter] = useState(0);
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
		setCurrentStage(0);
		setCounterPlayer1(settings.mainRule?.stages[currentStage].timePlayer1);
		setCounterPlayer2(settings.mainRule?.stages[currentStage].timePlayer2);
		setMovementsPlayer1(0);
		setMovementsPlayer2(0);
		setThisTotalTime(0);
		setStageTimeCounter(0);
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
		if (mainRule.delay && thisPlayer1) {
			setShowCountDown1(true);
			handleCountDown1();
			setTimeout(() => {
				setShowCountDown1(false);
				startCounter();
			}, mainRule.delayPlayer1 * 1000);
		} else if (mainRule.delay && thisPlayer2) {
			setShowCountDown2(true);
			handleCountDown2();
			setTimeout(() => {
				setShowCountDown2(false);
				startCounter();
			}, mainRule.delayPlayer2 * 1000);
		}
	};

	const useFisher = () => {
		if (thisPlayer1 && movementsPlayer1 > 0) {
			setCounterPlayer1((value) => value + mainRule.fischerPlayer1);
		} else if (thisPlayer2 && movementsPlayer2 > 0) {
			setCounterPlayer2((value) => value + mainRule.fischerPlayer2);
		}
	};

	const useBronstein = () => {
		if (thisPlayer1 && movementsPlayer1 > 0) {
			setCounterPlayer1((value) =>
				Math.min(
					value + mainRule.bronsteinPlayer1,
					mainRule.stages[0].timePlayer1
				)
			);
		} else if (thisPlayer2 && movementsPlayer2 > 0) {
			setCounterPlayer2((value) =>
				Math.min(
					value + mainRule.bronsteinPlayer2,
					mainRule.stages[0].timePlayer2
				)
			);
		}
	};

	useEffect(() => {
		let thisStage = mainRule.stages[currentStage];
		if (
			thisStage.movements !== 0 &&
			movementsPlayer1 < thisStage.movements &&
			movementsPlayer2 < thisStage.movements &&
			counterPlayer1 > 0 &&
			counterPlayer2 > 0 &&
			thisStage.maxTime !== 0 &&
			stageTimeCounter < thisStage.maxTime
		) {
			return;
		} else if (currentStage < mainRule.stages.length - 1) {
			setCurrentStage((value) => value + 1);
			setCounterPlayer1(thisStage.timePlayer1);
			setCounterPlayer2(thisStage.timePlayer2);
			setMovementsPlayer1(0);
			setMovementsPlayer2(0);
			setStageTimeCounter(0);
		} else if (currentStage >= mainRule.stages.length - 1) {
			alert('Finish!');
			stopInterval();
			handlePlayPause();
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
		if (thisPlayer1) {
			setMovementsPlayer1((value) => value + 1);
		} else if (thisPlayer2) {
			setMovementsPlayer2((value) => value + 1);
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
				useDelay();
			}
			if (mainRule.increment === 'fischer') {
				useFisher();
				startCounter();
			} else if (mainRule.increment === 'bronstein') {
				useBronstein();
				startCounter();
			} else {
				startCounter();
			}
		} else {
			stopInterval();
		}
	}, [thisPlay, thisPlayer1, thisPlayer2]);

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
				moviments={mainRule.stages[currentStage].movements - movementsPlayer1}
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
				moviments={mainRule.stages[currentStage].movements - movementsPlayer2}
				onPress={handleTapPlayer}
			/>
		</SafeAreaView>
	);
};

export default ClockScreen;
