import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppHeader } from '../components'

const SettingsScreen = () => {
	return (
		<View>
			<AppHeader title="Settings" hasGoBack />
			<Text>Settings Screen</Text>
		</View>
	)
}

export default SettingsScreen

const styles = StyleSheet.create({})
