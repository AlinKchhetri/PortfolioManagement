import React, { useState, useCallback } from 'react';
import {
	Image,
	Switch,
	ImageBackground,
	Pressable,
	RefreshControl,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS, icons, SIZES, images, darkFONTS } from '../constants';

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const UI = (props) => {
	return (
		<TouchableOpacity style={styles.infoCard}>
			<View style={styles.iconCard}>
				<Image source={props.icon} style={{ width: 20, height: 20 }} />
			</View>
			<View style={styles.textCard}>
				<Text style={{ ...darkFONTS.h6 }}>{props.title}</Text>
				<Text style={{ ...darkFONTS.body5 }}>{props.titleInfo}</Text>
			</View>
			<View style={styles.gotoCard}>
				<Image source={props.goto} style={{ width: 15, height: 15 }} />
			</View>
		</TouchableOpacity>
	);
};

const Profile = () => {
	const [ refreshing, setRefreshing ] = useState(false);
	const [ isEnabled, setIsEnabled ] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => setRefreshing(false));
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden={false} barStyle="dark-content" backgroundColor="#F8F9FA" />
			<ScrollView
				// bounces = {false}
				contentContainerStyle={styles.scrollView}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<View style={styles.avatarSection}>
					<Text style={{ ...darkFONTS.h4, alignSelf: 'center' }}>My Profile</Text>
					<ImageBackground source={images.avatar} style={styles.avatar}>
						<View style={styles.editIcon}>
							<Image source={icons.edit} style={{ width: 13, height: 13, opacity: 0.7 }} />
						</View>
					</ImageBackground>
					<Text style={{ ...darkFONTS.h4, marginHorizontal: SIZES.base, padding: 4 }}>Alin Khatri</Text>
					{/* <Text style={{...darkFONTS.body4}}>9800000000</Text>
           <Text style={{...darkFONTS.body4}}>alinkhatri@gmail.com</Text> */}
					<TouchableOpacity style={styles.editProfileButton}>
						<Text style={{ ...darkFONTS.body4, color: COLORS.blue, paddingHorizontal: 5 }}>
							Edit Profile
						</Text>
					</TouchableOpacity>
					<View>
						<View style={styles.infoSection}>
							<UI
								icon={icons.profile}
								title="My Account"
								titleInfo="Make changes to your account"
								goto={icons.goto}
							/>
							<UI
								icon={icons.profile}
								title="Saved Beneficiary"
								titleInfo="Manage your saved accounts"
								goto={icons.goto}
							/>
							<Pressable style={styles.infoCard}>
								<View style={styles.iconCard}>
									<Image source={icons.lock} style={{ width: 20, height: 20 }} />
								</View>
								<View style={styles.textCard}>
									<Text style={{ ...darkFONTS.h6 }}>Face ID/Touch ID</Text>
									<Text style={{ ...darkFONTS.body5 }}>Manage your account security</Text>
								</View>
								<View style={styles.gotoCard}>
									<Switch
										trackColor={{ false: '#767577', true: '#007AFF' }}
										ios_backgroundColor="#3e3e3e"
										onValueChange={toggleSwitch}
										value={isEnabled}
									/>
								</View>
							</Pressable>
							<UI
								icon={icons.secure}
								title="Two-Factor Authentication"
								titleInfo="Further secure your account for safety"
								goto={icons.goto}
							/>
							<UI
								icon={icons.logout}
								title="Log out"
								titleInfo="Log out of yor account"
								goto={icons.goto}
							>
								<Switch />
							</UI>
						</View>
					</View>
					<View style={[ styles.infoSection, { height: 130 } ]}>
						<UI icon={icons.support} title="Help & Support" goto={icons.goto} />
						<UI icon={icons.lock} title="About App" goto={icons.goto} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		marginBottom: 88
	},
	avatarSection: {
		flex: 1,
		justifyContent: 'flex-start',
		margin: SIZES.padding2,
		alignItems: 'center'
	},
	avatar: {
		width: 80,
		height: 80,
		marginTop: SIZES.padding
	},
	editIcon: {
		width: 25,
		height: 25,
		top: 50,
		left: 58,
		backgroundColor: COLORS.gray,
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	infoSection: {
		width: SIZES.width - 50,
		height: SIZES.height * 390 / SIZES.height,
		justifyContent: 'space-evenly',
		backgroundColor: COLORS.darkgray,
		flexDirection: 'column',
		margin: SIZES.padding,
		padding: 8,
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
	infoCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: SIZES.padding
	},
	iconCard: {
		flex: 0.4,
		width: 40,
		height: 40,
		backgroundColor: COLORS.white,
		opacity: 0.8,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: SIZES.padding
	},
	textCard: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'flex-start',
		alignSelf: 'center',
		marginHorizontal: SIZES.padding
	},
	gotoCard: {
		flex: 0.5,
		alignItems: 'flex-end',
		justifyContent: 'center'
	}
});

export default Profile;
