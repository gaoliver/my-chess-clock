import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/core';

import { AppTimer, RoundedButton, WinnerAlert } from '../components';
import PlayIcon from '../../assets/icons/play.svg';
import PauseIcon from '../../assets/icons/pause.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import RefreshIcon from '../../assets/icons/refresh.svg';
import { ApplicationState } from '../redux';
import { IState, NavigationParamsProp, StateActions } from '../utils/types';
import Colors from '../constants/Colors';

function init(initialState: IState) {
	return initialState;
}

function reducer(state: IState, action: { type: StateActions; payload?: any }) {
	switch (action.type) {
		case StateActions.TapPlayer1:
			return {
				...state,
				turn: 2,
				thisPlayer1: false,
				thisPlayer2: true,
			};
		case StateActions.TapPlayer2:
			return {
				...state,
				turn: 1,
				thisPlayer1: true,
				thisPlayer2: false,
			};
		case StateActions.PlayPause:
			return {
				...state,
				thisPlay: state.thisPlay ? false : true,
			};
		case StateActions.CounterPlayer1:
			return {
				...state,
				counterPlayer1: state.counterPlayer1 - 1,
			};
		case StateActions.CounterPlayer2:
			return {
				...state,
				counterPlayer2: state.counterPlayer2 - 1,
			};
		case StateActions.SetCounterPlayer1:
			return {
				...state,
				counterPlayer1: action.payload,
			};
		case StateActions.SetCounterPlayer2:
			return {
				...state,
				counterPlayer2: action.payload,
			};
		case StateActions.MovementPlayer1:
			state.movementsPlayer1 -= 1;
			return {
				...state,
			};
		case StateActions.MovementPlayer2:
			state.movementsPlayer2 -= 1;
			return {
				...state,
			};
		case StateActions.SetCountDown:
			return {
				...state,
				countDown: action.payload,
			};
		case StateActions.ShowDelay1:
			return {
				...state,
				showCountDown1: action.payload,
			};
		case StateActions.ShowDelay2:
			return {
				...state,
				showCountDown2: action.payload,
			};
		case StateActions.DelayCounter1:
			return {
				...state,
				delayCounter1: state.delayCounter1 - 1,
			};
		case StateActions.DelayCounter2:
			return {
				...state,
				delayCounter2: state.delayCounter2 - 1,
			};
		case StateActions.SetDelay1:
			return {
				...state,
				delayCounter1: action.payload,
			};
		case StateActions.SetDelay1:
			return {
				...state,
				delayCounter1: action.payload,
			};
		case StateActions.SetDelay2:
			return {
				...state,
				delayCounter2: action.payload,
			};
		case StateActions.SetDelaying:
			return {
				...state,
				delaying: action.payload,
			};
		case StateActions.NextStage:
			return {
				...state,
				currentStage: state.currentStage + 1,
				counterPlayer1: action.payload.timePlayer1,
				counterPlayer2: action.payload.timePlayer2,
				movementsPlayer1: action.payload.movements,
				movementsPlayer2: action.payload.movements,
				stageTimeCounter: 0,
			};
		case StateActions.FinishGame:
			return {
				...state,
				countDown: undefined,
				thisPlay: false,
				winnderModal: true,
			};
		case StateActions.CloseModal:
			return {
				...state,
				winnderModal: false,
			};
		case StateActions.TotalTime:
			return {
				...state,
				thisTotalTime: state.thisTotalTime + 1,
				stageTimeCounter: state.stageTimeCounter + 1,
			};
		case StateActions.SetTotalTime:
			return {
				...state,
				totalTime: action.payload,
			};
		case StateActions.Reset:
			return init(action.payload);
		default:
			return state;
	}
}

