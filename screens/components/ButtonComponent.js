import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

class ButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress();
        }}
        style={styles.button}>
        <Text style={styles.title}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    width: '100%',
    backgroundColor: '#D3C499',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ButtonComponent;
