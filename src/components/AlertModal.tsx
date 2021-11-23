import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';

import { AppBox } from './AppBox';
import { MainButton } from './MainButton';
import Colors from '../constants/Colors';

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

	const styles = StyleSheet.create({
		boxContainer: {
			width: '100%',
		},
		boxHeader: {
			width: '100%',
			alignItems: 'flex-end',
			marginBottom: 10,
		},
		boxBody: {
			flex: 1,
			width: '100%',
			justifyContent: 'space-around',
		},
	});

	const Children = () => {
		const fontSize = 16;

		return (
			<AppBox color={Colors.textColor} style={styles.boxContainer}>
				<View style={styles.boxHeader}>
					<Pressable onPress={onDismiss}>
						<AntDesign name="close" size={25} />
					</Pressable>
				</View>
				<View style={styles.boxBody}>
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
				</View>
			</AppBox>
		);
	};
	return (
		<ReactNativeModal
			isVisible={visible}
			onDismiss={onDismiss}
			onBackButtonPress={onDismiss}
			onBackdropPress={onDismiss}
			children={<Children />}
		/>
	);
};
