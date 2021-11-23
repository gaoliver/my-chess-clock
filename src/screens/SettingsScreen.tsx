import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Container, Content } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import * as gameActions from '../redux/actions';
import { AlertModal, AppHeader, AppSwitcher, ListCreator } from '../components';
import { ApplicationState } from '../redux';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationParamsProp } from '../utils/types';

const SettingsScreen = ({ navigation }: NavigationParamsProp) => {
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
		if (newRule) {
			setTranslator({
				...translator,
				mainRule: newRule,
			});
		}
		dispatch(gameActions.setSettings(translator));
		setModal(false);
	};

	const onEditRule = () => {
		let thisRule = translator.ruleset.find((rule) => rule.id === modalRuleId);
		setModal(false);
		if (thisRule) {
			navigation.navigate('Rule', { rule: thisRule });
		}
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
	});

	return (
		<Container>
			<AppHeader title="Settings" hasGoBack />
			<Content style={styles.screenContent}>
				<ListCreator
					title="Ruleset"
					buttonTitle="New Rule"
					listData={translator.ruleset}
					onPressItem={handleOpenModal}
					selected={translator.mainRule?.id}
				/>
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
					onPressEdit={onEditRule}
				/>
			</Content>
		</Container>
	);
};

export default SettingsScreen;
