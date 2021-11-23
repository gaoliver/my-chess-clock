import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MainButton } from './MainButton';
import { MainList } from './MainList';

interface IProps {
	listData?: Array<any>;
	title?: string;
	buttonTitle?: string;
	onPressButton?: () => void;
	selected?: number;
	onPressItem?: (id: number) => void;
}

const translator = (props: IProps) => ({
	listData: props.listData ? props.listData : [],
	title: props.title ? props.title : '',
	buttonTitle: props.buttonTitle ? props.buttonTitle : '',
	selected: props.selected ? props.selected : 1,
	onPressButton: props.onPressButton ? props.onPressButton : () => {},
	onPressItem: props.onPressItem ? props.onPressItem : () => {},
});

export const ListCreator = (props: IProps) => {
	const { title, buttonTitle, listData, onPressButton, selected, onPressItem } =
		translator(props);

	return (
		<>
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>{title}</Text>
				<MainButton label={buttonTitle} onPress={onPressButton} />
			</View>
			{listData.map((item) => {
				return (
					<MainList
						key={Math.random()}
						name={item.name}
						id={item.id}
						selected={selected}
						onPress={() => onPressItem(item?.id)}
					/>
				);
			})}
		</>
	);
};

const styles = StyleSheet.create({
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	sectionTitle: {
		fontSize: 28,
	},
});
