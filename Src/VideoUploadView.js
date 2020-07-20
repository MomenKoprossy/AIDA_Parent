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
      type: `video/${this.state.type}`,
      name: this.state.vidName,
    });
    vid.append("child_code", this.props.navigation.state.params.cCode);

    axios
      .post(this.url, vid, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(progressEvent);
        },
      })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else JSON.stringify(req.data.success) == "true";
        alert("All Done! Wait for Result");
        this.props.navigation.pop(2)
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
                1. The care giver should be at least 18 years old and the child to be between 12 months and 17 years</Text>
            </CardItem>
            <CardItem>
              <Text>2. The video to be between 3 minutes and 6 minutes</Text>
            </CardItem>
            <CardItem>
              <Text>3. The video shouldnt exceed the size limit of 200MB</Text>
            </CardItem>
            <CardItem>
              <Text>4. Showed the face and hands of the child</Text>
            </CardItem>
            <CardItem>
              <Text>5. Shows clear opportunities for direct social engagement</Text>
            </CardItem>
            <CardItem>
              <Text>6. Involved opportunities for the use of an object such as utensil, crayon or toy</Text>
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
