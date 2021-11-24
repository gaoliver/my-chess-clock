import React from 'react';
import { store } from '../redux';

// var primaryColor = store.getState().settings.themeColor;

export default {
	themeColor: store.getState().settings.themeColor,
	textColor: '#FFF',
	screenTextColor: '#333',
	totalTimerColor: '#FFF8',
	sectionBackground: '#F5F5F5',
	grey: '#ddd',
};
