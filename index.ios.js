/**
 * Sample React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

const React = require('react-native');
const Firebase = require('firebase');
const Swipeout = require('react-native-swipeout')
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const styles = require('./styles.js')
const constants = styles.constants;

const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = React;

const FirebaseUrl = 'https://firereactbasenative.firebaseio.com/';

class FirebaseReactNativeSample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      scrollEnabled: true
    };
    this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return new Firebase(FirebaseUrl);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        const item = {
          title: child.val().title,
          _key: child.key()
        };
        items.push(item);
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        loaded: true
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
          scrollEnabled={this.state.scrollEnabled}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>

        <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </View>
    )
  }

  _addItem() {
    AlertIOS.alert(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.alert(
        'Delete',
        null,
        [
          {text: 'Delete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ],
        'default'
      );
    };

    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

}

AppRegistry.registerComponent('FirebaseReactNativeSample', () => FirebaseReactNativeSample);
