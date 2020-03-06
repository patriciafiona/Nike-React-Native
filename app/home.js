import React, { Component } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import { View, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, ScrollView, ImageBackground, Image } from 'react-native';
import { TapGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';

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
          <SafeAreaView 
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'flex-end'
            }}
          >
            <ScrollView>
              <ImageBackground source={require('../src/img/Homes/h2.jpg')} style={styles.bg_img}>
                <View style={styles.navbar}>
                  <Image source={require('../src/img/NikeLogo.png')} style={styles.logo}/>
                </View>
                <View style={styles.bannerContent}>
                  <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>Never Give Up</Text>
                  <Text style={{ fontSize: 20, color: 'white' }}>Never Give Up</Text>
                </View>
              </ImageBackground>

              <View style={styles.home_container}>
                <Text style={styles.product_title}>New Shoes</Text>
                <View style={styles.home_menu}>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Mens/Shoes/Kyrie_Low_2/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Kyrie Low 2</Text>
                      <Text style={styles.product_t14}>Rp.1.500.000</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Mens/Shoes/LeBron_17/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>LeBron 17</Text>
                      <Text style={styles.product_t14}>Rp.1.250.000</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.home_menu}>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Mens/Shoes/Nike_Air_VaporMax_360/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike Air VaporMax 360</Text>
                      <Text style={styles.product_t14}>Rp.1.125.000</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Mens/Shoes/Nike_React_Infinity_Run_Flyknit/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike React Infinity Run Flyknit</Text>
                      <Text style={styles.product_t14}>Rp.1.890.000</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.product_title}>New Shorts</Text>
                <View style={styles.home_menu}>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Mens/Shorts/Nike_Challenger/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike Challenger</Text>
                      <Text style={styles.product_t14}>Rp.350.000</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Mens/Shorts/Nike_Dri-FIT/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike Dri-FIT</Text>
                      <Text style={styles.product_t14}>Rp.250.000</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.home_menu}>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Mens/Shorts/Nike_Flex_Stride/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike Flex Stride</Text>
                      <Text style={styles.product_t14}>Rp.780.000</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Mens/Shorts/Nike_x_Pigalle/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike_x_Pigalle</Text>
                      <Text style={styles.product_t14}>Rp.490.000</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.product_title}>New Sport Bra</Text>
                <View style={styles.home_menu}>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Womens/SportBra/Nike_Air_Swoosh/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike Air Swoosh</Text>
                      <Text style={styles.product_t14}>Rp.750.000</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Womens/SportBra/Nike_Indy/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike Indy</Text>
                      <Text style={styles.product_t14}>Rp.1.350.000</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.home_menu}>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Womens/SportBra/Nike_Swoosh/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike Swoosh</Text>
                      <Text style={styles.product_t14}>Rp.950.000</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.home_menu_col}>
                    <TouchableOpacity>
                      <Image source={require('../src/img/Womens/SportBra/Nike_Swoosh_Ultra_Breathe/s1.jpg')} style={styles.product_disp}/>
                      <Text style={styles.product_t20}>Nike Swoosh Ultra Breathe</Text>
                      <Text style={styles.product_t14}>Rp.1.200.000</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bg_img:{
    height: 400,
    width: width,
    justifyContent: 'flex-start',
  },
  navbar:{
    width: width,
    height: 40,
    marginTop:20,
  },
  logo:{
    width: 50,
    height:40,
    margin:20,
  },
  bannerContent:{
    width: width,
    height: 180,
    marginTop:200,
    padding:20,
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
  home_container:{
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom:100,
  },
  home_menu:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  home_menu_col:{
    width: 200,
    height: 270,
    margin:10
  },
  product_title:{
    marginHorizontal:30,
    marginTop:20,
    fontSize: 30,
  },
  product_disp:{
    width:200,
    height:200,
    borderRadius:30,
  },
  product_t20:{
    fontWeight: 'bold',
    fontSize:20,
    marginHorizontal:10,
    marginTop:10,
  },
  product_t14:{
    fontSize:14,
    marginHorizontal:10,
  }
});