import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  Avatar,
  Chip,
  Card as MyCard,
  Modal,
  TextInput,
  Button,
} from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShareSquare,
  faCannabis,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const LeftContent = (props) => <Avatar.Icon {...props} icon="train-variant" />;
export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardId: null,
      userId: null,
      likes: 0,
      liked: false,
      likeText: "0",
      comment: "",
      comments: [],
      visible: false,
    };
  }
  handleLike = () => {
    let upvotes = this.state.likes;
    if (!this.state.liked) {
      upvotes += 1;
      this.setState({ liked: true, likeText: "You like this." });
    } else {
      upvotes -= 1;
      this.setState({ liked: false, likeText: "" + upvotes });
    }
    this.setState({ likes: upvotes });
  };
  handleComment = () => {
    let { visible } = this.state;

    if (!visible) {
      let { comments } = this.state;
      if (comments.size > 0) {
        //show old comments
      } else {
        //show comment box only
        this.showComments(true);
      }
    } else {
      this.showComments(false);
    }
  };
  showComments = (val) => {
    this.setState({ visible: val });
  };
  render() {
    const { visible } = this.state;
    var cardDate = Date.parse(this.props.val.date);
    return (
      <MyCard style={styles.container}>
        <MyCard.Title
          title="Daphne Lun"
          subtitle={moment.utc(cardDate).local().startOf("seconds").fromNow()}
          left={LeftContent}
          //right={() => <Button icon="close" size={100} onPress={this.props.deleteMethod} />}
        />
        <View style={styles.topContainer}></View>
        <MyCard.Content>
          <Text>{this.props.val.note}</Text>
          {this.props.val.img && (
            <View style={styles.imgcontainer}>
              <Image source={{ uri: this.props.val.img }} style={styles.img} />
            </View>
          )}
        </MyCard.Content>
        <MyCard.Actions>
          <View style={styles.actionButtons}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Chip onPress={this.handleLike} style={styles.actionButton}>
                <FontAwesomeIcon
                  size={15}
                  icon={faThumbsUp}
                  style={styles.icon}
                ></FontAwesomeIcon>
                <Text style={styles.likeText}>{this.state.likeText}</Text>
              </Chip>
              <Chip onPress={this.handleComment} style={styles.actionButton}>
                <FontAwesomeIcon
                  size={15}
                  icon={faComment}
                  style={styles.icon}
                ></FontAwesomeIcon>
                <Text style={styles.likeText}>0</Text>
              </Chip>
              <Chip onPress={this.handleShare} style={styles.actionButton}>
                <FontAwesomeIcon
                  size={15}
                  icon={faShareSquare}
                  style={styles.icon}
                ></FontAwesomeIcon>
                <Text style={styles.likeText}>Share</Text>
              </Chip>
            </View>
            <View>
              <Modal visible={this.state.visible}>
                <View style={styles.commentsContainer}>
                  <TextInput
                    onChangeText={(text) => {
                      this.state.comments.push({
                        userId: "Daphne Lun",
                        comment: text,
                      });
                    }}
                    style={styles.commentBox}
                  ></TextInput>
                  <View>
                    <Chip
                      onPress={this.handleComment}
                      style={styles.actionButton}
                    >
                      <FontAwesomeIcon
                        size={15}
                        icon={faComment}
                        style={styles.icon}
                      ></FontAwesomeIcon>
                      <Text style={styles.likeText}>Comment</Text>
                    </Chip>
                    <Chip
                      onPress={this.handleComment}
                      style={styles.actionButton}
                    >
                      <FontAwesomeIcon
                        size={15}
                        icon={faCannabis}
                        style={styles.icon}
                      ></FontAwesomeIcon>
                      <Text style={styles.likeText}>Cancel</Text>
                    </Chip>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </MyCard.Actions>
      </MyCard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    elevation: 3
  },
  commentsContainer: {
    height: 0,
  },
  commentBox: {
    backgroundColor: "white",
    textAlignVertical: "top",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    opacity: 0.8,
    backgroundColor: "#FBFBF8",
  },
  actionButtons: {
    borderColor: "grey",
    borderRadius: 50,
    borderWidth: 2,
    padding: 5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#FBFBF8",
  },
  topContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-end",
    height: 25,
  },
  noteDelete: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 25,
    width: 50,
    padding: 20,
    bottom: 70,
  },
  img: {
    borderRadius: 10,
    padding: 200,
    width: 150,
    height: 150,
  },
  icon: {},
  imgcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
  },
  likeButton: {
    flex: 0.5,
    flexDirection: "row",
  },
  likeText: {
    color: "black",
    padding: 10,
    fontSize: 15,
  },
  noteDeleteText: {
    color: "black",
  },
});
