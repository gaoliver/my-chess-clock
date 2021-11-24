import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content } from 'native-base';

import { AppHeader } from '../components';

const StageScreen = () => {
	return (
		<Container>
			<AppHeader title="Editar" hasGoBack hasSave onSave={() => {}} />
			<Content></Content>
		</Container>
	);
};

export default StageScreen;

const styles = StyleSheet.create({});
