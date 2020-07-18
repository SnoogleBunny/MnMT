import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Card from "./Card";
import PostBox from "../PostBox";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faJoint } from "@fortawesome/free-solid-svg-icons";

var footerHeight = 0;

export default class LoginCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostBox: true,
      cardArray: [{ date: new Date().toString(), note: "Hi!" }],
      cardText: "",
      image: null,
    };
    this.postBox = React.createRef();
  }

  handleCard = (data) => {
    if (data) {
      var date = new Date();
      this.state.cardArray.push({
        date: date.toString(),
        note: data.cardText,
        img: data.image,
      });
      this.setState({ cardArray: this.state.cardArray });
    }
  };
  showPostBox = (val) => {
    if (this.state.showPostBox || !val) {
      this.postBox.current.hideModal();
      this.setState({ showPostBox: false });
    } else {
      this.setState({ showPostBox: true });
      this.postBox.current.showModal();
    }
  };
  _renderPostBox = () => {
    return (
      <View style={styles.footer}>
        <PostBox
          ref={this.postBox}
          style={{ height: 400 }}
          showPostBox={this.showPostBox}
          card={this.handleCard}
        />
      </View>
    );
  };

  render() {
    let cards = this.state.cardArray
      .slice(0)
      .reverse()
      .map((val, key) => {
        //show newest posts first
        return (
          <View style={{ padding: 5 }}>
            <Card
              key={key}
              keyval={key}
              val={val}
              deleteMethod={() => this.deleteCard(key)}
            ></Card>
          </View>
        );
      });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesomeIcon
            style={{ color: "green" }}
            icon={faJoint}
            size={40}
          ></FontAwesomeIcon>
          <Text style={styles.headerText}>train.</Text>
        </View>
        {this._renderPostBox()}
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
          }}
          style={styles.scrollContainer}
        >
          {cards}
        </ScrollView>
        <TouchableOpacity onPress={this.showPostBox} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  deleteCard(key) {
    this.state.cardArray.splice(key, 1);
    this.setState({ cardArray: this.state.cardArray });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexBasis: 1,
    backgroundColor: "white",
  },
  displayNone: {
    display: "none",
  },
  header: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  headerText: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  scrollContainer: {
    padding: 10,
    flexDirection: "column",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    alignSelf: "stretch",
    zIndex: 11,
  },
  textInput: {
    alignSelf: "stretch",
    color: "#fff",
    padding: 20,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#ededed",
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 30,
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
  },
});
