import React from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { persistor, store } from './src/redux';
import { StackParamList } from './src/utils/types';
import ClockScreen from './src/screens/ClockScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import RuleScreen from './src/screens/RuleScreen';

export default function App() {
	const Stack = createNativeStackNavigator<StackParamList>();

	let [fontsLoaded] = Font.useFonts({
		'digital-number': require('./assets/fonts/Digital_Play_St.ttf'),
		'white-dream': require('./assets/fonts/WhiteDream.otf'),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{ headerShown: false }}
						initialRouteName="Home"
					>
						<Stack.Screen name="Home" component={ClockScreen} />
						<Stack.Screen name="Settings" component={SettingsScreen} />
						<Stack.Screen name="Rule" component={RuleScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
