import { store } from '../redux';

const primaryColor = store.getState().settings.themeColor;

export default {
	themeColor: primaryColor,
	textColor: '#FFF',
	screenTextColor: '#333',
	totalTimerColor: '#FFF8',
	sectionBackground: '#F5F5F5',
	grey: '#ddd',
};
