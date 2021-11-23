import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

export type NavigationProp = StackNavigationProp<StackParamList, 'Home'>;
export type NavigationParamsProp = NativeStackScreenProps<
	StackParamList,
	'Rule'
>;

export type StackParamList = {
	Home: undefined;
	Settings: undefined;
	Rule: { rule: IRule };
};

export enum fontFamily {
	digitalNumber = 'digital-number',
	whiteDream = 'white-dream',
}

export interface IDirectionTranslator {
	container: {
		flexDirection:
			| 'row'
			| 'column'
			| 'row-reverse'
			| 'column-reverse'
			| undefined;
		justifyContent:
			| 'space-around'
			| 'center'
			| 'flex-start'
			| 'flex-end'
			| 'space-between'
			| 'space-evenly'
			| undefined;
		rotate: any;
	};
	total: {
		top: any;
		left: any;
	};
	playerTime: {
		fontSize: number;
	};
	rotate: any;
}

export interface ISettings {
	themeColor: string;
	playSound: boolean;
	landscape: boolean;
	ruleset: Array<IRule>;
	mainRule: IRule;
}

export interface IRule {
	id: number;
	name: string;
	stages: Array<IStage>;
	increment: 'fischer' | 'bronstein' | null;
	delay: boolean;
	delayPlayer1: number;
	delayPlayer2: number;
	fischerPlayer1: number;
	fischerPlayer2: number;
	bronsteinPlayer1: number;
	bronsteinPlayer2: number;
}

export interface IStage {
	maxTime: number;
	timePlayer1: number;
	timePlayer2: number;
	movements: number;
}
