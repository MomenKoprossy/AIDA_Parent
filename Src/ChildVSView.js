import * as React from "react";
import {
  Container,
  Header,
  Body,
  Button,
  Title,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Icon,
  Thumbnail,
  Right,
  H3,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { serverURL, Theme_color } from "./utils";
import { RefreshControl } from "react-native";
import axios from "react-native-axios";
import Constants from "expo-constants";

export default class ChildVSView extends React.Component {
  url = serverURL + "get_all_child_task_data";
  picurl = serverURL + "get_task_image?task_id=";

  componentDidMount() {
    this.getChildVS(this.props.navigation.state.params.cCode);
  }

  getChildVS = (child_code) => {
    axios
      .post(this.url, { child_id: child_code })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false") {
          alert(JSON.stringify(req.data.errors));
          this.setState({ refresh: false });
        } else if (JSON.stringify(req.data.success) == "true") {
          this.setState({ VS: req.data.result, refresh: false });
        }
      })
      .catch(() => alert("Connection Error"));
  };

  // rewards = () => {
  //   var temp = [];
  //   temp = this.state.VS;
  //   var rewards = 0;
  //   for (var i = 0; i < temp.length; i++) {
  //     if (temp[i].state == "done") rewards++;
  //   }
  //   return (
  //     <Text style={{ marginRight: 10, color: "gold" }}>
  //       {rewards}/{temp.length}
  //     </Text>
  //   );
  // };

  renderRepeat = (task) => {
    if (task.repeat == null)
      return (
        <Body>
          <H3>{task.name}</H3>
        </Body>
      );
    else
      return (
        <Body>
          <H3>{task.name}</H3>
          <Text note style={{ color: "white" }}>
            Repeat: {task.repeat}
          </Text>
        </Body>
      );
  };

  renderTime = (time) => {
    var temp = time.split("T");
    var temp2 = temp[1].split(":");
    return `${temp2[0]}:${temp2[1]}`;
  };

  renderTask = (task, index) => {
    if (task.state == "missed") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate("TDetails", {
              task_id: task.task_id,
            });
          }}
        >
          <CardItem bordered style={{ backgroundColor: "red" }}>
            <Left>
              <Thumbnail
                square
                source={{ uri: `${this.picurl}${task.task_id}` }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <Text>Start: {this.renderTime(task.start_date_time)}</Text>
              <Text>End: {this.renderTime(task.end_date_time)}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.state == "done") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate("TDetails", {
              task_id: task.task_id,
            });
          }}
        >
          <CardItem bordered style={{ backgroundColor: "green" }}>
            <Left>
              <Thumbnail
                square
                source={{ uri: `${this.picurl}${task.task_id}` }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <Text>Start: {this.renderTime(task.start_date_time)}</Text>
              <Text>End: {this.renderTime(task.end_date_time)}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.state == "due" || task.state == "TBD") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate("TDetails", {
              task_id: task.task_id,
            });
          }}
        >
          <CardItem bordered>
            <Left>
              <Thumbnail
                square
                source={{ uri: `${this.picurl}${task.task_id}` }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <Text>Start: {this.renderTime(task.start_date_time)}</Text>
              <Text>End: {this.renderTime(task.end_date_time)}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.state == "next") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate("TDetails", {
              task_id: task.task_id,
            });
          }}
        >
          <CardItem bordered style={{ backgroundColor: "#371796" }}>
            <Left>
              <Thumbnail
                square
                source={{
                  uri: `${this.picurl}${task.task_id}`,
                }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <Text>Start: {this.renderTime(task.start_date_time)}</Text>
              <Text>End: {this.renderTime(task.end_date_time)}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    }
  };

  state = {
    VS: [],
    refresh: true,
  };

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <Header style={{ backgroundColor: Theme_color }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ alignSelf: "center" }}> Visual Schedule </Title>
          </Body>
          <Right>
            <Button
              backgroundColor="#371796"
              onPress={() =>
                this.props.navigation.navigate("TAdd", {
                  cCode: this.props.navigation.state.params.cCode,
                })
              }
              padder
            >
              <Text>Add Task</Text>
              <Icon name="add" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() =>
                this.getChildVS(this.props.navigation.state.params.cCode)
              }
            />
          }
        >
          <ScrollView>
            {(this.state.VS || []).map((task, index) =>
              this.renderTask(task, index)
            )}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
