import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

import { AppTimer, RoundedButton } from '../components'
import * as gameActions from '../redux'
import PlayIcon from '../../assets/icons/play.svg'
import PauseIcon from '../../assets/icons/pause.svg'
import SettingsIcon from '../../assets/icons/settings.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'
import { ApplicationState } from '../redux'

const ClockScreen = () => {
	const dispatch = useDispatch()
	const {
		settings,
		timePlayer1,
		timePlayer2,
		totalTime,
		play,
		player1,
		player2,
	} = useSelector((state: ApplicationState) => state)

	const [thisPlay, setThisPlay] = useState(play)
	const [thisPlayer1, setThisPlayer1] = useState(player1)
	const [thisPlayer2, setThisPlayer2] = useState(player2)
	const [counterPlayer1, setCounterPlayer1] = useState(timePlayer1)
	const [counterPlayer2, setCounterPlayer2] = useState(timePlayer2)
	const [thisTotalTime, setThisTotalTime] = useState(totalTime)
	const [totalTimer, setTotalTimer] = useState<any>()
	const [timer, setTimer] = useState<any>()

	const landscape = (direction: string) => {
		let landscape = settings.landscape
		if (landscape) {
			return 'landscape'
		} else if (direction === 'up' || direction === 'down') {
			return direction
		}
	}

	const handleTapPlayer = () => {
		clearInterval(timer)
		if (thisPlayer1) {
			setThisPlayer1(false)
			setThisPlayer2(true)
		} else {
			setThisPlayer1(true)
			setThisPlayer2(false)
		}
		dispatch(gameActions.setTimerPlayer1(thisPlayer1))
		dispatch(gameActions.setTimerPlayer2(thisPlayer2))
	}

	const handlePlayPause = () => {
		if (thisPlay) {
			setThisPlay(false)
			dispatch(gameActions.setTimerPlayer1(counterPlayer1))
			dispatch(gameActions.setTimerPlayer2(counterPlayer2))
		} else {
			setThisPlay(true)
		}
		dispatch(gameActions.setPlayPause(thisPlay))
	}

	const onReset = () => {
		dispatch(gameActions.setPlayPause(false))
		dispatch(gameActions.setTimerPlayer1(0))
		dispatch(gameActions.setTimerPlayer2(0))
		dispatch(gameActions.setTotalTime(0))

		setThisPlay(false)
		setCounterPlayer1(0)
		setCounterPlayer2(0)
		setThisTotalTime(0)
	}

	useEffect(() => {
		if (thisPlay) {
			const timerId = setInterval(() => {
				if (thisPlayer1) {
					setCounterPlayer1((value) => value + 1)
				} else if (thisPlayer2) {
					setCounterPlayer2((value) => value + 1)
				}
			}, 1000)
			setTimer(timerId)
		} else {
			clearInterval(timer)
		}
	}, [thisPlay, thisPlayer1, thisPlayer2])

	useEffect(() => {
		if (thisPlay) {
			const totalTimerId = setInterval(
				() => setThisTotalTime((value) => value + 1),
				1000
			)
			setTotalTimer(totalTimerId)
		} else {
			clearInterval(totalTimer)
		}
	}, [thisPlay])

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
	})

	return (
		<SafeAreaView style={styles.container}>
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
				/>
			</View>
			<AppTimer
				disabled={!thisPlayer1}
				direction={landscape('up')}
				playerTime={counterPlayer1}
				totalTime={thisTotalTime}
				onPress={handleTapPlayer}
			/>
		</SafeAreaView>
	)
}

export default ClockScreen
