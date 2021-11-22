import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackNavigationProp } from '@react-navigation/stack'

export type NavigationProp = StackNavigationProp<StackParamList, 'Home'>
export type NavigationParamsProp = NativeStackScreenProps<
	StackParamList,
	'Home'
>

export type StackParamList = {
	Home: undefined
	Settings: undefined
	Ruleset: undefined
	Rule: undefined
}

export enum fontFamily {
	digitalNumber = 'digital-number',
	whiteDream = 'white-dream',
}

export interface ISettings {
	themeColor: string
	playSound: boolean
	landscape: boolean
	ruleset: Array<IRule>
	mainRule: IRule | undefined
}

export interface IRule {
	stages: Array<IStage>
	increment: 'fischer' | 'bronstein' | null
	delay: boolean
	delayPlayer1: number
	delayPlayer2: number
	fischerPlayer1: number
	fischerPlayer2: number
	bronsteinPlayer1: number
	bronsteinPlayer2: number
}

export interface IStage {
	timePlayer1: number
	timePlayer2: number
	movements: number
}
