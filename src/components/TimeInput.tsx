import moment from 'moment';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Colors from '../constants/Colors';

interface IProps {
	interval?: number;
	label?: string;
	onChangeTime?: (value: number) => void;
}

const translator = (props: IProps) => ({
	interval: props.interval ? props.interval : 0,
	label: props.label ? props.label : undefined,
	onChangeTime: props.onChangeTime ? props.onChangeTime : () => {},
});

export const TimeInput = (props: IProps) => {
	const { interval, onChangeTime, label } = translator(props);
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
				value={minutes.toFixed()}
				onChangeText={(value) => {
					setMinutes(Number(value));
					handleConvertTime();
				}}
				keyboardType="number-pad"
				returnKeyType="next"
				ref={minutesRef}
				onSubmitEditing={() => secondsRef.current.focus()}
			/>
			<Text style={styles.divider}>:</Text>
			<TextInput
				style={styles.input}
				textAlign="center"
				value={seconds.toFixed()}
				onChangeText={(value) => {
					setSeconds(Number(value));
					handleConvertTime();
				}}
				keyboardType="number-pad"
				returnKeyType="done"
				ref={secondsRef}
			/>
		</View>
	);
};
