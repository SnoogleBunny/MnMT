import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  render() {
    return (
      <View style={styles.imgBackgroundContainer}>
        <ImageBackground
          resizeMethod="resize"
          source={this.props.image}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={styles.imgBackgroundText}>{this.props.title}</Text>
          </View>
        </ImageBackground>
      </View>
    );
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
  imgBackgroundContainer: {
    height: 200,
    paddingBottom: 1,
  },
  imgBackgroundText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Cochin",
    fontStyle: "sans-serif",
    padding: 15,
    backgroundColor: "black",
    borderRadius: 50,
    opacity: 0.8,
  },
  header: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  headerText: {
    color: "#b4d84b",
    fontSize: 26,
    padding: 5,
  },
  scrollContainer: {},
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
