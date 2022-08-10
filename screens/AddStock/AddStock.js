import { StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import React, {  } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import CreateItem from './CreateItem';

import { COLORS } from '../../constants';

const AddStock = () => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden={false} barStyle="dark-content" backgroundColor= '#F8F9FA'/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<CreateItem />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		// paddingTop: 40,
		marginBottom: 88,
		flex: 1,
		backgroundColor: COLORS.lightGray
	}
});

export default AddStock;
