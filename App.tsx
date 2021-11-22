import { StatusBar } from 'expo-status-bar'
import React from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
	let [fontsLoaded] = Font.useFonts({
		'digital-number': require('./assets/fonts/Digital_Play_St.ttf'),
		'white-dream': require('./assets/fonts/WhiteDream.otf'),
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
