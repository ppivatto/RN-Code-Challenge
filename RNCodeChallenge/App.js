/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import configureStore, {config} from './src/misc/store';
import { Provider } from 'react-redux';
import CocktailsScreen from './src/containers/cocktails/CocktailsScreen';
import CocktailDetailScreen from './src/containers/cocktails/CocktailDetailScreen';

const MainNavigator = createStackNavigator({
    Home: {
      screen: CocktailsScreen,
    },
    Detail: {screen: CocktailDetailScreen},
},{
    headerLayoutPreset: 'center'
});

let Navigation = createAppContainer(MainNavigator);

const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
  }
}
