import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import {connect} from 'react-redux';
import ButtonComponent from './components/ButtonComponent';
import WebView from 'react-native-webview';

class DrawScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {};
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Draws</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              LOUGH ERNE RESORT 5* PACKAGE #2 8-7-20
            </Text>
            <View style={styles.cardVideo}>
              <WebView
                source={{
                  html:
                    '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FPristineCompetitions%2Fvideos%2F1092956791104661%2F&amp;show_text=0&amp;width=560" style="border:none;overflow:hidden; width: 100%" height="100%" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"></iframe>',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    backgroundColor: '#D3C499',
    color: 'white',
    width: '100%',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
  },
  card: {
    padding: 5,
  },
  cardTitle: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardVideo: {
    width: '100%',
    height: 200,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, null)(DrawScreen);
