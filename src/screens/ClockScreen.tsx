import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import { AppTimer, RoundedButton } from '../components'
import PlayIcon from '../../assets/icons/play.svg'
import PauseIcon from '../../assets/icons/pause.svg'
import SettingsIcon from '../../assets/icons/settings.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'
import { ApplicationState } from '../redux'

const ClockScreen = () => {
	const { settings } = useSelector((state: ApplicationState) => state)

	const landscape = (direction: string) => {
		let landscape = settings.landscape
		if (landscape) {
			return 'landscape'
		} else if (direction === 'up' || direction === 'down') {
			return direction
		}
	}

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
			<AppTimer direction={landscape('down')} />
			<View style={styles.buttons}>
				<RoundedButton
					landscape={settings.landscape}
					icon={<SettingsIcon />}
					size={55}
				/>
				<RoundedButton
					landscape={settings.landscape}
					icon={<PlayIcon />}
					size={65}
				/>
				<RoundedButton
					landscape={settings.landscape}
					icon={<RefreshIcon />}
					size={55}
				/>
			</View>
			<AppTimer disabled direction={landscape('up')} />
		</SafeAreaView>
	)
}

export default ClockScreen
