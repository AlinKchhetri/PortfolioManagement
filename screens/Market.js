import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS, darkFONTS, SIZES } from '../constants';
import NepseApi from './MainScreen/NepseApi';

const Market = () => {
	return (
		<SafeAreaView style={styles.marketContainer}>
			<StatusBar hidden={false} barStyle="dark-content" backgroundColor= '#F8F9FA'/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={{ ...darkFONTS.h3, padding: SIZES.padding, alignSelf: 'flex-start' }}>Today's Market</Text>
				<NepseApi />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Market;

const styles = StyleSheet.create({
	marketContainer: {
		paddingTop: 40,
		paddingHorizontal: 16,
		paddingBottom: 34,
		flex: 1,
		backgroundColor: COLORS.lightGray,
		alignItems: 'center'
	}
});
