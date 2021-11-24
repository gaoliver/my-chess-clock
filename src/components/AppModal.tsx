import React from 'react';
import {
	FlexAlignType,
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';

import { AppBox } from './AppBox';
import Colors from '../constants/Colors';

interface IProps {
	visible?: boolean;
	onDismiss?: () => void;
	height?: number | string;
	style?: StyleProp<ViewStyle>;
	alignItems?: FlexAlignType | undefined;
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
	style: props.style ? props.style : {},
	justifyContent: props.justifyContent ? props.justifyContent : 'space-evenly',
	alignItems: props.alignItems ? props.alignItems : undefined,
	onDismiss: props.onDismiss ? props.onDismiss : () => {},
});

export const AppModal: React.FC<IProps> = (props) => {
	const { visible, onDismiss, height, justifyContent, alignItems, style } =
		translator(props);

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
			alignItems: alignItems,
		},
	});
	return (
		<ReactNativeModal
			isVisible={visible}
			onDismiss={onDismiss}
			onBackButtonPress={onDismiss}
			onBackdropPress={onDismiss}
		>
			<AppBox color={Colors.textColor} style={[styles.boxContainer, style]}>
				<View style={styles.boxHeader}>
					<Pressable onPress={onDismiss}>
						<AntDesign name="close" size={25} />
					</Pressable>
				</View>
				<View style={styles.boxBody}>{props.children}</View>
			</AppBox>
		</ReactNativeModal>
	);
};
