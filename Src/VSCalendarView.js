import * as React from "react";
import {
  Container,
  Header,
  Body,
  Button,
  Title,
  Card,
  CardItem,
  Text,
  Left,
  Icon,
  Thumbnail,
  Right,
  H3,
  View,
} from "native-base";
import { serverURL, Theme_color } from "./utils";
import axios from "react-native-axios";
import Constants from "expo-constants";
import { Agenda } from "react-native-calendars";

export default class VSCalendarView extends React.Component {
  url = serverURL + "get_all_tasks_in_timeFrame";
  picurl = serverURL + "get_task_image?reduced=1&task_id=";

  componentDidMount() {
    this.getChildVS(this.props.navigation.state.params.cCode);
  }

  getChildVS = (child_code) => {
    axios
      .post(this.url, {
        child_id: child_code,
        start_date: "2020-07-06",
        end_date: "2020-07-06",
      })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false") {
          alert(JSON.stringify(req.data.errors));
          this.setState({ refresh: false });
        } else if (JSON.stringify(req.data.success) == "true") {
          this.setState({
            VS: this.prepCalendar(req.data.result),
            refresh: false,
          });
        }
      })
      .catch((error) => {});
  };

  getDate(date) {
    var temp = date.split("T");
    return temp[0];
  }

  prepCalendar = (shit) => {
    var vs = shit;
    var res = {};
    for (var i = 0; i < vs.length; i++) {
      var date = this.getDate(vs[i].start_date_time);
      if (date in res) {
        res[date].push(vs[i]);
      } else res[date] = [vs[i]];
    }
    return res;
  };

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
          <Text note style={{ color: "black" }}>
            Repeat: {task.repeat == "D" ? "Daily" : "Monthly"}
          </Text>
        </Body>
      );
  };

  renderTime = (time) => {
    var temp = time.split("T");
    var temp2 = temp[1].split(":");
    return `${temp2[0]}:${temp2[1]}`;
  };

  renderTask = (task) => {
    if (task.state == "missed") {
      return (
        <Card
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem
            bordered
            style={{ backgroundColor: "red" }}
            button
            onPress={() => {
              this.props.navigation.navigate("TDetails", {
                info: task,
              });
            }}
          >
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
              <Text>State: {task.state}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.state == "done") {
      return (
        <Card
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem
            bordered
            style={{ backgroundColor: "green" }}
            button
            onPress={() => {
              this.props.navigation.navigate("TDetails", {
                info: task,
              });
            }}
          >
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
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem
            bordered
            onPress={() => {
              this.props.navigation.navigate("TDetails", {
                info: task,
              });
            }}
            button
          >
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
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem
            bordered
            style={{ backgroundColor: "#371796" }}
            button
            onPress={() => {
              this.props.navigation.navigate("TDetails", {
                info: task,
              });
            }}
          >
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
    VS: {},
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
        <Agenda
          items={this.state.VS}
          renderItem={this.state.VS}
          renderEmptyData={() => {
            return <View />;
          }}
          pastScrollRange={1}
          futureScrollRange={3}
          renderItem={(item) => this.renderTask(item)}
          minDate={"2020-07-01"}
          theme={{
            agendaDayTextColor: Theme_color,
            agendaDayNumColor: Theme_color,
            agendaTodayColor: Theme_color,
            agendaKnobColor: Theme_color,
            textSectionTitleDisabledColor: Theme_color,
            selectedDayBackgroundColor: Theme_color,
            dotColor: Theme_color,
          }}
          onRefresh={() => {
            this.getChildVS(this.props.navigation.state.params.cCode);
          }}
        />

        {/* <Content
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
            {(this.state.VS || []).map((task, ) =>
              this.renderTask(task, )
            )}
          </ScrollView>
        </Content> */}
      </Container>
    );
  }
}
