import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { RoundedButton } from '../components'
import PlayIcon from '../../assets/icons/play.svg'

const ClockScreen = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	})

	return (
		<SafeAreaView style={styles.container}>
			<RoundedButton icon={<PlayIcon />} size={60} />
		</SafeAreaView>
	)
}

export default ClockScreen
