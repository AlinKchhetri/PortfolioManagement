import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import MyPortfolio from './MyPortfolio';

import { COLORS, darkFONTS, SIZES } from '../../constants';

const Portfolio = () => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden={false} barStyle="dark-content" backgroundColor="#F8F9FA" />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={{ ...darkFONTS.h4, paddingHorizontal: SIZES.padding }}>My Portfolio</Text>
				<MyPortfolio />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingHorizontal: 16,
		marginBottom: 88,
		flex: 1,
		backgroundColor: COLORS.lightGray,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	}
});

export default Portfolio;
