import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	ActivityIndicator,
	Pressable,
	TextInput,
	Keyboard
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MyStocks from '../Portfolio/MyStocks';
import { db } from '../../components/Firebase/configexpo';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { Transition, Transitioning } from 'react-native-reanimated';

import { COLORS, lightFONTS, darkFONTS, icons, SIZES } from '../../constants';

// Initialize transition for adding new stock
const transitionMe = (
	<Transition.Together>
		<Transition.In type="fade" durationMs={200} />
		<Transition.Change />
		<Transition.Out type="fade" durationMs={200} />
	</Transition.Together>
);

Keyboard.dismiss();

const CreateItem = () => {
	const [ loaded, setLoaded ] = useState(true);
	const [ data, setData ] = useState([]);
	const [ selectedSymbol, SetSelectedSymbol ] = useState('');
	const [ unit, setUnit ] = useState('');
	const [ amount, setAmount ] = useState('');
	const [ transactionType, setTransactionType ] = useState('');
	const [ amountNow, setAmountNow ] = useState('');
	const [ investment, setInvestment ] = useState('');
	const [ currentValue, setCurrentValue ] = useState('');
	const [ profitLoss, setProfitLoss ] = useState('');
	const [ profitLossPercentage, setProfitLossPercentage ] = useState('');
	const [ date, setDate ] = useState('');
	const [ year, setYear ] = useState('');
	const [ month, setMonth ] = useState('');
	const [ day, setDay ] = useState('');
	const [ showAddStock, setShowAddStock ] = useState(false);

	const [ dataItem, setDataItem ] = useState([]);
	const ref = useRef();

	// Fetching all stored transactions
	const ReadAll = () => {
		getDocs(collection(db, 'Portfolio')).then((docSnap) => {
			let userPortfolio = [];
			docSnap.forEach((doc) => {
				userPortfolio.push({ ...doc.data(), id: Math.floor(Math.random() * Date.now()) });
			});
			setDataItem(userPortfolio);
		});
	};

	useEffect(() => {
		ReadAll();
		Create();
	}, []);

	useEffect(
		() => {
			showSymbol();
			calculate();
			calculateProfitLoss();
		},
		[ { showSymbol, calculate } ]
	);

	// fetching stock symbols for dropdown
	const showSymbol = () => {
		axios
			.get('http://nepstockapi.herokuapp.com/')
			.then((response) => {
				setData(response.data);
				setLoaded(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// Calculation
	const calculate = () => {
		setDate(year + '/' + month + '/' + day);
		setInvestment(Math.floor(unit * amount));
		setCurrentValue(Math.floor(unit * amountNow));
	};

	const calculateProfitLoss = () => {
		setProfitLoss(currentValue - investment);
		setProfitLossPercentage(Math.floor(profitLoss / investment * 100) + '%');
	};

	// Creating new collection if not already created
	const Create = () => {
		const myDoc = collection(db, 'Portfolio');
		getDocs(myDoc)
			.then(() => {
				return;
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	// Adding new transaction
	const Add = () => {
		const addStock = collection(db, 'Portfolio');

		const docData = {
			symbol: selectedSymbol,
			transactionType: transactionType,
			unit: unit,
			price: amount,
			date: date,
			priceNow: amountNow,
			investment: investment,
			currentValue: currentValue,
			profitLoss: profitLoss,
			profitLossPercentage: profitLossPercentage
		};

		addDoc(addStock, docData)
			.then(() => {
				SetSelectedSymbol('');
				setTransactionType('');
				setUnit('');
				setAmount('');
				setAmountNow('');
				setYear('');
				setMonth('');
				setDay('');
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const buysell = [ 'BUY', 'SELL' ];

	return (
		<View style={styles.addStockContainer}>
			<View style={styles.header}>
				<Text style={{ ...darkFONTS.h4, padding: SIZES.padding }}>Add Transaction</Text>
			</View>
			<Transitioning.View ref={ref} transition={transitionMe}>
				<TouchableOpacity
					onPress={() => {
						ref.current.animateNextTransition();
						setShowAddStock(!showAddStock);
						ReadAll();
					}}
					style={styles.addButton}
				>
					<View style={styles.modalHeader}>
						<Text style={{ ...darkFONTS.h5 }}>Add New Stock</Text>

						<Image
							source={icons.add}
							style={{
								width: 30,
								height: 30,
								tintColor: COLORS.black,
								opacity: 0.7
							}}
						/>
					</View>
				</TouchableOpacity>

				{/* if add new transaction is pressed */}
				{showAddStock && (
					<View style={styles.modalStyle}>
						{loaded ? (
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
								<ActivityIndicator size={40} color="#000000" />
							</View>
						) : (
							<View style={styles.dropDown}>
								{/* <SelectList setSelected={setSelected} data={data}/> */}
								<SelectDropdown
									data={data}
									onSelect={(selectedItem, index) => {
										SetSelectedSymbol(selectedItem.Symbol);
									}}
									buttonStyle={styles.dropdown3BtnStyle}
									renderCustomizedButtonChild={(selectedItem, index) => {
										return (
											<View style={styles.dropdown3BtnChildStyle}>
												<Text style={styles.dropdown3BtnTxt}>
													{selectedSymbol ? selectedSymbol : 'Select Symbol'}
												</Text>
												<Image source={icons.dropdown} style={{ height: 15, width: 15 }} />
											</View>
										);
									}}
									dropdownStyle={styles.dropdown3DropdownStyle}
									rowStyle={styles.dropdown3RowStyle}
									renderCustomizedRowChild={(item) => {
										return (
											<View style={styles.dropdown3RowChildStyle}>
												<Text style={styles.dropdown3RowTxt}>{item.Symbol}</Text>
											</View>
										);
									}}
									search
									searchInputStyle={styles.dropdown3searchInputStyleStyle}
									searchPlaceHolder={'Search here'}
									searchPlaceHolderColor={COLORS.black}
								/>
							</View>
						)}
						<View style={styles.addForm}>
							<View style={styles.dropDown}>
								<SelectDropdown
									data={buysell}
									onSelect={(selectedItem, index) => {
										setTransactionType(selectedItem);
									}}
									buttonStyle={styles.dropdown3BtnStyle}
									renderCustomizedButtonChild={(selectedItem, index) => {
										return (
											<View style={styles.dropdown3BtnChildStyle}>
												<Text style={styles.dropdown3BtnTxt}>
													{transactionType ? transactionType : 'BUY/SELL'}
												</Text>
												<Image source={icons.dropdown} style={{ height: 15, width: 15 }} />
											</View>
										);
									}}
									dropdownStyle={styles.dropdown3DropdownStyle}
									rowStyle={styles.dropdown3RowStyle}
									renderCustomizedRowChild={(item) => {
										return (
											<View style={styles.dropdown3RowChildStyle}>
												<Text style={styles.dropdown3RowTxt}>{item}</Text>
											</View>
										);
									}}
								/>
							</View>
							<View>
								<TextInput
									value={unit}
									onChangeText={(unit) => setUnit(unit)}
									placeholder="Total Units"
									placeholderTextColor="#696969"
									keyboardType="number-pad"
									style={styles.inputField}
								/>

								<TextInput
									value={amount}
									onChangeText={(amount) => setAmount(amount)}
									placeholder="Price"
									placeholderTextColor="#696969"
									keyboardType="number-pad"
									style={styles.inputField}
								/>
							</View>
							<View>
								<TextInput
									value={amountNow}
									onChangeText={(amountNow) => {
										setAmountNow(amountNow);
									}}
									placeholder="Current Price"
									placeholderTextColor="#696969"
									keyboardType="number-pad"
									style={styles.inputField}
								/>

								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginHorizontal: SIZES.padding2
									}}
								>
									<TextInput
										value={year}
										onChangeText={(year) => setYear(year)}
										placeholder="YYYY"
										placeholderTextColor="#696969"
										returnKeyType="send"
										keyboardType="number-pad"
										maxLength={4}
										style={styles.inputDateField}
									/>

									<TextInput
										value={month}
										onChangeText={(month) => setMonth(month)}
										placeholder="MM"
										placeholderTextColor="#696969"
										keyboardType="number-pad"
										maxLength={2}
										style={styles.inputDateField}
									/>

									<TextInput
										value={day}
										onChangeText={(day) => {
											setDay(day);
										}}
										placeholder="DD"
										placeholderTextColor="#696969"
										keyboardType="number-pad"
										maxLength={2}
										style={styles.inputDateField}
									/>
								</View>
							</View>
							<Pressable
								onPressIn={() => {
									calculate();
									calculateProfitLoss();
								}}
								onPressOut={() => {
									ReadAll();
									calculate();
								}}
								onPress={() => {
									Add();
									ReadAll();
									setShowAddStock(false);
								}}
								style={({ pressed }) => [
									{
										opacity: pressed ? 0.5 : 0.9
									},
									styles.StockAdd
								]}
							>
								<Text style={styles.StockAddText}>Add New Transaction</Text>
							</Pressable>
						</View>
					</View>
				)}
			</Transitioning.View>

			{/* Mapping the fetched records from the firebase   */}
			<View style={styles.myStock}>
				{dataItem.map((doc) => {
					return (
						<View key={doc.id}>
							<MyStocks
								symbol={doc.symbol}
								transactionType={doc.transactionType}
								priceNow={doc.priceNow}
								profitLossPercentage={doc.profitLossPercentage}
								unit={doc.unit}
								price={doc.price}
								investment={doc.investment}
								currentValue={doc.currentValue}
								profitLoss={doc.profitLoss}
							/>
						</View>
					);
				})}
			</View>
		</View>
	);
};

export default CreateItem;

const styles = StyleSheet.create({
	addStockContainer: {
		flex: 1,
		backgroundColor: COLORS.white,
		marginBottom: 88
	},
	header: {
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		marginHorizontal: SIZES.padding
	},
	modalStyle: {
		flex: 1,
		justifyContent: 'flex-start',
		alignSelf: 'center',
		width: SIZES.width - 50,
		height: SIZES.height * 400 / SIZES.height,
		backgroundColor: COLORS.darkgray,
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
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		flex: 1,
		width: SIZES.width - 50,
		height: SIZES.height * 50 / SIZES.height,
		backgroundColor: COLORS.darkgray,
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
	inputField: {
		...darkFONTS.body4,
		width: SIZES.width - 100,
		height: 40,
		backgroundColor: COLORS.darkgray,
		borderWidth: 1.5,
		borderColor: 'grey',
		borderRadius: SIZES.padding,
		margin: SIZES.padding,
		alignSelf: 'center',
		paddingHorizontal: SIZES.padding,
		color: 'black'
	},
	inputDateField: {
		...darkFONTS.body4,
		alignSelf: 'center',
		width: 75,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.darkgray,
		borderWidth: 1.5,
		borderColor: 'grey',
		borderRadius: SIZES.padding,
		paddingHorizontal: SIZES.base,
		color: 'black'
	},

	dropDown: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: SIZES.base
	},
	dropdown3BtnStyle: {
		width: SIZES.width - 100,
		height: 40,
		backgroundColor: COLORS.darkgray,
		borderWidth: 1.5,
		borderColor: 'grey',
		borderRadius: SIZES.padding
	},
	dropdown3BtnChildStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	dropdown3BtnTxt: {
		...darkFONTS.body3,
		color: '#696969',
		marginHorizontal: SIZES.padding
	},
	dropdown3RowStyle: {
		backgroundColor: '#C1C3C5',
		borderBottomColor: '#C1C3C5',
		borderWidth: 1,
		borderColor: '#696969',
		height: 40
	},
	dropdown3DropdownStyle: {
		backgroundColor: '#C1C3C5',
		borderRadius: SIZES.padding
	},
	dropdown3RowChildStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: SIZES.h5
	},
	dropdown3RowTxt: {
		...darkFONTS.body3,
		marginHorizontal: SIZES.padding2
	},
	dropdown3searchInputStyleStyle: {
		...darkFONTS.h5,
		backgroundColor: '#C1C3C5',
		borderBottomWidth: 1,
		borderBottomColor: COLORS.darkgray
	},
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
		paddingHorizontal: SIZES.base
	},
	StockAdd: {
		width: SIZES.width - 100,
		height: 40,
		borderRadius: SIZES.padding,
		backgroundColor: '#1f1f1f',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		margin: SIZES.padding
	},
	StockAddText: {
		...lightFONTS.body3
	},
	myStock: {
		marginHorizontal: SIZES.padding2
	}
});
