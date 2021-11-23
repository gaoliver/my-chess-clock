import { Container, Content } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components';
import { NavigationParamsProp } from '../utils/types';

const RuleScreen = ({ route, navigation }: NavigationParamsProp) => {
	const { rule } = route.params;

	const handleSave = () => {
		navigation.goBack();
	};
	return (
		<Container>
			<AppHeader title={rule.name} onSave={handleSave} hasSave hasGoBack />
			<Content style={styles.content}>
				<Text>{rule?.id}</Text>
			</Content>
		</Container>
	);
};

export default RuleScreen;

const styles = StyleSheet.create({
	content: {
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
});
