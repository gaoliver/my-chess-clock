import { Body, Header, Left, Right, Title } from 'native-base';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/core';

interface IProps {
	title?: string;
	hasGoBack?: boolean;
	onGoBack?: () => void;
	hasSave?: boolean;
	onSave?: () => void;
}

const translator = (props: IProps) => ({
	title: props.title ? props.title : '',
	hasGoBack: props.hasGoBack ? props.hasGoBack : false,
	hasSave: props.hasSave ? props.hasSave : false,
	onSave: props.onSave ? props.onSave : () => {},
	onGoBack: props.onGoBack ? props.onGoBack : undefined,
});

export const AppHeader = (props: IProps) => {
	const { title, hasGoBack, hasSave, onSave, onGoBack } = translator(props);
	const navigation = useNavigation();

	const handleGoBack = () => {
		if (onGoBack) {
			return onGoBack();
		}
		navigation.goBack();
	};

	const styles = StyleSheet.create({
		headerContainer: {
			backgroundColor: Colors.themeColor,
		},
		title: {
			color: Colors.textColor,
		},
	});

	return (
		<Header
			style={styles.headerContainer}
			androidStatusBarColor={Colors.themeColor}
		>
			<Left>
				{hasGoBack && (
					<Pressable onPress={handleGoBack}>
						<Ionicons
							name="chevron-back-sharp"
							size={24}
							color={Colors.textColor}
						/>
					</Pressable>
				)}
			</Left>
			<Body>
				<Title style={styles.title}>{title}</Title>
			</Body>
			<Right>
				{hasSave && (
					<Pressable onPress={onSave}>
						<Ionicons name="checkmark" size={30} color={Colors.textColor} />
					</Pressable>
				)}
			</Right>
		</Header>
	);
};
