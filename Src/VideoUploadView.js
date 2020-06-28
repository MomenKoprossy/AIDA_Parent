import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Button,
  Text,
  Header,
  Body,
  Title,
  Left,
  Icon,
  Right,
  Content,
  Card,
  CardItem,
} from "native-base";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import axios from "react-native-axios";
import { serverURL, Theme_color } from "./utils";

export default class VideoUploadView extends React.Component {
  state = {
    selected: "",
    vidName: "No Video Selected",
    type: "",
  };

  url = serverURL + "submit_video";

  selectVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      var parts = result.uri.split("/");
      var type = result.uri.split(".");
      this.setState({
        selected: result.uri,
        vidName: parts[parts.length - 1],
        type: type[type.length - 1],
      });
    }
  };

  uploadVideo = () => {
    var vid = new FormData();
    vid.append("file", {
      uri: this.state.selected,
      type: "video/mp4",
      name: this.state.vidName,
    });
    vid.append("child_code", this.props.navigation.state.params.cCode);
    console.log(vid);

    axios
      .post(this.url, vid, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(progressEvent.loaded);
        },
      })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
      })
      .catch((error) => {
        alert("Connection Error");
      });
  };

  uploadButtons = () => {
    if (this.state.selected == "")
      return (
        <Card>
          <CardItem>
            <Button
              rounded
              style={{ backgroundColor: Theme_color }}
              onPress={() => {
                this.selectVideo();
              }}
            >
              <Text>Select Video</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Text>{this.state.vidName}</Text>
          </CardItem>
        </Card>
      );
    else
      return (
        <Card>
          <CardItem>
            <Button
              rounded
              style={{ backgroundColor: Theme_color }}
              onPress={() => {
                this.selectVideo();
              }}
            >
              <Text>Select Video</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Text>{this.state.vidName}</Text>
          </CardItem>
          <Button
            style={{
              backgroundColor: Theme_color,
              width: "60%",
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 20,
            }}
            onPress={() => this.uploadVideo()}
          >
            <Icon name="cloud-upload" />
            <Text>Upload Video</Text>
          </Button>
        </Card>
      );
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: Theme_color }}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ alignSelf: "center" }}>Video Instructions</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Text>
                1. The video should be less than 3 min and not more than 10 min{" "}
              </Text>
            </CardItem>
            <CardItem>
              <Text>2. The video shouldnt exceed the size limit of 200MB</Text>
            </CardItem>
          </Card>
          {this.uploadButtons()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
