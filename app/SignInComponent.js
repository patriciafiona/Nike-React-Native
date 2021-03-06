import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Svg,{Image,Circle,ClipPath} from 'react-native-svg';
import { NavigationEvents } from 'react-navigation';

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
class Index extends Component {
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
    const navigation = this.props.navigation;
    return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'flex-end'
          }}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: this.bgY }]
            }}
          >
            <Svg height={height+50} width={width}>
              <ClipPath id="clip">
                <Circle r = {height+50} cx={width/2}/>
              </ClipPath>
              <Image
                href={require('../src/img/bg1.jpg')}
                width={width}
                height={height+50}
                preserveAspectRatio='xMidYMid slice'
                clipPath="url(#clip)"
              />
            </Svg>
          </Animated.View>
          <View style={{ height: height / 1.5, justifyContent: 'center' }}>
            <Animated.Image
              source={require('../src/img/NikeLogo_White.png')}
              style={{
                ...styles.img_logo,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
            </Animated.Image>
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View
                style={{
                  ...styles.button,
                  opacity: this.buttonOpacity,
                  transform: [{ translateY: this.buttonY }]
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
              </Animated.View>
            </TapGestureHandler>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: '#2E71DC',
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                SIGN IN WITH FACEBOOK
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: 'none',
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                  Don't Have an Account? Sign Up
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View 
              style={{
                zIndex:this.textInputZindex, 
                opacity:this.textInputOpacity,
                transform:[{translateY:this.textInputY}],
                height:height/3,
                ...StyleSheet.absoluteFill, 
                top:null, 
                justifyContent:'center'
              }}
            >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text style={{fontSize:15, transform:[{rotate:concat(this.rotateCross,'deg')}]}}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                placeholderTextColor="black"
              />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                placeholderTextColor="black"
              />
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={{fontSize:20, fontWeight: 'bold'}}>SIGN IN</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
    );
  }
}
export default Index;

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
  img_logo:{
    width:width,
    height: (height/2) - 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:150,
  },
});