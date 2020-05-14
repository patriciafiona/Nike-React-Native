import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import AppNavigator from './app/Navigator/AppNavigator';

import  { Provider } from 'react-redux';
import  { ConfigureStore} from './app/Redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './app/LoadingComponent';

const {persistor, store} = ConfigureStore();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./src/img/bg1.jpg')]);

    await Promise.all([...imageAssets]);
  }

  render() {

    //Hide Yellow Warning
    console.disableYellowBox = true;
    
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});