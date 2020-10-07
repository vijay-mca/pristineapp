import React, {Component, Fragment} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Countdown from 'react-native-countdown-component';
import {connect} from 'react-redux';
import {competitionList} from '../redux/action/compAction';
import {currency} from '../config/const';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class ListingScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.competitionList();
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.props.comp.listing.length !== prevProp.comp.listing.length) {
      this.props.competitionList();
    }
  }
  render() {
    const {loading, listing} = this.props.comp;
    if (loading) {
      return (
        <Fragment>
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              },
            ]}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, marginTop: '5%'}}>
            {listing.length > 0 ? (
              listing.map((list, key) => {
                const now = moment();
                const expirydate = moment(list.end_date);

                var diffr = moment.duration(expirydate.diff(now));
                var hours = parseInt(diffr.asHours());
                var minutes = parseInt(diffr.minutes());
                var seconds = parseInt(diffr.seconds());

                let until = 0;

                if (diffr > 0) {
                  until = hours * 60 * 60 + minutes * 60 + seconds;
                } else {
                  until = 0;
                }

                return (
                  <Fragment key={key}>
                    <TouchableOpacity
                      onPress={() => {
                        if (until !== 0) {
                          this.props.navigation.navigate('ViewListing', {
                            screen: 'ViewListing',
                            params: {
                              params: {
                                comp_id: list.pro_id,
                              },
                            },
                          });
                        } else {
                          Alert.alert(
                            'Status',
                            'Competition expired or Sold out',
                            [{text: 'Ok'}],
                            {
                              cancelable: true,
                            },
                          );
                        }
                      }}>
                      <View
                        style={{
                          width: '95%',
                          borderWidth: 2,
                          borderColor: 'black',
                          marginLeft: '2.5%',
                          marginRight: '2.5%',
                          marginBottom: 20,
                        }}>
                        <View style={styles.row}>
                          <Text style={{fontWeight: 'bold'}}>
                            {list.pro_title}
                          </Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{width: '30%'}}>
                            <View style={{padding: 10}}>
                              <Image
                                source={{
                                  uri: list.image,
                                  cache: 'force-cache'
                                }}
                                resizeMode="contain"
                                style={{
                                  width: '100%',
                                  height: 50,
                                  borderWidth: 1,
                                  borderColor: 'black',
                                }}
                              />
                            </View>
                          </View>
                          <View
                            style={{width: '70%', justifyContent: 'center'}}>
                            {until === 0 ? (
                              <Text
                                style={{
                                  textTransform: 'uppercase',
                                  fontWeight: 'bold',
                                  color: '#CC0000',
                                }}>
                                Sold out
                              </Text>
                            ) : (
                              <Countdown
                                until={until}
                                size={20}
                                digitStyle={{
                                  backgroundColor: '#D3C499',
                                  borderColor: 'black',
                                  borderWidth: 1,
                                }}
                                digitTxtStyle={{color: 'white'}}
                                timeLabelStyle={{
                                  color: 'black',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                }}
                                timeLabels={{
                                  d: 'DAYS',
                                  h: 'HOURS',
                                  m: 'MINS',
                                  s: 'SECS',
                                }}
                              />
                            )}
                          </View>
                        </View>
                        <View style={styles.row}>
                          <Text style={{textTransform: 'uppercase'}}>
                            Cost per entry {currency}
                            {list.price}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            padding: 5,
                          }}>
                          <View style={{width: '40%'}}>
                            <Text style={{fontWeight: 'bold'}}>
                              <FontAwesome name="ticket" /> {list.remaining}{' '}
                              Remaining
                            </Text>
                          </View>
                          <View style={{width: '40%'}}>
                            <Text style={{fontWeight: 'bold'}}>
                              <FontAwesome name="user" /> Max {list.max_entry}{' '}
                              Entries
                            </Text>
                          </View>
                          <View style={{width: '20%', alignItems: 'flex-end'}}>
                            <Text
                              style={{marginRight: '10%', fontWeight: 'bold'}}>
                              <FontAwesome name="arrow-right" />
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Fragment>
                );
              })
            ) : (
              <Fragment>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    No Competition Sorry
                  </Text>
                </View>
              </Fragment>
            )}
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 5,
  },
});

const mapState = (state) => ({
  comp: state.comp,
});

export default connect(mapState, {competitionList})(ListingScreen);
