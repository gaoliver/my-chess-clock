import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';

import { AppBox } from './AppBox';
import Colors from '../constants/Colors';

interface IProps {
	visible?: boolean;
	onDismiss?: () => void;
	height?: number | string;
	justifyContent?:
		| 'flex-end'
		| 'flex-start'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
		| undefined;
}

const translator = (props: IProps) => ({
	visible: props.visible ? props.visible : false,
	height: props.height ? props.height : 230,
	justifyContent: props.justifyContent ? props.justifyContent : 'space-evenly',
	onDismiss: props.onDismiss ? props.onDismiss : () => {},
});

export const AppModal: React.FC<IProps> = (props) => {
	const { visible, onDismiss, height, justifyContent } = translator(props);

	const styles = StyleSheet.create({
		boxContainer: {
			width: '100%',
			height: height,
		},
		boxHeader: {
			width: '100%',
			alignItems: 'flex-end',
			marginBottom: 25,
		},
		boxBody: {
			flex: 1,
			width: '100%',
			justifyContent: justifyContent,
		},
	});

	const Children = () => {
		return (
			<AppBox color={Colors.textColor} style={styles.boxContainer}>
				<View style={styles.boxHeader}>
					<Pressable onPress={onDismiss}>
						<AntDesign name="close" size={25} />
					</Pressable>
				</View>
				<View style={styles.boxBody}>{props.children}</View>
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
