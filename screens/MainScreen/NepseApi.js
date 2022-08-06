import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	TextInput,
	Keyboard
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useState, useEffect, memo } from 'react';

import axios from 'axios';

import { COLORS, icons, darkFONTS, SIZES } from '../../constants';

Keyboard.dismiss();

const NepseApi = () => {
	const [ loaded, setLoaded ] = useState(true);
	const [ search, setSearch ] = useState('');
	const [ filteredDataSource, setFilteredDataSource ] = useState([]);
	const [ masterDataSource, setMasterDataSource ] = useState([]);

	useEffect(() => {
		axios
			.get('http://nepstockapi.herokuapp.com/')
			.then((response) => {
				setFilteredDataSource(response.data);
				setMasterDataSource(response.data);
				setLoaded(false);
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			setMasterDataSource([]);
		};
	}, []);

	const searchFilterFunction = (text) => {
		if (text) {
			const newData = masterDataSource.filter(function(item) {
				const itemData = item.Symbol ? item.Symbol.toUpperCase() : ''.toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredDataSource(newData);
			setSearch(text);
		} else {
			setFilteredDataSource(masterDataSource);
			setSearch(text);
		}
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View>
				{loaded ? (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator size={40} color="#000000" />
					</View>
				) : (
					<View>
						<View>
							<View>
								<TextInput
									value={search}
									placeholder="Search Symbol"
									placeholderTextColor="grey"
									onChange={(search) => setSearch(search)}
									onChangeText={(text) => {
										searchFilterFunction(text);
										setSearch(text);
									}}
									style={styles.searchBar}
								/>
							</View>
							<FlatList
								data={filteredDataSource}
								initialNumToRender={10}
								windowSize={5}
								maxToRenderPerBatch={5}
								updateCellsBatchingPeriod={30}
								removeClippedSubviews={false}
								disableVirtualization={false}
								onEndReachedThreshold={0.1}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item }) => {
									return (
										<TouchableOpacity style={styles.shareContainer}>
											<View style={{ flex: 0.5 }}>
												<Image source={icons.stock} style={{ width: 40, height: 40 }} />
											</View>
											<View style={{ flex: 0.9, justifyContent: 'center', padding: SIZES.base }}>
												<Text style={{ ...darkFONTS.h5 }}>{item.Symbol}</Text>
											</View>
											<View style={styles.priceDiff}>
												<Text style={{ ...darkFONTS.h6 }}>{item.Close}</Text>
												<View
													style={{
														flexDirection: 'column',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												>
													<Image source={icons.up} style={{ width: 15, height: 15 }} />
													<Text style={{ ...darkFONTS.body4 }}>{item.Diff}</Text>
													<Image source={icons.down} style={{ width: 15, height: 15 }} />
												</View>
											</View>
										</TouchableOpacity>
									);
								}}
							/>
						</View>
					</View>
				)}
			</View>
		</ScrollView>
	);
};

export default memo(NepseApi);

const styles = StyleSheet.create({
	shareContainer: {
		width: SIZES.width - 50,
		height: SIZES.height * 100 / SIZES.height,
		backgroundColor: COLORS.darkgray,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: SIZES.padding,
		paddingHorizontal: SIZES.padding,
		borderRadius: SIZES.padding,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5
	},

	searchBar: {
		...darkFONTS.h6,
		width: SIZES.width - 50,
		height: 50,
		backgroundColor: COLORS.darkGray,
		borderColor: COLORS.darkgray,
		borderWidth: 2,
		alignItems: 'center',
		margin: SIZES.base,
		paddingHorizontal: SIZES.padding,
		borderRadius: SIZES.padding
	},
	priceDiff: {
		flex: 2,
		alignItems: 'flex-end',
		marginHorizontal: SIZES.base
	}
});
