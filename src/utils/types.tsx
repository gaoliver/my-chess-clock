export interface ISettings {
	themeColor: string
	playSound: boolean
	landscape: boolean
	ruleset: Array<IRule>
	mainRule: IRule | undefined
}

export interface IRule {
	stages: Array<IStage>
	increment: 'fischer' | 'bronstein'
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
