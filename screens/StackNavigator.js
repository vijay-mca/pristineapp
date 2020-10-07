import React, {Component, Fragment} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import LonginScreen from './LonginScreen';
import RegisterScreen from './RegisterScreen';
import ListingScreen from './ListingScreen';

const Stack = createStackNavigator();

//D3C499
class StackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Home"
          component={SplashScreen}
          options={{
            cardStyle: {
              backgroundColor: 'black',
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={LonginScreen}
          options={{
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
          }}
        />
        <Stack.Screen
          name="Listing"
          component={ListingScreen}
          options={{
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default StackNavigator;
