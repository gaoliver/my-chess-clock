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
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
	const dispatch = useDispatch();
	const settings = useSelector((state: ApplicationState) => state.settings);
	const [translator, setTranslator] = useState(settings);
	const [modal, setModal] = useState(false);
	const [modalRuleId, setModalRuleId] = useState(0);

	const handleOpenModal = (id: number) => {
		setModal(true);
		setModalRuleId(id);
	};

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

	const onSetRule = (id: number) => {
		let newRule = translator.ruleset.find((rule) => rule.id === id);
		setTranslator({
			...translator,
			mainRule: newRule,
		});
		dispatch(gameActions.setSettings(translator));
		setModal(false);
	};

	useEffect(() => {
		dispatch(gameActions.setSettings(translator));
	}, [translator]);

	useEffect(() => {
		// AsyncStorage.clear();
	}, []);

	const styles = StyleSheet.create({
		screenContent: {
			paddingHorizontal: 20,
			paddingVertical: 10,
		},
		divisor: {
			width: '100%',
			height: 2,
			backgroundColor: Colors.themeColor,
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

	return (
		<Container>
			<AppHeader title="Settings" hasGoBack />
			<Content style={styles.screenContent}>
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Ruleset</Text>
					<MainButton label="New Rule" />
				</View>
				{translator.ruleset.map((rule) => {
					return (
						<MainList
							key={Math.round(100)}
							name={rule.name}
							id={rule.id}
							selected={translator.mainRule?.id}
							onPress={() => handleOpenModal(rule?.id)}
						/>
					);
				})}
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
				<AlertModal
					visible={modal}
					onDismiss={() => setModal(false)}
					onPressSet={() => onSetRule(modalRuleId)}
				/>
			</Content>
		</Container>
	);
};

export default SettingsScreen;
