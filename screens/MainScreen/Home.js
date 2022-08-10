import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import Header from './Header';
import NepseApi from './NepseApi';
import Show from './Show';
import { COLORS, darkFONTS, SIZES } from '../../constants';

const Home = () => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden={false} barStyle="dark-content" backgroundColor= '#F8F9FA'/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View>
					<Header />
					<Show />
					<View style={styles.todayMarket}>
						<Text style={{ ...darkFONTS.h4, padding: SIZES.padding }}>Today's Market</Text>
						<NepseApi />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingBottom: 34,
    paddingTop: 20,
		flex: 1,
		backgroundColor: COLORS.white,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Home;
