import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, lightFONTS, icons, SIZES } from '../../constants';

const DashboardCard = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<View style={styles.dashboard}>
					<View style={styles.balanceSection}>
						<View>
							<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ ...lightFONTS.h4, paddingRight: SIZES.padding2 }}>Current Balance</Text>
								<TouchableOpacity
									onPress={props.seeHide}
									style={[ styles.addButton, { padding: SIZES.padding } ]}
								>
									<Image
										source={props.icon}
										style={{
											width: 20,
											height: 20,
											padding: SIZES.padding,
											opacity: 0.6
										}}
									/>
								</TouchableOpacity>
							</View>
							<Text style={{ ...lightFONTS.h2 }}>{props.currentBalance}</Text>
						</View>

						<View style={styles.refreshButton}>
							<TouchableOpacity onPress={props.btn} style={styles.addButton}>
								<Image
									source={icons.refresh}
									style={{
										width: 20,
										height: 20
									}}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.unitSection}>
						<View style={styles.unitAmount}>
							<Text style={{ ...lightFONTS.h6 }}>Total Units</Text>
							<Text style={{ ...lightFONTS.h5 }}>{props.totalUnits}</Text>
						</View>
						<View style={styles.unitAmount}>
							<Text style={{ ...lightFONTS.h6 }}>Total Investment</Text>
							<Text style={{ ...lightFONTS.h5 }}>{props.totalInvestment}</Text>
						</View>
					</View>

					<View style={styles.profitLossSection}>
						<View style={styles.profitAmount}>
							<Text style={{ ...lightFONTS.h5 }}>Profit/Loss</Text>
							<Text style={{ ...lightFONTS.h3 }}>{props.profitLoss}</Text>
						</View>
						<Image
							style={{
								height: 20,
								width: 20
							}}
							source={icons.up}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default DashboardCard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		margin: SIZES.padding
	},

	wrapper: {
		flexDirection: 'column',
		justifyContent: 'center'
	},
	refreshButton: {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},

	dashboard: {
		width: SIZES.width - 50,
		height: SIZES.height * 190 / SIZES.height,
		borderRadius: SIZES.padding,
		backgroundColor: '#3570e8',
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		padding: SIZES.padding
	},
	addButton: {
		backgroundColor: COLORS.darkgray,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		alignSelf: 'flex-start'
	},
	balanceSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		padding: SIZES.padding
	},
	profitLossSection: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: SIZES.base
	},
	profitAmount: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-start',
		paddingHorizontal: SIZES.padding
	},
	unitSection: {
		marginTop: SIZES.base - 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: SIZES.padding
	},
	unitAmount: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
