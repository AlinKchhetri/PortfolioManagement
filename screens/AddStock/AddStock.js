import { View, StyleSheet } from 'react-native';
import React, {  } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import CreateItem from './CreateItem';

import { COLORS } from '../../constants';

const AddStock = () => {
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<CreateItem />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingTop: 40,
		marginBottom: 88,
		flex: 1,
		backgroundColor: COLORS.lightGray
	}
});

export default AddStock;
