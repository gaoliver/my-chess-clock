import { store } from '../redux'

const primaryColor = store.getState().settings.themeColor

export default {
	themeColor: primaryColor,
	textColor: '#FFF',
	screenTextColor: '#333',
	totalTimerColor: '#FFF8',
}
