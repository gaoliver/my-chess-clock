import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SectionTitle } from './SectionTitle';
import { MainButton } from './MainButton';
import { MainList } from './MainList';

interface IProps {
	listData?: Array<any>;
	title?: string;
	buttonTitle?: string;
	itemName?: string;
	selected?: number;
	onPressButton?: () => void;
	onPressItem?: (id: number) => void;
}

const translator = (props: IProps) => ({
	listData: props.listData ? props.listData : [],
	title: props.title ? props.title : '',
	buttonTitle: props.buttonTitle ? props.buttonTitle : '',
	itemName: props.itemName ? props.itemName : undefined,
	selected: props.selected ? props.selected : undefined,
	onPressButton: props.onPressButton ? props.onPressButton : () => {},
	onPressItem: props.onPressItem ? props.onPressItem : () => {},
});

export const ListCreator = (props: IProps) => {
	const {
		title,
		buttonTitle,
		listData,
		onPressButton,
		selected,
		onPressItem,
		itemName,
	} = translator(props);

	return (
		<>
			<View style={styles.sectionHeader}>
				<SectionTitle text={title} />
				<MainButton label={buttonTitle} onPress={onPressButton} />
			</View>
			{listData.map((item, index) => {
				return (
					<MainList
						key={Math.random() * 135}
						name={itemName ? `${itemName} ${index + 1}` : item.name}
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
});
