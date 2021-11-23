import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';

import { AppBox } from './AppBox';
import { MainButton } from './MainButton';
import Colors from '../constants/Colors';
import { AppModal } from './AppModal';

interface IProps {
	visible?: boolean;
	onDismiss?: () => void;
	onPressSet?: () => void;
	onPressEdit?: () => void;
	onPressRemove?: () => void;
}

const translator = (props: IProps) => ({
	visible: props.visible ? props.visible : false,
	onDismiss: props.onDismiss ? props.onDismiss : () => {},
	onPressSet: props.onPressSet ? props.onPressSet : () => {},
	onPressEdit: props.onPressEdit ? props.onPressEdit : () => {},
	onPressRemove: props.onPressRemove ? props.onPressRemove : () => {},
});

export const AlertModal = (props: IProps) => {
	const { visible, onDismiss, onPressSet, onPressEdit, onPressRemove } =
		translator(props);

	const fontSize = 16;
	return (
		<AppModal visible={visible} onDismiss={onDismiss}>
			<MainButton
				label="Set"
				fullWidth
				center
				fontSize={fontSize}
				onPress={onPressSet}
			/>
			<MainButton
				label="Edit"
				fullWidth
				center
				fontSize={fontSize}
				onPress={onPressEdit}
			/>
			<MainButton
				label="Remove"
				fullWidth
				center
				fontSize={fontSize}
				onPress={onPressRemove}
				color="red"
			/>
		</AppModal>
	);
};
