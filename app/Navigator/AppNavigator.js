import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../SignInComponent';
import Home from '../HomeComponent';
import SignUp from '../SignUpComponent';

//redux
import {connect} from 'react-redux';
import { fetchShoes, fetchShorts, fetchTT  } from '../Redux/ActionCreators';

const Stack = createStackNavigator();

const mapStateToProps = state => {
  return {
      shoes: state.shoes,
      shorts: state.shorts,
      tt: state.tt,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchShoes: () => dispatch(fetchShoes()),
  fetchShorts: () => dispatch(fetchShorts()),
  fetchTT: () => dispatch(fetchTT())
});

class App extends Component {
  
  componentDidMount() {
    this.props.fetchShoes();
    this.props.fetchShorts();
    this.props.fetchTT();
  }
  
  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}
          initialRouteName="Index">
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);