import React, { Component } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import ImageCard from "../shared-components/CardView/ImageCard";

import background from "../../assets/yoga.jpg";
import background2 from "../../assets/runner.jpg";
import background3 from "../../assets/dumbbell.jpg";
import background4 from "../../assets/food.jpg";
import background5 from "../../assets/boxer.jpg";

const HEADER_MAX_HEIGHT = 110;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      imageCards: [
        { title: "training partners", image: background },
        { title: "gyms", image: background2 },
        { title: "workouts", image: background3 },
        { title: "recipes", image: background4 },
      ],
    };
  }

  render() {
    let imageCards = this.state.imageCards.map((val) => {
      return <ImageCard title={val.title} image={val.image} />;
    });

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp",
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 8, HEADER_SCROLL_DISTANCE / 2],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });
    const textOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 8, HEADER_SCROLL_DISTANCE / 2],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -100],
      extrapolate: "clamp",
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp",
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={styles.scrollViewContent}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {imageCards}
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{ translateY: headerTranslate }],
            },
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={background5}
          />
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: textOpacity,
              },
            ]}
          >
            train.
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          <Icon
            style={[{ color: "white" }]}
            size={50}
            name={"ios-american-football"}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.99,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 28 : 38,
    height: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: "#F5F5F5",
    position: "absolute",
    fontSize: 20,
    bottom: 18,
  },
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
});
