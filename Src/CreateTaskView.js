import React from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Button,
  Header,
  Body,
  Title,
  Left,
  Icon,
  Content,
  Text,
  Form,
  Item,
  Label,
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import { serverURL } from "./utils";
import axios from "react-native-axios";
import DatePicker from "react-native-datepicker";
import Tags from "react-native-tags";
import * as ImagePicker from "expo-image-picker";

export default class CreateTaskView extends React.Component {
  state = {
    name: "",
    data: "",
    time: "",
    duration: { h: "", m: "" },
    uri:
      "https://www.dcrc.co/wp-content/uploads/2019/04/blank-head-profile-pic-for-a-man.jpg",
  };

  selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ uri: "data:image/png;base64," + result.base64 });
      //console.log(result.base64)
    }
  };

  dur = "";
  tags = [];
  url = serverURL + "add_task";

  prepForServer(str) {
    var part = str.split(":");
    var h = part[0];
    var m = part[1];

    this.setState({ duration: { h: h, m: m } });
    //console.log(this.state.duration);
  }

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <Header style={{ backgroundColor: "#c23fc4" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add Task</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <KeyboardAvoidingView enabled behavior="padding">
            <ScrollView>
              <Form>
                <Item style={{ paddingBottom: 20, justifyContent: "center" }}>
                  <TouchableOpacity onPress={() => this.selectImage()}>
                    <Image
                      style={{
                        paddingVertical: 30,
                        width: 150,
                        height: 150,
                        borderRadius: 75,
                        alignSelf: "center",
                      }}
                      source={{
                        uri: this.state.uri,
                      }}
                    />
                  </TouchableOpacity>
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label>Task Name:</Label>
                  <Input
                    style={styles.input}
                    editable={true}
                    onChangeText={(value) => this.setState({ name: value })}
                  />
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label style={{ marginBottom: 15, marginTop: 10 }}>
                    Assignment Date:
                  </Label>
                  <Left marginRight={20}>
                    <DatePicker
                      style={{ marginBottom: 15, marginTop: 10 }}
                      placeholder="Select Date"
                      date={this.state.date}
                      confirmBtnText="Confirm"
                      cancelBtnTestID="Cancel"
                      onDateChange={(date) => {
                        this.setState({ date: date });
                      }}
                    />
                  </Left>
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label style={{ marginBottom: 15, marginTop: 10 }}>
                    Starting Time:
                  </Label>
                  <Left marginRight={20}>
                    <DatePicker
                      mode="time"
                      style={{ marginBottom: 15, marginTop: 10 }}
                      placeholder="Select Date"
                      date={this.state.time}
                      confirmBtnText="Confirm"
                      cancelBtnTestID="Cancel"
                      onDateChange={(time) => {
                        this.setState({ time: time });
                      }}
                    />
                  </Left>
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label style={{ marginBottom: 15, marginTop: 10 }}>
                    Task Duration:
                  </Label>
                  <Left marginRight={20}>
                    <DatePicker
                      mode="time"
                      style={{ marginBottom: 15, marginTop: 10 }}
                      placeholder="Select Date"
                      date={this.dur}
                      confirmBtnText="Confirm"
                      cancelBtnTestID="Cancel"
                      onDateChange={(duration) => {
                        this.dur = duration;
                        this.prepForServer(duration);
                      }}
                    />
                  </Left>
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label style={{ marginBottom: 15, marginTop: 10 }}>
                    Tags:
                  </Label>
                  <Tags
                    style={styles.input}
                    onChangeTags={(tags) => {
                      //lw 3mlt call l setState msh hyzhr el tags
                      this.tags = tags;
                    }}
                  />
                </Item>
              </Form>
              <View style={{ height: 60 }}></View>
              <Button
                style={{
                  backgroundColor: "#c23fc4",
                  width: "60%",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                onPress={() => this.addTaskRequest()}
              >
                <Icon name="add" />
                <Text>Add Task</Text>
              </Button>
            </ScrollView>
            <View style={{ paddingBottom: 30 }}></View>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }

  addTaskRequest = () => {
    axios
      .post(this.url, {})
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          alert("Task Added Successfully!");
        }
      })
      .catch(() => alert("Connection Error"));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 10,
  },
  input: {
    width: 0.65 * Dimensions.get("window").width,
  },
  item: {
    margin: 8,
    fontSize: 18,
    textAlign: "center",
  },
});
