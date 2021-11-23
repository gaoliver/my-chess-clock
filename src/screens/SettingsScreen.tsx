import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import * as gameActions from '../redux/actions'
import { AppHeader, AppSwitcher } from '../components'
import { ApplicationState } from '../redux'
import Colors from '../constants/Colors'

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

	const toggleSound = () => {
		setTranslator({
			...translator,
			playSound: !translator.playSound ? true : false,
		})
	}

	useEffect(() => {
		dispatch(gameActions.setSettings(translator))
	}, [translator])

	const styles = StyleSheet.create({
		screenContent: {
			paddingHorizontal: 20,
			paddingVertical: 10,
		},
		divisor: {
			width: '100%',
			height: 1,
			backgroundColor: Colors.screenTextColor,
			marginVertical: 20,
		},
	})

	return (
		<Container>
			<AppHeader title="Settings" hasGoBack />
			<Content style={styles.screenContent}>
				<View style={styles.divisor} />
				<AppSwitcher
					label="Landscape"
					value={translator.landscape}
					onValueChange={toggleLandscape}
				/>
				<AppSwitcher
					label="Sound"
					value={translator.playSound}
					onValueChange={toggleSound}
				/>
			</Content>
		</Container>
	)
}

export default SettingsScreen
