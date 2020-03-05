import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

class Home extends Component {
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
            <View
                style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'flex-end'
                }}
            >
                We have no friends!
            </View>
        );
    }
}
export default NikeApp;