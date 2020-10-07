import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import {connect} from 'react-redux';
import ButtonComponent from './components/ButtonComponent';

class EntryListScreen extends Component {
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
          <Text style={styles.title}>entry list</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.card}>
            <Image
              source={{
                uri:
                  'https://www.pristinecompetitions.com/library/product/24fe68e.jpg',
                cache: 'force-cache',
              }}
              style={styles.cardImg}
            />
            <Text style={styles.cardTitle}>
              🔧🔧 MAC TOOL BUNDLE NO #2 🔧🔧🔧🔧
            </Text>
            <Text
              style={{
                width: '100%',
                paddingBottom: 10,
                paddingTop: 5,
                borderBottomWidth: 1,
              }}>
              Draw Date : 30-06-2020 09:00 PM
            </Text>
            <View style={{marginTop: 10}}>
              <ButtonComponent
                title="VIEW ENTRY LIST"
                onPress={() => {
                  Linking.openURL(
                    'https://www.pristinecompetitions.com/entry-list/Mac-tool-bundle-2',
                  );
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
  cardImg: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 200,
  },
  cardTitle: {
    width: '100%',
    fontSize: 20,
    paddingTop: 20,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, null)(EntryListScreen);
