import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Container, Content } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import * as gameActions from '../redux/actions';
import {
	AlertModal,
	AppHeader,
	AppSwitcher,
	MainButton,
	MainList,
} from '../components';
import { ApplicationState } from '../redux';
import Colors from '../constants/Colors';
import { IRule } from '../utils/types';

const SettingsScreen = () => {
	const dispatch = useDispatch();
	const settings = useSelector((state: ApplicationState) => state.settings);
	const [translator, setTranslator] = useState(settings);

	const toggleLandscape = () => {
		setTranslator({
			...translator,
			landscape: !translator.landscape ? true : false,
		});
	};

	const toggleSound = () => {
		setTranslator({
			...translator,
			playSound: !translator.playSound ? true : false,
		});
	};

	useEffect(() => {
		dispatch(gameActions.setSettings(translator));
	}, [translator]);

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
		sectionHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 10,
		},
		sectionTitle: {
			fontSize: 28,
		},
	});

	const DATA: Array<IRule> = [
		{
			id: 0,
			name: 'Teste 1',
			stages: [
				{
					timePlayer1: 300,
					timePlayer2: 300,
					movements: 0,
				},
			],
			increment: null,
			delay: false,
			bronsteinPlayer1: 0,
			bronsteinPlayer2: 0,
			delayPlayer1: 0,
			delayPlayer2: 0,
			fischerPlayer1: 0,
			fischerPlayer2: 0,
		},
		{
			id: 2,
			name: 'Teste 2',
			stages: [
				{
					timePlayer1: 300,
					timePlayer2: 300,
					movements: 0,
				},
			],
			increment: null,
			delay: false,
			bronsteinPlayer1: 0,
			bronsteinPlayer2: 0,
			delayPlayer1: 0,
			delayPlayer2: 0,
			fischerPlayer1: 0,
			fischerPlayer2: 0,
		},
	];

	return (
		<Container>
			<AppHeader title="Settings" hasGoBack />
			<Content style={styles.screenContent}>
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
				<View style={styles.divisor} />
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Ruleset</Text>
					<MainButton label="New Rule" />
				</View>
				{DATA.map((rule) => {
					return (
						<MainList
							name={rule.name}
							id={rule.id}
							selected={settings.mainRule?.id}
						/>
					);
				})}
				<AlertModal />
			</Content>
		</Container>
	);
};

export default SettingsScreen;
