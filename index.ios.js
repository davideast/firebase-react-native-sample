/**
 * Sample React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var Swipeout = require('react-native-swipeout')
var styles = require('./styles.js')
var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  Component,
  TouchableHighlight,
  AlertIOS,
} = React;

var constants = {
  actionColor: '#24CE84'
};

var FirebaseUrl = 'https://firereactbasenative.firebaseio.com/';

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
        var item = {
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

  addItem() {
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

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.statusbar}/>
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>Grocery List</Text>
        </View>

        <ListView
          scrollEnabled={this.state.scrollEnabled}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          style={styles.listview}/>

        <View style={styles.action}>
          <TouchableHighlight
            underlayColor={constants.actionColor}
            onPress={this.addItem.bind(this)}>
            <Text style={styles.actionText}>Add</Text>
          </TouchableHighlight>
        </View>

      </View>
    )
  }

  renderItem(item) {

    var swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: '#f00',
        color: '#fff',
        underlayColor: '#f00',
        autoClose: true,
        onPress: function() {
          var ref = new Firebase(FirebaseUrl);
          var itemRef = ref.child('items').child(item._key);
          itemRef.remove();
        }
      }
    ];

    console.log(swipeoutBtns);

    return (
      <Swipeout right={swipeoutBtns} autoClose={true}>
        <View style={styles.li}>
          <Text style={styles.liText}>{item.title}</Text>
        </View>
      </Swipeout>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading items...
        </Text>
      </View>
    );
  }

}

AppRegistry.registerComponent('FirebaseReactNativeSample', () => FirebaseReactNativeSample);
