/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {connect} from 'react-redux';
import {logout} from '../redux/action/authAction';

class DrawerContentScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.root}>
        <DrawerContentScrollView {...this.props}>
          <View style={styles.drawerContent}>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                label="COMPETITIONS"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() => {
                  navigation.navigate('Listing');
                }}
              />
              <DrawerItem
                label="ENTRY LIST"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() => {
                  this.props.navigation.navigate('EntryList');
                }}
              />
              <DrawerItem
                label="DRAWS"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() => {
                  navigation.navigate('Draw');
                }}
              />
              <DrawerItem
                label="WINNER GALLERY"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() => {
                  this.props.navigation.navigate('WinnerGallery');
                }}
              />
              <DrawerItem
                label="ABOUT"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'Content',
                    params: {
                      params: {
                        cms_id: 2,
                      },
                    },
                  })
                }
              />
              <DrawerItem
                label="CONTACT"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() => {
                  this.props.navigation.navigate('Contact');
                }}
              />
              <DrawerItem
                label="FAQS"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'Content',
                    params: {
                      params: {
                        cms_id: 10,
                      },
                    },
                  })
                }
              />
              <DrawerItem
                label="HOW TO PLAY"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'Content',
                    params: {
                      params: {
                        cms_id: 5,
                      },
                    },
                  })
                }
              />
              <DrawerItem
                label="TERMS & CONDITIONS"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'Content',
                    params: {
                      params: {
                        cms_id: 11,
                      },
                    },
                  })
                }
              />
              <DrawerItem
                label="PRIVACY POLICY"
                labelStyle={{color: '#D3C499', fontSize: 18}}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'Content',
                    params: {
                      params: {
                        cms_id: 12,
                      },
                    },
                  })
                }
              />
              {this.props.auth.authenticate ? (
                <Fragment>
                  <DrawerItem
                    label="MY ACCOUNT"
                    labelStyle={{color: '#D3C499', fontSize: 18}}
                    onPress={() => {
                      navigation.navigate('MyAccount');
                    }}
                  />
                  <DrawerItem
                    label="CHANGE PASSWORD"
                    labelStyle={{color: '#D3C499', fontSize: 18}}
                    onPress={() => {
                      navigation.navigate('ChangePassword');
                    }}
                  />
                  <DrawerItem
                    label="MY ORDER"
                    labelStyle={{color: '#D3C499', fontSize: 18}}
                    onPress={() => navigation.navigate('MyOrder')}
                  />
                  <DrawerItem
                    label="LOGOUT"
                    labelStyle={{color: '#D3C499', fontSize: 18}}
                    onPress={() => this.props.logout()}
                  />
                </Fragment>
              ) : (
                <DrawerItem
                  label="LOGIN or SIGNUP"
                  labelStyle={{color: '#D3C499', fontSize: 18}}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                />
              )}
              <DrawerItem
                label="Version 0.0.0"
                labelStyle={{color: '#D3C499', fontSize: 14}}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContentScreen);
