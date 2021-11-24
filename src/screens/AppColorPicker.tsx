import React, { useState } from 'react';
import { Container } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { fromHsv, toHsv, TriangleColorPicker } from 'react-native-color-picker';
import { useDispatch, useSelector } from 'react-redux';
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers';

import { AppHeader } from '../components';
import { ApplicationState } from '../redux';
import * as gameActions from '../redux/actions';

const AppColorPicker = () => {
	const { settings } = useSelector((state: ApplicationState) => state);
	const dispatch = useDispatch();
	const oldColor = settings.themeColor;
	const [color, setColor] = useState<string>(settings.themeColor);

	const onChangeColor = (value: HsvColor) => {
		setColor(fromHsv(value));
	};

	const onSaveColor = () => {
		let newSettings = settings;
		newSettings.themeColor = color;
		dispatch(gameActions.setSettings(newSettings));
	};

	return (
		<Container>
			<AppHeader title="New color" hasGoBack hasSave onSave={onSaveColor} />
			<TriangleColorPicker
				oldColor={oldColor}
				color={toHsv(color)}
				onColorChange={onChangeColor}
				onColorSelected={(value) => setColor(value)}
				onOldColorSelected={(color) => setColor(color)}
				style={{ flex: 1 }}
			/>
		</Container>
	);
};

export default AppColorPicker;

const styles = StyleSheet.create({});
