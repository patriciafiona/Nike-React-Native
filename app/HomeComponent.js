import React, { Component } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, ImageBackground, Image, FlatList } from 'react-native';
import { TapGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';

//icon
import { Icon } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { baseUrl } from '../src/baseUrl';

import {Loading} from './LoadingComponent';
import { fetchShoes, fetchShorts, fetchTT } from '../app/Redux/ActionCreators';

const { width, height } = Dimensions.get('window');

const mapStateToProps = state => {
  return {
      shoes: state.shoes,
      shorts: state.shorts,
      tt: state.tt,
  }
}

const mapDispatchToProps = dispatch => ({
  //refresh page
  fetchShoes: () => dispatch(fetchShoes()),
  fetchShorts: () => dispatch(fetchShorts()),
  fetchTT: () => dispatch(fetchTT())
})

class Home extends Component {
  constructor(props){
      super(props);
  }

    render() {

      const renderMenuItem = ({ item, index }) => {
        return (
          <TouchableOpacity style={styles.product_btn}>
            <Image source={{ uri: baseUrl+ 'images/' + item.filename}} style={styles.product_disp}/>
            <Text style={styles.product_t16}>{item.name}</Text>
            <Text style={styles.product_t14}>
              Rp. {item.price}
            </Text>
          </TouchableOpacity>
        );
      };

      if(this.props.isLoading){
        return(
            <Loading/>
        );
      }else if(this.props.errMess){
          return(
              <View>
                  <Text>{this.props.errMess}</Text>
              </View>
          );
      }else{
        return (
          <SafeAreaView 
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'flex-end',
              paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}
          >
            <ScrollView>
              <ImageBackground source={require('../src/img/Homes/h2.jpg')} style={styles.bg_img}>
                <View style={styles.navbar}>
                  <Image source={require('../src/img/NikeLogo.png')} style={styles.logo}/>
                </View>
                <View style={styles.bannerContent}>
                  <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>Never Give Up</Text>
                  <Text style={{ fontSize: 20, color: 'white' }}>We're Always Be Your Side</Text>
                </View>
              </ImageBackground>

              {/* Bagian Product Display */}
              <View style={styles.home_container}>
                <Text style={styles.product_title}>New Shoes</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.product_container}>
                  <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={this.props.shoes.shoes}
                      renderItem={renderMenuItem}
                      keyExtractor={item => item.id.toString()}
                  />

                  <TouchableOpacity style={styles.seeAllBtn}>
                    <Text style={{fontSize:20, color: 'gray'}}>See All</Text>
                  </TouchableOpacity>
                </ScrollView>

                <Text style={styles.product_title}>New Shorts</Text>
                <ScrollView horizontal={true} style={styles.product_container}>
                  <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={this.props.shorts.shorts}
                      renderItem={renderMenuItem}
                      keyExtractor={item => item.id.toString()}
                  />

                  <TouchableOpacity style={styles.seeAllBtn}>
                    <Text style={{fontSize:20, color: 'gray'}}>See All</Text>
                  </TouchableOpacity>
                </ScrollView>

                <Text style={styles.product_title}>New Sport Bra</Text>

                <ScrollView horizontal={true} style={styles.product_container}>
                  <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={this.props.tt.tt}
                      renderItem={renderMenuItem}
                      keyExtractor={item => item.id.toString()}
                  />

                  <TouchableOpacity style={styles.seeAllBtn}>
                    <Text style={{fontSize:20, color: 'gray'}}>See All</Text>
                  </TouchableOpacity>
                </ScrollView>

              </View>
            </ScrollView>
          </SafeAreaView>
        );
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bg_img:{
    height: height-550,
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
  home_container:{
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom:80,
  },

  //Bagian Product Display
  product_container:{
    height:210,
    width: width-40,
    margin:10,
  },
  product_btn:{
    marginHorizontal:10,
    height:200,
    width: 150,
  },
  product_title:{
    marginHorizontal:30,
    marginTop:20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  product_disp:{
    width:150,
    height:150,
    borderRadius:30,
  },
  product_t16:{
    width:200,
    fontWeight: 'bold',
    fontSize:16,
    marginHorizontal:10,
    marginTop:10,
  },
  product_t14:{
    fontSize:14,
    marginHorizontal:10,
  },
  seeAllBtn:{
    width:150,
    height:150,
    borderRadius:30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ededed',
  },
});