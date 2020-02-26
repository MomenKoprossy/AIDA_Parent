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
  CardItem
} from "native-base";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

export default class VideoUploadView extends React.Component {
  state = {
    selected: "No Video Selected"
  };

  selectVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 0.5
    });

    if (!result.cancelled) {
      this.setState({ selected: result.uri });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#c23fc4" }}>
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
              <Text>1. The video should be less than 1min</Text>
            </CardItem>
            <CardItem>
              <Text>
                2. The video shouldnt be in 4k resloution our server aint that
                big bruh
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Button
                rounded
                style={{ backgroundColor: "#c23fc4" }}
                onPress={() => {
                  this.selectVideo();
                }}
              >
                <Text>Upload</Text>
              </Button>
            </CardItem>
            <CardItem>
              <Text>{this.state.selected}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  }
});
