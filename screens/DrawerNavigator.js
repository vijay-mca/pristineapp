/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image, View, Button, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './LonginScreen';
import DrawerContentScreen from './DrawContentScreen';
import RegisterScreen from './RegisterScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import SplashScreen from './SplashScreen';
import ListingScreen from './ListingScreen';
import ContentScreen from './ContentScreen';
import ViewListingScreen from './ViewListingScreen';
import CartIcon from './components/CartIcon';
import MyCartScreen from './MyCartScreen';
import MyAccountScreen from './MyAccountScreen';
import CheckoutScreen from './CheckoutScreen';
import CashflowScreen from './CashflowScreen';
import WinnerGalleryScreen from './WinnerGalleryScreen';
import ContactScreen from './ContactScreen';
import ConfirmOrderScreen from './ConfirmOrderScreen';
import MyOrderScreen from './MyOrderScreen';
import MyOrderDetailScreen from './MyOrderDetailScreen';
import EntryListScreen from './EntryListScreen';
import DrawScreen from './DrawScreen';

const Drawer = createDrawerNavigator();
const LoginStack = createStackNavigator();
const SplashStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const ChangePasswordStack = createStackNavigator();
const ContentStack = createStackNavigator();
const EntryListStack = createStackNavigator();
const DrawStack = createStackNavigator();
const WinnerGalleryStack = createStackNavigator();
const ContactStack = createStackNavigator();
const ListingStack = createStackNavigator();
const ViewListingStack = createStackNavigator();
const MyCartStack = createStackNavigator();
const MyAccountStack = createStackNavigator();
const CheckoutStack = createStackNavigator();
const CashflowStack = createStackNavigator();
const ConfirmOrderStack = createStackNavigator();
const MyOrderStack = createStackNavigator();
const MyOrderDetailStack = createStackNavigator();

class SplashStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SplashStack.Navigator headerMode="none">
        <SplashStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            cardStyle: {
              backgroundColor: 'black',
            },
          }}
        />
      </SplashStack.Navigator>
    );
  }
}

class LoginStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LoginStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <LoginStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,

            cardStyle: {
              backgroundColor: '#EDEDED',
            },

            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </LoginStack.Navigator>
    );
  }
}

class RegisterStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RegisterStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <RegisterStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </RegisterStack.Navigator>
    );
  }
}

class ChangePasswordStackScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <ChangePasswordStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <ChangePasswordStack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,

            cardStyle: {
              backgroundColor: '#EDEDED',
            },

            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </ChangePasswordStack.Navigator>
    );
  }
}
class MyAccountStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MyAccountStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <MyAccountStack.Screen
          name="MyAccount"
          component={MyAccountScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,

            cardStyle: {
              backgroundColor: '#EDEDED',
            },

            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </MyAccountStack.Navigator>
    );
  }
}

class ContentStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ContentStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <ContentStack.Screen
          name="Content"
          component={ContentScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),

            headerRight: () => <CartIcon navigation={this.props.navigation} />,

            cardStyle: {
              backgroundColor: '#EDEDED',
            },

            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </ContentStack.Navigator>
    );
  }
}

class EntryListStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <EntryListStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <EntryListStack.Screen
          name="EntryList"
          component={EntryListScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,

            cardStyle: {
              backgroundColor: '#EDEDED',
            },

            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </EntryListStack.Navigator>
    );
  }
}

class DrawStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <DrawStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <DrawStack.Screen
          name="EntryList"
          component={DrawScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,

            cardStyle: {
              backgroundColor: '#EDEDED',
            },

            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </DrawStack.Navigator>
    );
  }
}

class WinnerGalleryStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <WinnerGalleryStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <WinnerGalleryStack.Screen
          name="WinnerGallery"
          component={WinnerGalleryScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </WinnerGalleryStack.Navigator>
    );
  }
}

class ContactStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ContactStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <ContactStack.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),

            headerRight: () => <CartIcon navigation={this.props.navigation} />,

            cardStyle: {
              backgroundColor: '#EDEDED',
            },

            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </ContactStack.Navigator>
    );
  }
}

class ListingStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ListingStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <ListingStack.Screen
          name="Listing"
          component={ListingScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </ListingStack.Navigator>
    );
  }
}

class ViewListingStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ViewListingStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <ViewListingStack.Screen
          name="ViewListing"
          component={ViewListingScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </ViewListingStack.Navigator>
    );
  }
}

class MyCartStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MyCartStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <MyCartStack.Screen
          name="MyCart"
          component={MyCartScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </MyCartStack.Navigator>
    );
  }
}

class CheckoutStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <CheckoutStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <CheckoutStack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </CheckoutStack.Navigator>
    );
  }
}

class CashflowStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <CashflowStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <CashflowStack.Screen
          name="Cashflow"
          component={CashflowScreen}
          options={{
            headerLeft: () => (
              <Button
                title="Cancel"
                color="red"
                onPress={() => {
                  Alert.alert('Confirmation', 'You want cancel the payment', [
                    {text: 'Cancel'},
                    {
                      text: 'Yes',
                      onPress: () => {
                        this.props.navigation.navigate('MyCart');
                      },
                    },
                  ]);
                }}
              />
            ),
          }}
        />
      </CashflowStack.Navigator>
    );
  }
}

class ConfirmOrderStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ConfirmOrderStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <ConfirmOrderStack.Screen
          name="ConfirmOrder"
          component={ConfirmOrderScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </ConfirmOrderStack.Navigator>
    );
  }
}

class MyOrderStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MyOrderStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <MyOrderStack.Screen
          name="MyOrder"
          component={MyOrderScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </MyOrderStack.Navigator>
    );
  }
}

class MyOrderDetailStackScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
  }
  componentWillUnmount() {
    this.isMounted = false;
  }
  render() {
    return (
      <MyOrderDetailStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <MyOrderDetailStack.Screen
          name="MyOrderDetail"
          component={MyOrderDetailScreen}
          options={{
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="black"
                color="#D3C499"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => <CartIcon navigation={this.props.navigation} />,
            cardStyle: {
              backgroundColor: '#EDEDED',
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                  }}
                  source={require('./img/logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleStyle: {alignSelf: 'center'},
          }}
        />
      </MyOrderDetailStack.Navigator>
    );
  }
}

class RootDrawerNavigator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContentScreen {...props} />}
          drawerStyle={{backgroundColor: 'black'}}
          initialRouteName="Spalsh">
          <Drawer.Screen name="Splash" component={SplashStackScreen} />
          <Drawer.Screen name="Listing" component={ListingStackScreen} />
          <Drawer.Screen
            name="ViewListing"
            component={ViewListingStackScreen}
          />
          <Drawer.Screen name="Content" component={ContentStackScreen} />
          <Drawer.Screen name="EntryList" component={EntryListStackScreen} />
          <Drawer.Screen name="Draw" component={DrawStackScreen} />
          <Drawer.Screen
            name="WinnerGallery"
            component={WinnerGalleryStackScreen}
          />
          <Drawer.Screen name="Contact" component={ContactStackScreen} />
          <Drawer.Screen name="Login" component={LoginStackScreen} />
          <Drawer.Screen name="Register" component={RegisterStackScreen} />
          <Drawer.Screen
            name="ChangePassword"
            component={ChangePasswordStackScreen}
          />
          <Drawer.Screen name="MyAccount" component={MyAccountStackScreen} />
          <Drawer.Screen name="MyCart" component={MyCartStackScreen} />
          <Drawer.Screen name="Checkout" component={CheckoutStackScreen} />
          <Drawer.Screen name="Cashflow" component={CashflowStackScreen} />
          <Drawer.Screen
            name="ConfirmOrder"
            component={ConfirmOrderStackScreen}
          />
          <Drawer.Screen name="MyOrder" component={MyOrderStackScreen} />
          <Drawer.Screen
            name="MyOrderDetail"
            component={MyOrderDetailStackScreen}
          />
        </Drawer.Navigator>
      </React.Fragment>
    );
  }
}

export default RootDrawerNavigator;
