import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Container, Content } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import * as gameActions from '../redux/actions';
import {
	AlertModal,
	AppHeader,
	AppSwitcher,
	ListCreator,
	MainButton,
} from '../components';
import { ApplicationState, store } from '../redux';
import { NavigationProp } from '../utils/types';
import { useIsFocused } from '@react-navigation/native';

interface IProps {
	navigation: NavigationProp;
}

const SettingsScreen = ({ navigation }: IProps) => {
	const dispatch = useDispatch();
	const settings = useSelector((state: ApplicationState) => state.settings);
	const isFocused = useIsFocused();
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

	const onPressDelete = () => {
		let newSettings = settings;
		let ruleIndex = newSettings.ruleset.findIndex(
			(item) => item.id === modalRuleId
		);
		newSettings.ruleset.splice(ruleIndex, 1);
		dispatch(gameActions.setSettings(newSettings));
		setModal(false);
	};

	useEffect(() => {
		dispatch(gameActions.setSettings(translator));
	}, [translator]);

	useEffect(() => {
		let update = settings;
		dispatch(gameActions.setSettings(update));
		onSetRule(translator.mainRule.id);
	}, [isFocused]);

	const styles = StyleSheet.create({
		screenContent: {
			paddingHorizontal: 20,
			paddingVertical: 10,
		},
		divisor: {
			width: '100%',
			height: 2,
			backgroundColor: store.getState().settings.themeColor,
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
					onPressButton={() => navigation.navigate('Rule', { rule: undefined })}
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
				<View style={styles.divisor} />
				<MainButton
					label="Set new theme color"
					onPress={() => navigation.navigate('ColorPicker')}
					center
					fullWidth
				/>
				<MainButton
					label="Reset settings"
					onPress={() => dispatch(gameActions.setRestore())}
					center
					fullWidth
					style={{ marginTop: 10 }}
				/>
				<AlertModal
					visible={modal}
					onDismiss={() => setModal(false)}
					onPressSet={() => onSetRule(modalRuleId)}
					onPressEdit={onEditRule}
					onPressRemove={onPressDelete}
				/>
			</Content>
		</Container>
	);
};

export default SettingsScreen;
