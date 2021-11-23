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

	const [hours, setHours] = useState<number>(duration.hours());
	const [minutes, setMinutes] = useState<number>(duration.minutes());
	const [seconds, setSeconds] = useState<number>(duration.seconds());

	const handleConvertTime = () => {
		let hourToMinute = hours * 60;
		let sumMinutes = hourToMinute + minutes;
		let minuteToSeconds = sumMinutes * 60;
		let sumSeconds = minuteToSeconds + seconds;
		onChangeTime(sumSeconds);
	};

	const hoursRef = useRef<any>(null);
	const minutesRef = useRef<any>(null);
	const secondsRef = useRef<any>(null);

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
				onBlur={() => handleConvertTime()}
				keyboardType="number-pad"
				returnKeyType="next"
				ref={hoursRef}
				onSubmitEditing={() => minutesRef.current.focus()}
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
				onBlur={() => handleConvertTime()}
				keyboardType="number-pad"
				returnKeyType="next"
				ref={minutesRef}
				onSubmitEditing={() => secondsRef.current.focus()}
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
				onBlur={() => handleConvertTime()}
				keyboardType="number-pad"
				returnKeyType="done"
				ref={secondsRef}
			/>
		</View>
	);
};
