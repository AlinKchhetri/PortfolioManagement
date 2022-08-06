import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, darkFONTS, icons, SIZES } from '../../constants';

const MyStocks = (props) => {
	return (
		<View>
			<TouchableOpacity style={styles.shareContainer}>
				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<View style={{ flex: 0.5 }}>
						<Image source={icons.stock} style={{ width: 40, height: 40 }} />
					</View>
					<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ ...darkFONTS.h5 }}>{props.symbol}</Text>
						<Text style={{ ...darkFONTS.body4 }}>{props.transactionType}</Text>
					</View>
					<View style={styles.priceDiff}>
						<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
							<View>
								<Text style={{ ...darkFONTS.h5 }}>{props.priceNow}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Image
									source={icons.up}
									style={{ width: 15, height: 15, margin: 5, transform: [ { rotate: '-90deg' } ] }}
								/>
								<Text style={{ ...darkFONTS.body4 }}>{props.profitLossPercentage}</Text>
								<Image
									source={icons.down}
									style={{ width: 15, height: 15, margin: 5, transform: [ { rotate: '-90deg' } ] }}
								/>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.InvestmentSection}>
					<View style={styles.unitSection}>
						<Text style={{ ...darkFONTS.body3 }}>
							<Text style={{ ...darkFONTS.h6 }}> Units : </Text>
							{props.unit}
						</Text>
						<Text style={{ ...darkFONTS.body3 }}>
							<Text style={{ ...darkFONTS.h6 }}> Buy/Sell Price : </Text>
							{props.price}
						</Text>
					</View>
					<View style={[ styles.unitSection, { flexDirection: 'column' } ]}>
						<Text style={{ ...darkFONTS.body3, padding: 5 }}>
							<Text style={{ ...darkFONTS.h6 }}> Investment : </Text>
							{props.investment}
						</Text>
						<Text style={{ ...darkFONTS.body3, padding: 5 }}>
							<Text style={{ ...darkFONTS.h6 }}> Current Value : </Text>
							{props.currentValue}
						</Text>
						<Text style={{ ...darkFONTS.body3, padding: 5 }}>
							<Text style={{ ...darkFONTS.h6 }}> Profit/Loss : </Text>
							{props.profitLoss}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default MyStocks;

const styles = StyleSheet.create({
	shareContainer: {
		width: SIZES.width - 50,
		height: SIZES.height * 190 / SIZES.height,
		backgroundColor: COLORS.darkgray,
		flexDirection: 'column',
		justifyContent: 'space-between',
		// alignItems: 'center',
		margin: SIZES.padding,
		marginTop: SIZES.base,
		padding: SIZES.padding,

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
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: SIZES.padding,
		alignItems: 'center'
	},
	addButton: {
		backgroundColor: COLORS.darkgray,
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25
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
	},
	unitSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: SIZES.base
	}
});
