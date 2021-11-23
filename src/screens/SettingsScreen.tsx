import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import * as gameActions from '../redux/actions'
import { AppHeader, AppSwitcher } from '../components'
import { ApplicationState } from '../redux'
import { TriangleColorPicker as ColorPicker } from 'react-native-color-picker'

const SettingsScreen = () => {
	const dispatch = useDispatch()
	const settings = useSelector((state: ApplicationState) => state.settings)
	const [translator, setTranslator] = useState(settings)

	const toggleLandscape = () => {
		setTranslator({
			...translator,
			landscape: !translator.landscape ? true : false,
		})
	}

	useEffect(() => {
		dispatch(gameActions.setSettings(translator))
	}, [translator])

	return (
		<View>
			<AppHeader title="Settings" hasGoBack />
			<AppSwitcher
				label="Landscape"
				value={translator.landscape}
				onValueChange={toggleLandscape}
			/>
			<ColorPicker
				onColorSelected={(color) => alert(`Color selected: ${color}`)}
				style={{ flex: 1 }}
			/>
		</View>
	)
}

export default SettingsScreen

const styles = StyleSheet.create({})
