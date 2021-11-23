import { Body, Header, Left, Right, Title } from 'native-base'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/core'

interface IProps {
	title?: string
	hasGoBack?: boolean
}

const translator = (props: IProps) => ({
	title: props.title ? props.title : '',
	hasGoBack: props.hasGoBack ? props.hasGoBack : false,
})

export const AppHeader = (props: IProps) => {
	const { title, hasGoBack } = translator(props)
	const navigation = useNavigation()

	const onGoBack = () => {
		navigation.goBack()
	}

	const styles = StyleSheet.create({
		headerContainer: {
			backgroundColor: Colors.themeColor,
		},
		title: {
			color: Colors.textColor,
		},
	})

	return (
		<Header
			style={styles.headerContainer}
			androidStatusBarColor={Colors.themeColor}
		>
			<Left>
				{hasGoBack && (
					<Pressable onPress={onGoBack}>
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
			<Right></Right>
		</Header>
	)
}
