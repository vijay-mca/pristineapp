import React, {Component, Fragment, PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showWinnerGallery} from '../redux/action/contentAction';
import {LOADING} from '../redux/types';

class WinnerGallery extends Component {
  static propTypes = {
    showWinnerGallery: PropTypes.func.isRequired,
  };
  static defaultProps = {
    disableVirtualization: true,
  };

  constructor(props) {
    super(props);
    
    this.isMounted = false;

    this.state = {
      start: 0,
      end: 10,
      loadingMore: this.props.cms.loading,
    };
  }

  componentDidMount() {
    this.isMounted = true;
    this.props.showWinnerGallery(
      this.props.auth.uniqueId,
      this.state.start,
      this.state.end,
    );
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    if (
      this.props.cms.winnerGallery.length !==
        prevProp.cms.winnerGallery.length ||
      this.state.end !== prevState.end
    ) {
      this.props.showWinnerGallery(
        this.props.auth.uniqueId,
        this.state.start,
        this.state.end,
      );
    }
    this.setState({
      loadingMore: this.props.cms.loading,
    });
    //console.log(this.props.cms.winnerGallery.length, this.state.end);
  }

  onScrollGallery = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 1;
    let result =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    //true if the end is reached other wise false

    return result;
  };

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        end: prevState.end + 10,
      }),
      () => {
        this.props.showWinnerGallery(
          this.props.auth.uniqueId,
          this.state.start,
          this.state.end,
        );
      },
    );
    this.setState({
      loadingMore: this.props.cms.loading,
    });
  };

  renderGellery = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardImg}>
          <Image
            source={{uri: item.image, cache: 'force-cache'}}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <Text style={styles.cartBtn}>{item.title}</Text>
      </View>
    );
  };

  _renderMyKeyExtractor = (item, index) => index.toString();

  _renderFooter = () => {
    const {loadingMore} = this.state;
    if (loadingMore) {
      return (
        <Fragment>
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'white',
              },
            ]}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Fragment>
      );
    } else {
      return null;
    }
  };

  shouldComponentUpdate(prevProp, prevState) {
    console.log(
      this.props.cms.winnerGallery.length,
      prevProp.cms.winnerGallery.length,
      this.props.cms.winnerGallery.length !== prevProp.cms.winnerGallery.length,
    );
    if (
      this.props.cms.winnerGallery.length !== prevProp.cms.winnerGallery.length
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {winnerGallery} = this.props.cms;

    if (winnerGallery.length === 0) {
      return (
        <Fragment>
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'flex-end',
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>winners gallery</Text>
        </View>
        {winnerGallery.length > 0 && (
          <FlatList
            data={winnerGallery}
            renderItem={this.renderGellery}
            keyExtractor={this._renderMyKeyExtractor}
            onEndReached={this._handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            //ListFooterComponent={this._renderFooter}
          />
        )}
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
    marginBottom: 10,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    marginBottom: 20,
  },
  cardImg: {
    width: '100%',
    height: 250,
  },
  cartBtn: {
    width: '100%',
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#D3C499',
    borderWidth: 1,
    borderColor: '#D3C499',
    fontWeight: 'bold',
    padding: 3,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  cms: state.cms,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showWinnerGallery: (unique_id, start, end) =>
      dispatch(showWinnerGallery(unique_id, start, end)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WinnerGallery);
