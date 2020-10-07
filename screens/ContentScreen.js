import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {cmsContent} from '../redux/action/contentAction';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ContentScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = true;
    this.state = {
      content: null,
    };
  }

  static propTypes = {
    cmsContent: PropTypes.func.isRequired,
    cms: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.isMounted = true;
    const {params} = this.props.route.params;
    const {cms_id} = params;
    this.props.cmsContent(cms_id);
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    const {params} = this.props.route.params;
    const {cms_id} = params;

    if (cms_id !== prevProps.route.params.params.cms_id) {
      this.props.cmsContent(this.props.route.params.params.cms_id);
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {loading, content} = this.props.cms;

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
        <ScrollView>
          <View style={styles.container}>
            {content !== null && (
              <Fragment>
                <View style={styles.header}>
                  <Text style={styles.title}>{content.title}</Text>
                </View>
                <View style={styles.body}>
                  <Text style={styles.description}>
                    {content.description
                      .replace(/<\/?[^>]+(>|$)/g, '')
                      .replace(/\&nbsp;/g, ' ')}
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
    fontWeight: 'normal',
    color: 'white',
  },
  body: {
    width: '90%',
    marginRight: '5%',
    marginLeft: '5%',
  },
  description: {
    color: 'black',
    fontSize: 14,
  },
});

const mapState = (state) => ({
  cms: state.cms,
});

export default connect(mapState, {cmsContent})(ContentScreen);
