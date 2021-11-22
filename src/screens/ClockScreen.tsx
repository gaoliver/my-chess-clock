import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AppBox, AppTimer, RoundedButton } from '../components'
import PlayIcon from '../../assets/icons/play.svg'
import PauseIcon from '../../assets/icons/pause.svg'
import SettingsIcon from '../../assets/icons/settings.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'

const ClockScreen = () => {
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
			<AppTimer />
			<View style={styles.buttons}>
				<RoundedButton icon={<SettingsIcon />} size={55} />
				<RoundedButton icon={<PlayIcon />} size={65} />
				<RoundedButton icon={<RefreshIcon />} size={55} />
			</View>
			<AppBox disabled />
		</SafeAreaView>
	)
}

export default ClockScreen