const ClockScreen = ({ navigation }: NavigationParamsProp) => {
	const isFocused = useIsFocused();
	const { settings, totalTime, play, player1, player2 } = useSelector(
		(state: ApplicationState) => state
	);

	const [disabledPlay, setDisabledPlay] = useState(false);
	const [mainRule, setMainRule] = useState({
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
	});
	const initialState: IState = {
		currentStage: 0,
		thisPlay: play,
		thisPlayer1: player1,
		thisPlayer2: player2,
		thisTotalTime: totalTime,
		turn: 0,
		stageTimeCounter: 0,
		winnderModal: false,
		showCountDown1: false,
		showCountDown2: false,
		movementsPlayer1: mainRule.stages[0].movements,
		movementsPlayer2: mainRule.stages[0].movements,
		counterPlayer1: mainRule.stages[0].timePlayer1,
		counterPlayer2: mainRule.stages[0].timePlayer2,
		delayCounter1: mainRule.delayPlayer1,
		delayCounter2: mainRule.delayPlayer2,
		countDown: undefined,
		delaying: undefined,
		totalTime: undefined,
	};
	const [state, stateDispatch] = useReducer(reducer, initialState, init);

	const translator = {
		showPlayer1: state.showCountDown1
			? state.delayCounter1
			: state.counterPlayer1,
		showPlayer2: state.showCountDown2
			? state.delayCounter2
			: state.counterPlayer2,
	};

	const getWinner =
		state.counterPlayer1 === 0 ||
		(mainRule.stages[state.currentStage].movements > 0 &&
			state.movementsPlayer1 === 1)
			? 'Player 2'
			: 'Player 1';

	const landscape = (direction: string) => {
		let landscape = settings.landscape;
		if (landscape) {
			return 'landscape';
		} else if (direction === 'up' || direction === 'down') {
			return direction;
		}
	};

	const handleTapPlayer = () => {
		if (disabledPlay) return;
		clearInterval(state.countDown);
		if (state.thisPlayer1) {
			stateDispatch({ type: StateActions.TapPlayer1 });
		} else {
			stateDispatch({ type: StateActions.TapPlayer2 });
		}
	};

	const onReset = () => {
		stateDispatch({ type: StateActions.Reset, payload: initialState });
	};

	const onSettings = () => {
		navigation.navigate('Settings');
	};

	const startCounter = () => {
		let timerId = setInterval(() => {
			if (state.thisPlayer1) {
				stateDispatch({ type: StateActions.CounterPlayer1 });
			} else if (state.thisPlayer2) {
				stateDispatch({ type: StateActions.CounterPlayer2 });
			}
		}, 1000);
		stateDispatch({ type: StateActions.SetCountDown, payload: timerId });
	};

	const handleCountDown1 = () => {
		const delayShow = setInterval(() => {
			if (state.delayCounter1 > 0) {
				stateDispatch({ type: StateActions.DelayCounter1 });
			}
		}, 1000);
		stateDispatch({ type: StateActions.SetDelaying, payload: delayShow });
	};

	const handleCountDown2 = () => {
		const delayShow = setInterval(() => {
			if (state.delayCounter2 > 0) {
				stateDispatch({ type: StateActions.DelayCounter2 });
			}
		}, 1000);
		stateDispatch({ type: StateActions.SetDelaying, payload: delayShow });
	};

	const stopInterval = () => {
		clearInterval(state.delaying);
		clearInterval(state.countDown);
	};

	const useDelay = () => {
		setDisabledPlay(true);
		if (mainRule.delay && state.thisPlayer1) {
			stateDispatch({ type: StateActions.ShowDelay1, payload: true });
			handleCountDown1();
			setTimeout(() => {
				stateDispatch({ type: StateActions.ShowDelay1, payload: false });
				clearInterval(state.delaying);
				setDisabledPlay(false);
				startCounter();
			}, mainRule.delayPlayer1 * 1000);
		} else if (mainRule.delay && state.thisPlayer2) {
			stateDispatch({ type: StateActions.ShowDelay2, payload: true });
			handleCountDown2();
			setTimeout(() => {
				stateDispatch({ type: StateActions.ShowDelay2, payload: false });
				clearInterval(state.delaying);
				setDisabledPlay(false);
				startCounter();
			}, mainRule.delayPlayer2 * 1000);
		}
	};

	const useFisher = () => {
		if (
			state.thisPlayer1 &&
			state.movementsPlayer1 <= mainRule.stages[state.currentStage].movements
		) {
			stateDispatch({
				type: StateActions.SetCounterPlayer1,
				payload: state.counterPlayer1 + mainRule.fischerPlayer1,
			});
		} else if (
			state.thisPlayer2 &&
			state.movementsPlayer2 <= mainRule.stages[state.currentStage].movements
		) {
			stateDispatch({
				type: StateActions.SetCounterPlayer2,
				payload: state.counterPlayer2 + mainRule.fischerPlayer2,
			});
		}
	};

	const useBronstein = () => {
		if (
			state.thisPlayer1 &&
			state.movementsPlayer1 <= mainRule.stages[state.currentStage].movements
		) {
			stateDispatch({
				type: StateActions.SetCounterPlayer1,
				payload: Math.min(
					state.counterPlayer1 + mainRule.bronsteinPlayer1,
					mainRule.stages[state.currentStage].timePlayer1
				),
			});
		} else if (
			state.thisPlayer2 &&
			state.movementsPlayer2 <= mainRule.stages[state.currentStage].movements
		) {
			stateDispatch({
				type: StateActions.SetCounterPlayer2,
				payload: Math.min(
					state.counterPlayer2 + mainRule.bronsteinPlayer2,
					mainRule.stages[state.currentStage].timePlayer2
				),
			});
		}
	};

	const goToNextStage = () => {
		stateDispatch({
			type: StateActions.NextStage,
			payload: settings.mainRule.stages[state.currentStage + 1],
		});
	};

	useEffect(() => {
		setMainRule({ ...settings.mainRule });
		setTimeout(() => {
			onReset();
		}, 500);
	}, [isFocused]);

	useEffect(() => {
		let thisStage = mainRule.stages[state.currentStage];

		if (thisStage.maxTime > 0 && state.stageTimeCounter === thisStage.maxTime) {
			return goToNextStage();
		}

		if (
			(thisStage.movements > 0 &&
				state.movementsPlayer1 <= thisStage.movements &&
				state.movementsPlayer1 > 0 &&
				state.movementsPlayer2 <= thisStage.movements &&
				state.movementsPlayer2 > 0 &&
				state.counterPlayer1 > 0 &&
				state.counterPlayer2 > 0) ||
			(thisStage.movements === 0 &&
				state.counterPlayer1 > 0 &&
				state.counterPlayer2 > 0)
		) {
			return;
		} else if (state.currentStage < mainRule.stages.length - 1) {
			goToNextStage();
		} else if (state.currentStage >= mainRule.stages.length - 1) {
			stopInterval();
			stateDispatch({ type: StateActions.FinishGame });
		}
	}, [
		state.movementsPlayer1,
		state.movementsPlayer2,
		state.counterPlayer1,
		state.counterPlayer2,
		state.stageTimeCounter,
	]);

	useEffect(() => {
		if (!state.thisPlay) return;
		if (mainRule.stages[state.currentStage].movements === 0) return;
		if (state.thisPlayer1) {
			return stateDispatch({ type: StateActions.MovementPlayer1 });
		}
		if (state.thisPlayer2) {
			return stateDispatch({ type: StateActions.MovementPlayer2 });
		}
	}, [state.thisPlayer1, state.thisPlayer2]);

	useEffect(() => {
		if (state.delayCounter1 === 0) {
			clearInterval(state.delaying);
			stateDispatch({
				type: StateActions.SetDelay1,
				payload: mainRule.delayPlayer1,
			});
		} else if (state.delayCounter2 === 0) {
			clearInterval(state.delaying);
			stateDispatch({
				type: StateActions.SetDelay2,
				payload: mainRule.delayPlayer2,
			});
		}
	}, [state.delayCounter1, state.delayCounter2]);

	useEffect(() => {
		if (state.thisPlay) {
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
	}, [state.thisPlay, state.turn]);

	useEffect(() => {
		if (state.thisPlay) {
			const totalTimerId = setInterval(() => {
				stateDispatch({ type: StateActions.TotalTime });
			}, 1000);
			stateDispatch({ type: StateActions.SetTotalTime, payload: totalTimerId });
		} else {
			clearInterval(state.totalTime);
		}
	}, [state.thisPlay]);

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
				totalTime={state.thisTotalTime}
				stage={state.currentStage + 1}
				moviments={state.movementsPlayer1}
				disabled={!state.thisPlayer2}
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
					onPress={() => stateDispatch({ type: StateActions.PlayPause })}
					icon={state.thisPlay ? <PauseIcon /> : <PlayIcon />}
					size={65}
					disabled={disabledPlay}
				/>
				<RoundedButton
					landscape={settings.landscape}
					icon={<RefreshIcon />}
					size={55}
					onPress={onReset}
					disabled={state.thisTotalTime === 0}
				/>
			</View>
			<AppTimer
				disabled={!state.thisPlayer1}
				direction={landscape('up')}
				playerTime={translator.showPlayer1}
				totalTime={state.thisTotalTime}
				stage={state.currentStage + 1}
				moviments={state.movementsPlayer2}
				onPress={handleTapPlayer}
			/>
			<WinnerAlert
				visible={state.winnderModal}
				onDismiss={() => stateDispatch({ type: StateActions.CloseModal })}
				name={getWinner}
				time={state.thisTotalTime}
			/>
		</SafeAreaView>
	);
};

export default ClockScreen;
