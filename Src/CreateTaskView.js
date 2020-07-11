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
  Picker,
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import { serverURL, Theme_color } from "./utils";
import axios from "react-native-axios";
import DatePicker from "react-native-datepicker";
import * as ImagePicker from "expo-image-picker";
import AutoTags from "react-native-tag-autocomplete";

export default class CreateTaskView extends React.Component {
  state = {
    name: "",
    date: "",
    time: "",
    duration: { h: "", m: "" },
    uri:
      "/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAZAAA/+ED+Gh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InV1aWQ6NUQyMDg5MjQ5M0JGREIxMTkxNEE4NTkwRDMxNTA4QzgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEUyNjNCMkFDMUNDMTFFODg5NzZFN0Q1RkM1NDI5NEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEUyNjNCMjlDMUNDMTFFODg5NzZFN0Q1RkM1NDI5NEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgSWxsdXN0cmF0b3IgQ0MgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REZCNUE5MTdDQ0MxRTgxMUE2MzVFMUFFQ0MxRUNGMTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REVCNUE5MTdDQ0MxRTgxMUE2MzVFMUFFQ0MxRUNGMTkiLz4g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",
    repeat: "D",
    selected: "",
    picName: "",
    type: "jpeg",
    tagsSelected: [],
    suggestions: [],
  };

  dur = "";
  url = serverURL + "add_task";
  createTagurl = serverURL + "add_tag";
  suggurl = serverURL + "search_tag";

  componentDidMount() {
    this.loadSuggestions();
  }

  prepTags = (type) => {
    var temp = this.state.tagsSelected;
    var pub = [];
    var pri = [];
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].tag_type == "public") pub = pub.concat(temp[i].tag_id);
      else if (temp[i].tag_type == "private") pri = pri.concat(temp[i].tag_id);
    }
    if (type == "public") return pub;
    else if (type == "private") return pri;
  };

  loadSuggestions = () => {
    axios
      .post(this.suggurl)
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else JSON.stringify(req.data.success) == "true";
        {
          this.setState({ suggestions: req.data.result });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  createTag = (input) => {
    axios
      .post(this.createTagurl, { name: input })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          this.loadSuggestions();
          setTimeout(() => {
            var temp = this.state.suggestions;
            for (var i = 0; i < temp.length; i++) {
              if (temp[i].name == input) this.handleAddition(temp[i]);
            }
          }, 1000);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  addTaskRequest = () => {
    var data = new FormData();
    data.append("file", {
      uri: this.state.selected,
      type: `image/${this.state.type}`,
      name: this.state.picName,
    });
    var fields = {
      date: this.state.date,
      time: this.state.time,
      duration: this.state.duration,
      child_id: this.props.navigation.state.params.cCode,
      name: this.state.name,
      public_tags: this.prepTags("public"),
      private_tags: this.prepTags("private"),
      repeat: this.state.repeat,
    };
    data.append("fields", JSON.stringify(fields));

    axios
      .post(this.url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else JSON.stringify(req.data.success) == "true";
        alert("Task Created Successfully!");
        this.props.navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  handleDelete = (index) => {
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  };

  handleAddition = (suggestion) => {
    this.setState({
      tagsSelected: this.state.tagsSelected.concat(suggestion),
    });
  };

  selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      var parts = result.uri.split("/");
      var type = result.uri.split(".");
      this.setState({
        selected: result.uri,
        picName: parts[parts.length - 1],
        type: type[type.length - 1],
        uri: result.base64,
      });
    }
  };

  prepForServer(str) {
    var part = str.split(":");
    var h = part[0];
    var m = part[1];

    this.setState({ duration: JSON.stringify({ h: h, m: m }) });
  }

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <Header style={{ backgroundColor: Theme_color }}>
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
                        uri: `data:image/${this.state.type};base64,${this.state.uri}`,
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
                <Item
                  fixedLabel
                  picker
                  style={(styles.item, { marginLeft: 15 })}
                >
                  <Label>Repetition:</Label>
                  <Picker
                    selectedValue={this.state.repeat}
                    mode="dropdown"
                    onValueChange={(value) => this.setState({ repeat: value })}
                  >
                    <Picker.Item label="Daily" value="D" />
                    <Picker.Item label="Monthly" value="M" />
                  </Picker>
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label style={{ marginBottom: 15, marginTop: 10 }}>
                    Tags:
                  </Label>
                  <AutoTags
                    autoFocus={false}
                    suggestions={this.state.suggestions}
                    tagsSelected={this.state.tagsSelected}
                    handleAddition={this.handleAddition}
                    handleDelete={this.handleDelete}
                    placeholder="Add Tags"
                    style={styles.input}
                    onCustomTagCreated={(input) => {
                      this.createTag(input);
                    }}
                    createTagOnSpace={true}
                  />
                </Item>
              </Form>
              <View style={{ height: 60 }}></View>
              <Button
                style={{
                  backgroundColor: Theme_color,
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
