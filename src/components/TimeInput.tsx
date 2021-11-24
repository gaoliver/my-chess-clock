import moment from 'moment';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Colors from '../constants/Colors';

interface IProps {
	interval?: number;
	label?: string;
	disabled?: boolean;
	onChangeTime?: (value: number) => void;
	padding?: boolean;
}

const translator = (props: IProps) => ({
	interval: props.interval ? props.interval : 0,
	label: props.label ? props.label : undefined,
	disabled: props.disabled ? props.disabled : false,
	padding: props.padding ? props.padding : false,
	onChangeTime: props.onChangeTime ? props.onChangeTime : () => {},
});

export const TimeInput = (props: IProps) => {
	const { interval, onChangeTime, label, disabled, padding } =
		translator(props);
	const duration = moment.duration(interval, 'seconds');

	let hoursConvert = duration.hours();
	let minutesConvert = duration.minutes();
	let secondsConvert = duration.seconds();

	const [hours, setHours] = useState<number>(hoursConvert);
	const [minutes, setMinutes] = useState<number>(minutesConvert);
	const [seconds, setSeconds] = useState<number>(secondsConvert);

	const handleConvertTime = () => {
		let hoursToSeconds = moment.duration(hours, 'hours').asSeconds();
		let minutesToSeconds = moment.duration(minutes, 'minutes').asSeconds();
		let sum = hoursToSeconds + minutesToSeconds + seconds;
		onChangeTime(sum);

		setHours(hoursConvert);
		setMinutes(minutesConvert);
		setSeconds(secondsConvert);
	};

	const styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			opacity: disabled ? 0.7 : 1,
			padding: padding ? 10 : 0,
		},
		input: {
			width: 40,
			height: 40,
			backgroundColor: Colors.textColor,
		},
		label: {
			fontSize: 18,
			marginRight: 15,
			color: Colors.screenTextColor,
		},
		divider: {
			marginHorizontal: 10,
		},
	});

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={styles.input}
				textAlign="center"
				editable={!disabled}
				value={hours.toFixed()}
				onChangeText={(value) => {
					setHours(Number(value));
				}}
				keyboardType="number-pad"
				returnKeyType="next"
				onBlur={handleConvertTime}
				onSubmitEditing={handleConvertTime}
			/>
			<Text style={styles.divider}>:</Text>
			<TextInput
				style={styles.input}
				textAlign="center"
				editable={!disabled}
				value={minutes.toFixed()}
				onChangeText={(value) => {
					setMinutes(Number(value));
				}}
				keyboardType="number-pad"
				returnKeyType="next"
				onBlur={handleConvertTime}
				onSubmitEditing={handleConvertTime}
			/>
			<Text style={styles.divider}>:</Text>
			<TextInput
				style={styles.input}
				textAlign="center"
				editable={!disabled}
				value={seconds.toFixed()}
				onChangeText={(value) => {
					setSeconds(Number(value));
				}}
				keyboardType="number-pad"
				returnKeyType="done"
				onBlur={handleConvertTime}
				onSubmitEditing={handleConvertTime}
			/>
		</View>
	);
};
