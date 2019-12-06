import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
const { width, height } = Dimensions.get('window');

const {
	Value,
	event,
	block,
	cond,
	eq,
	set,
	Clock,
	startClock,
	stopClock,
	debug,
	timing,
	clockRunning,
	interpolate,
	Extrapolate,
} = Animated;

function runTiming(clock, value, dest) {
	const state = {
		finished: new Value(0),
		position: new Value(0),
		time: new Value(0),
		frameTime: new Value(0),
	};

	const config = {
		duration: 1000,
		toValue: new Value(0),
		easing: Easing.inOut(Easing.ease),
	};

	return block([
		cond(clockRunning(clock), 0, [
			set(state.finished, 0),
			set(state.time, 0),
			set(state.position, value),
			set(state.frameTime, 0),
			set(config.toValue, dest),
			startClock(clock),
		]),
		timing(clock, state, config),
		cond(state.finished, debug('stop clock', stopClock(clock))),
		state.position,
	]);
}
class Login extends Component {
	constructor() {
		super();

		this.buttonOpacity = new Value(1);

		this.onStateChange = event([
			{
				nativeEvent: ({ state }) =>
					block([cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))]),
			},
		]);

		this.buttonY = interpolate(this.buttonOpacity, {
			inputRange: [0, 1],
			outputRange: [100, 0],
			extrapolate: Extrapolate.CLAMP,
		});

		this.bgY = interpolate(this.buttonOpacity, {
			inputRange: [0, 1],
			outputRange: [-height / 3, 0],
			extrapolate: Extrapolate.CLAMP,
		});
	}
	render() {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					justifyContent: 'flex-end',
				}}
			>
				<Animated.View
					style={{
						...StyleSheet.absoluteFill,
						transform: [{ translateY: this.bgY }],
					}}
				>
					<Image source={require('../assets/bg.jpg')} style={{ flex: 1, height: null, width: null }} />
				</Animated.View>
				<View
					style={{
						height: height,
						flex: 1,
						alignItems: 'center',
						padding: 20,
						paddingTop: 80,
					}}
				>
					<Text
						style={{
							fontSize: 100,
							color: 'white',
							fontWeight: 'bold',
							textShadowColor: (0, 0, 0, 1),
							textShadowRadius: 10,
						}}
					>
						TRAIN
					</Text>
				</View>
				<View style={{ height: height / 3, justifyContent: 'center' }}>
					<TapGestureHandler onHandlerStateChange={this.onStateChange}>
						<Animated.View
							style={{
								...styles.button,
								opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }],
                                flexDirection: 'row'
							}}
						>
							<FontAwesomeIcon icon={faCoffee} style={{padding: 10}}/>
							<Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>
                                SIGN IN
                            </Text>
						</Animated.View>
					</TapGestureHandler>
					<Animated.View
						style={{
							...styles.button,
							backgroundColor: '#2E71DC',
							opacity: this.buttonOpacity,
							transform: [{ translateY: this.buttonY }],
						}}
					>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SIGN IN WITH FACEBOOK</Text>
					</Animated.View>
				</View>
			</View>
		);
	}
}
export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: 'white',
		height: 70,
		marginHorizontal: 20,
		borderRadius: 35,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 5,
	},
});
