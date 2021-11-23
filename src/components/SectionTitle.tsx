import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {
	text?: string;
	fontSize?: number;
	fullWidth?: boolean;
}

const translator = (props: IProps) => ({
	text: props.text ? props.text : '',
	fontSize: props.fontSize ? props.fontSize : 28,
	fullWidth: props.fullWidth ? props.fullWidth : false,
});

export const SectionTitle = (props: IProps) => {
	const { text, fontSize, fullWidth } = translator(props);

	const styles = StyleSheet.create({
		sectionTitle: {
			fontSize: fontSize,
			width: fullWidth ? '100%' : undefined,
		},
	});

	return <Text style={styles.sectionTitle}>{text}</Text>;
};
