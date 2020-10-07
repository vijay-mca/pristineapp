import React, {Component, Fragment} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';

import Countdown from 'react-native-countdown-component';
import {connect} from 'react-redux';
import {competitionDetails} from '../redux/action/compAction';
import {currency} from '../config/const';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonComponent from './components/ButtonComponent';
import {Picker} from '@react-native-community/picker';
import {addCart} from '../redux/action/cartAction';

class ListingScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      isVisible: false,
      answer: [],
      answerHide: [],
      quantity: 1,
    };
  }

  componentDidMount() {
    this.isMounted = true;
    const {params} = this.props.route.params;
    const {comp_id} = params;
    this.props.competitionDetails(comp_id);
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    const {params} = this.props.route.params;
    const {comp_id} = params;

    if (comp_id !== prevProp.route.params.params.comp_id) {
      this.props.competitionDetails(comp_id);
    }
  }

  openCartModal = () => {
    this.setState({
      isVisible: true,
    });
  };

  closeCartModal = () => {
    this.setState({
      isVisible: false,
    });
  };

  handleQuestion = (val, key, q_id) => {
    this.state.answer[key] = val;
    this.state.answerHide[key] = val + '-' + q_id;

    this.setState({
      answer: this.state.answer,
      answerHide: this.state.answerHide,
    });
  };

  addCart = (pro_id, price) => {
    if (this.props.comp.question.length !== this.state.answer.length) {
      Alert.alert(
        'Validation',
        'Answer all question',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: true},
      );
    } else if (this.state.quantity === 0) {
      Alert.alert(
        'Validation',
        'Select quantity',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: true},
      );
    } else {
      this.setState({isVisible: false});
      let questionAnswer = {};
      let que;
      let que_id;
      let ans;

      if (
        this.state.answerHide.length > 0 &&
        this.props.comp.question.length > 0
      ) {
        for (let index = 0; index < this.state.answerHide.length; index++) {
          que = this.state.answerHide[index].split('-');
          que_id = que[1];
          ans = que[0];
          questionAnswer[index] = {
            [que_id]: ans,
          };
        }
      } else {
        questionAnswer = {};
      }

      this.props.addCart(
        this.props.auth.memId,
        this.props.auth.uniqueId,
        pro_id,
        price,
        this.state.quantity,
        questionAnswer,
      );

      this.setState({
        isVisible: false,
        answer: [],
        answerHide: [],
      });

      // console.log(
      //   this.props.auth.memId,
      //   this.props.auth.uniqueId,
      //   pro_id,
      //   price,
      //   this.state.quantity,
      //   questionAnswer,
      // );
    }
  };

  AddCartModal = () => {
    const colWidth = `${100 / parseInt(Dimensions.get('window').width / 110)}%`;
    const {question, details} = this.props.comp;
    let quantity = [];
    for (let i = 1; i <= details.total_qty_ticket; i++) {
      quantity.push(i);
    }

    return (
      <Modal visible={this.state.isVisible} transparent={true}>
        <ScrollView
          contentContainerStyle={[{flexGrow: 1, justifyContent: 'center'}]}>
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
              },
            ]}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: 'black',
                padding: 5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%'}}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                    question
                  </Text>
                </View>
                <View
                  style={{
                    width: '30%',
                    alignItems: 'flex-end',
                  }}>
                  <FontAwesome
                    name="close"
                    size={25}
                    onPress={() => {
                      this.closeCartModal();
                    }}
                    color="#fff"
                  />
                </View>
              </View>
              {question.length > 0
                ? question.map((q, key) => (
                    <Fragment key={key}>
                      <View style={styles.row}>
                        <Text style={{color: '#fff'}}>{q.question}</Text>
                      </View>
                      <View style={styles.row}>
                        <View style={{marginBottom: 10}} key={key}>
                          <Picker
                            style={{backgroundColor: '#fff'}}
                            selectedValue={this.state.answer[key]}
                            onValueChange={(val) => {
                              this.handleQuestion(val, key, q.q_id);
                            }}>
                            <Picker.Item label="CHOOSE AN OPTION" value="" />
                            {q.options.map((op, key) => (
                              <Picker.Item
                                label={op.toString()}
                                value={op}
                                key={key}
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>
                    </Fragment>
                  ))
                : null}
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'space-between',
                  padding: 10,
                }}>
                <View style={{width: '35%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                    quantity
                  </Text>
                </View>
                <View style={{width: '35%', justifyContent: 'center'}}>
                  <Picker
                    style={{backgroundColor: '#fff', padding: 10}}
                    selectedValue={this.state.quantity}
                    onValueChange={(val) => {
                      this.setState({quantity: val});
                    }}>
                    {quantity.map((qt, key) => (
                      <Picker.Item label={qt.toString()} value={qt} key={key} />
                    ))}
                  </Picker>
                </View>
                <View
                  style={{
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '2.5%',
                    marginLeft: '2.5%',
                  }}>
                  <ButtonComponent
                    title="Add"
                    onPress={() => {
                      this.addCart(details.pro_id, details.price);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {loading, details} = this.props.comp;
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

    const now = moment();
    const expirydate = moment(details.end_date);

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
      <Fragment>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {this.AddCartModal()}
          <View style={{flex: 1, marginTop: '5%'}}>
            <View
              style={{
                width: '95%',
                borderWidth: 3,
                borderColor: 'black',
                marginLeft: '2.5%',
                marginRight: '2.5%',
                marginBottom: 20,
              }}>
              <View style={styles.row}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    fontSize: 20,
                  }}>
                  {details.pro_title}
                </Text>
              </View>
              <View style={styles.row}>
                <Image
                  source={{
                    uri: details.image,
                    cache: 'force-cache',
                  }}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: 200,
                    borderWidth: 3,
                    borderColor: 'black',
                  }}
                />
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '70%'}}>
                  <View style={styles.row}>
                    <Text
                      style={{
                        textTransform: 'uppercase',
                        color: '#D3C499',
                        fontSize: 22,
                        fontWeight: 'bold',
                      }}>
                      Only {details.max_entry} tickets
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={{textTransform: 'uppercase'}}>
                      Only 1 Winner in this Competition
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={{textTransform: 'uppercase'}}>
                      Cost per entry {currency}
                      {details.price}
                    </Text>
                  </View>
                  <View style={{alignItems: 'flex-start', padding: 5}}>
                    {until === 0 ? (
                      <Text
                        style={{
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                        }}>
                        Sold out
                      </Text>
                    ) : (
                      <Countdown
                        until={until}
                        size={15}
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
                <View
                  style={{
                    width: '30%',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={() => {
                        this.openCartModal();
                      }}>
                      <Image
                        source={require('./img/ds.png')}
                        resizeMode="contain"
                        style={{
                          width: '100%',
                          height: 70,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '95%',
                borderWidth: 3,
                borderColor: 'black',
                marginLeft: '2.5%',
                marginRight: '2.5%',
              }}>
              <View style={styles.row}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    color: '#D3C499',
                    fontSize: 22,
                  }}>
                  description
                </Text>
              </View>
              {details.description !== null && (
                <View style={styles.row}>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {details.description}
                  </Text>
                </View>
              )}
              <View style={styles.row}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    color: '#D3C499',
                    fontSize: 22,
                  }}>
                  price Specifications:
                </Text>
              </View>
              {details.specification !== null && (
                <View style={styles.row}>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {details.specification}
                  </Text>
                </View>
              )}
              <View style={styles.row}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    color: '#D3C499',
                    fontSize: 22,
                  }}>
                  COMPETITION DETAILS:
                </Text>
              </View>
              {details.competition_details !== null && (
                <View style={styles.row}>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {details.competition_details}
                  </Text>
                </View>
              )}
            </View>
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
  auth: state.auth,
});

const mapProp = (dispatch) => {
  return {
    competitionDetails: (comp_id) => dispatch(competitionDetails(comp_id)),
    addCart: (memId, uniqueId, pro_id, price, quantity, questionAnswer) =>
      dispatch(
        addCart(memId, uniqueId, pro_id, price, quantity, questionAnswer),
      ),
  };
};

export default connect(mapState, mapProp)(ListingScreen);
