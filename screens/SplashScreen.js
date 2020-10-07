import React, {Component, Fragment} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Listing');
    }, 2000);
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Animated.Image
            style={{opacity: this.state.fadeAnim, width: '75%'}}
            source={require('./img/logo.png')}
            resizeMode="contain"
          />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState, null)(SplashScreen);
