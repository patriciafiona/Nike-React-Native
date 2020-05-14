import React, { Component } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import { View, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { TapGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Svg,{Image,Circle,ClipPath} from 'react-native-svg';

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
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class SignUp extends Component {
    constructor() {
      super();
  
      this.buttonOpacity = new Value(1);
  
      this.onStateChange = event([
        {
          nativeEvent: ({ state }) =>
            block([
              cond(
                eq(state, State.END),
                set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
              )
            ])
        }
      ]);
  
      this.onCloseState = event([
        {
          nativeEvent: ({ state }) =>
            block([
              cond(
                eq(state, State.END),
                set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
              )
            ])
        }
      ]);
  
      this.buttonY = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [100, 0],
        extrapolate: Extrapolate.CLAMP
      });
  
      this.bgY = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [-height / 3 -50, 0],
        extrapolate: Extrapolate.CLAMP
      });
  
      this.textInputZindex = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, -1],
        extrapolate: Extrapolate.CLAMP
      });
  
      this.textInputY = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [0, 100],
        extrapolate: Extrapolate.CLAMP
      });
  
      this.textInputOpacity = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
      });
  
      this.rotateCross = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [180, 360],
        extrapolate: Extrapolate.CLAMP
      });

    }
    render() {
        return (
          <SafeAreaView 
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'flex-end'
            }}
          >
            <ScrollView>
              <Text>We have no friends!</Text>
            </ScrollView>
          </SafeAreaView>
        );
    }
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 1
  },
  closeButton:{
    height:40,
    width:40,
    backgroundColor: 'white',
    borderRadius:20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    elevation: 1
  },
  textInput:{
    height:50,
    borderRadius:25,
    borderWidth:0.5,
    marginHorizontal:20,
    paddingLeft:10,
    marginVertical:5,
    borderColor: 'rgba(0,0,0,0.2)'
  },
});