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
import Tags from "react-native-tags";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default class TaskDetailsView extends React.Component {
  state = {
    Det: this.props.navigation.state.params.info,
    name: null,
    date: null,
    time: null,
    duration: { h: "", m: "" },
    uri: null,
    repeat: null,
    selected: "",
    picName: "",
    type: "",
    NewCCode: "",
  };

  picurl = serverURL + "get_task_image?reduced=1&task_id=";
  url = serverURL + "modify_task";
  rmurl = serverURL + "remove_task";
  cloneurl = serverURL + "add_task";

  cloneTaskRequest = () => {
    var data = new FormData();
    FileSystem.downloadAsync(
      serverURL + "get_task_image?task_id=" + this.state.Det.task_id
    ).then((uri) => {
      var parts = uri.split("/");
      var type = uri.split(".");
      data.append("file", {
        uri: uri,
        type: `image/${type[type.length - 1]}`,
        name: parts[parts.length - 1],
      });
    });
    var fields = {
      date: this.renderDate(this.state.Det.start_date_time),
      time: this.renderTime(this.state.Det.start_date_time),
      duration: JSON.parse(this.state.Det.duration),
      child_id: this.state.NewCCode,
      name: this.state.Det.name,
      public_tags: this.state.Det.tags,
      repeat: this.state.Det.repeat,
    };
    data.append("fields", JSON.stringify(fields));
    console.log(data);

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
        alert("Task Cloned Successfully!");
        this.props.navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  sendEdit = () => {
    var data = new FormData();
    if (this.state.uri != null)
      data.append("file", {
        uri: this.state.selected,
        type: `image/${this.state.type}`,
        name: this.state.picName,
      });
    var edit = {};
    edit.task_id = this.state.Det.task_id;
    this.state.name != this.state.Det.name && this.state.name != null
      ? (edit.name = this.state.name)
      : null;
    this.state.date != this.renderDate(this.state.Det.start_date_time) &&
    this.state.date != null
      ? (edit.date = this.state.date)
      : null;
    this.state.time != this.renderTime(this.state.Det.start_date_time) &&
    this.state.time != null
      ? (edit.time = this.state.time)
      : null;
    this.dur != this.prepDuration(this.state.Det.duration) && this.dur != null
      ? (edit.duration = this.state.duration)
      : null;
    this.state.repeat != this.state.Det.repeat && this.state.repeat != null
      ? (edit.repeat = this.state.repeat)
      : null;
    data.append("fields", JSON.stringify(edit));
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
        alert("Task Edited Successfully");
        this.props.navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  removeRequest = (deletion_type) => {
    axios
      .post(this.rmurl, {
        task_id: this.state.Det.task_id,
        deletion_type: deletion_type,
      })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          alert("Task Removed Successfully");
          this.props.navigation.goBack();
        }
      })
      .catch(() => alert("Connection Error"));
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

  dur = null;
  tags = [];

  prepDuration(dur) {
    var temp = JSON.parse(dur);
    return temp.h + ":" + temp.m;
  }

  prepForServer(str) {
    var part = str.split(":");
    var h = part[0];
    var m = part[1];

    this.setState({ duration: JSON.stringify({ h: h, m: m }) });
  }

  renderDate = (date) => {
    var temp = date.split("T");
    return temp[0];
  };

  renderTime = (time) => {
    var temp = time.split("T");
    var temp2 = temp[1].split(":");
    return `${temp2[0]}:${temp2[1]}`;
  };

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
            <Title>Task Details</Title>
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
                        uri:
                          this.state.uri == null
                            ? `${this.picurl}${this.state.Det.task_id}`
                            : `data:image/${this.state.type};base64,${this.state.uri}`,
                      }}
                    />
                  </TouchableOpacity>
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label>Task Name:</Label>
                  <Input
                    style={styles.input}
                    editable={true}
                    value={
                      this.state.name == null
                        ? this.state.Det.name
                        : this.state.name
                    }
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
                      date={
                        this.state.date == null
                          ? this.renderDate(this.state.Det.start_date_time)
                          : this.state.date
                      }
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
                      date={
                        this.state.time == null
                          ? this.renderTime(this.state.Det.start_date_time)
                          : this.state.time
                      }
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
                      date={
                        this.dur == null
                          ? this.prepDuration(this.state.Det.duration)
                          : this.dur
                      }
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
                    selectedValue={
                      this.state.repeat == null
                        ? this.state.Det.repeat == "D"
                          ? "Daily"
                          : "Monthly"
                        : this.state.repeat
                    }
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
                  <Tags
                    initialTags={this.tags == [] ? this.state.Det.Tags : []}
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
                  backgroundColor: Theme_color,
                  width: "60%",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                onPress={() => this.sendEdit()}
              >
                <Icon name="add" />
                <Text>Edit Task</Text>
              </Button>
              <Button
                style={{
                  backgroundColor: Theme_color,
                  marginTop: 20,
                  width: "60%",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                onPress={() => {
                  this.props.navigation.navigate("CList", {
                    Det: this.state.Det,
                  });
                }}
              >
                <Icon name="copy" />
                <Text>Clone To Child</Text>
              </Button>
              <Button
                danger
                style={{
                  marginTop: 20,
                  width: "60%",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                onPress={() => this.removeRequest(0)}
              >
                <Icon name="close" />
                <Text>Remove This Time Only</Text>
              </Button>
              <Button
                danger
                style={{
                  marginTop: 20,
                  width: "60%",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                onPress={() => this.removeRequest(1)}
              >
                <Icon name="close" />
                <Text>Remove All Repetition</Text>
              </Button>
            </ScrollView>
            <View style={{ paddingBottom: 30 }}></View>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }

  addTaskRequest = () => {
    var data = new FormData();
    data.append("file", {
      uri: this.state.selected,
      type: "image/jpg",
      // type: `image/${this.state.type}`,
      name: this.state.picName,
    });
    var fields = {
      date: this.state.date,
      time: this.state.time,
      duration: this.state.duration,
      child_id: this.props.navigation.state.params.cCode,
      name: this.state.name,
      //public_tags: this.tags,
      repeat: this.state.repeat,
    };
    data.append("fields", JSON.stringify(fields));
    console.log(data);

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
        alert("All Done! Wait for Result");
        this.props.navigation.pop(2);
      })
      .catch((error) => {
        alert(error);
      });
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
