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
import Tags from "react-native-tags";
import PickerCheckBox from "react-native-picker-checkbox";

export default class VSCalendarView extends React.Component {
  url = serverURL + "get_all_tasks_in_timeFrame";
  picurl = serverURL + "get_task_image?reduced=1&task_id=";
  tagurl = serverURL + "get_all_parent_tag_data";

  componentDidMount() {
    var toki = this.getDateRange();
    var temp = toki.split("/");
    this.getChildVS(this.props.navigation.state.params.cCode, temp[0], temp[1]);
    this.getTags();
  }

  getDateRange = () => {
    var ddd = new Date();
    var now = new Date().toISOString();
    var then = new Date(ddd.setMonth(ddd.getMonth() + 1)).toISOString();
    var d = now.split("-");
    var t = then.split("-");
    return `${d[0]}-${d[1]}/${t[0]}-${t[1]}`;
  };

  prepFilterTags = (tags) => {
    var pub = tags.public_tags;
    var pri = tags.private_tags;
    var res = [];
    if (pub != null)
      for (var i = 0; i < pub.length; i++) res = res.concat(pub[i]);
    if (pri != null)
      for (var i = 0; i < pri.length; i++) res = res.concat(pri[i]);
    return res;
  };

  getTags = () => {
    axios
      .post(this.tagurl)
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false") {
          alert(JSON.stringify(req.data.errors));
        } else if (JSON.stringify(req.data.success) == "true") {
          this.setState({
            tags: this.prepFilterTags(req.data.result),
          });
        }
      })
      .catch((error) => {});
  };

  getChildVS = (child_code, sdate, edate) => {
    axios
      .post(this.url, {
        child_id: child_code,
        start_date: sdate,
        end_date: edate,
      })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false") {
          alert(JSON.stringify(req.data.errors));
          this.setState({ refresh: false });
        } else if (JSON.stringify(req.data.success) == "true") {
          this.setState({
            VS: this.prepCalendar(req.data.result),
            VSRAW: req.data.result,
            refresh: false,
          });
        }
      })
      .catch((error) => {});
  };

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  getDate(date) {
    var temp = new Date(date);
    var rs = `${temp.getFullYear()}-${this.appendLeadingZeroes(
      temp.getMonth() + 1
    )}-${this.appendLeadingZeroes(temp.getDate())}`;
    return rs;
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
    var temp = new Date(time);
    return `${this.appendLeadingZeroes(
      temp.getHours()
    )}:${this.appendLeadingZeroes(temp.getMinutes())}`;
  };

  renderTags = (pub, pri) => {
    var res = [];
    if (pub != null) {
      var pub2 = [];
      for (var i = 0; i < pub.length; i++)
        pub2 = pub2.concat(JSON.parse(pub[i]));
      for (var i = 0; i < pub2.length; i++) {
        res = res.concat(pub2[i].name);
      }
    }
    if (pri != null) {
      var pri2 = [];
      for (var i = 0; i < pri.length; i++)
        pri2 = pri2.concat(JSON.parse(pri[i]));

      for (var i = 0; i < pri2.length; i++) {
        res = res.concat(pri2[i].name);
      }
    }
    return res;
  };

  handleConfirm(pItems) {
    var temp = "Viewing: ";
    var arr2 = [];
    for (var i = 0; i < pItems.length; i++) {
      temp += pItems[i].name + "  ";
      arr2 = arr2.concat(pItems[i].name);
      this.setState({ itemc: temp });
    }
    var v = this.state.VSRAW;
    var res = [];
    for (var j = 0; j < v.length; j++) {
      var arr1 = this.renderTags(v[j].public_tags, v[j].private_tags);
      if (arr1.some((r) => arr2.includes(r))) {
        res = res.concat(v[j]);
      }
    }
    //console.log(res);
    this.setState({ VS: this.prepCalendar(res) });
  }

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
          <CardItem bordered style={{ backgroundColor: "red" }}>
            <Tags
              readonly={true}
              initialTags={this.renderTags(task.public_tags, task.private_tags)}
              containerStyle={{ justifyContent: "center" }}
              deleteTagOnPress={false}
            />
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
          <CardItem bordered style={{ backgroundColor: "green" }}>
            <Tags
              readonly={true}
              initialTags={this.renderTags(task.public_tags, task.private_tags)}
              containerStyle={{ justifyContent: "center" }}
              deleteTagOnPress={false}
            />
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
          <CardItem bordered>
            <Tags
              readonly={true}
              initialTags={this.renderTags(task.public_tags, task.private_tags)}
              containerStyle={{ justifyContent: "center" }}
              deleteTagOnPress={false}
            />
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
          <CardItem bordered style={{ backgroundColor: "#371796" }}>
            <Tags
              readonly={true}
              initialTags={this.renderTags(task.public_tags, task.private_tags)}
              containerStyle={{ justifyContent: "center" }}
              deleteTagOnPress={false}
            />
          </CardItem>
        </Card>
      );
    }
  };

  state = {
    VS: {},
    refresh: true,
    tags: [],
    itemc: "",
    VSRAW: [],
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
        <PickerCheckBox
          data={this.state.tags}
          headerComponent={<Text style={{ fontSize: 25 }}>Tags</Text>}
          OnConfirm={(pItems) => this.handleConfirm(pItems)}
          ConfirmButtonTitle="Filter"
          DescriptionField="name"
          KeyField="tag_id"
          placeholder="Filter By Tag"
          arrowColor={Theme_color}
          arrowSize={30}
          placeholderSelectedItems={this.state.itemc}
        />
        <Agenda
          onDayPress={(d) => {
            var m = new Date().getMonth() + 1;
            var y = new Date().getUTCFullYear();
            if (d.month != m || d.year != y) {
              var s = `${d.year}-${d.month}`;
              var e = `${d.year}-${d.month + 1}`;
              this.getChildVS(this.props.navigation.state.params.cCode, s, e);
            }
          }}
          items={this.state.VS}
          renderItem={this.state.VS}
          renderEmptyData={() => {
            return <View />;
          }}
          pastScrollRange={5}
          futureScrollRange={10}
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
            var temp = this.getDateRange().split("/");
            this.getChildVS(
              this.props.navigation.state.params.cCode,
              temp[0],
              temp[1]
            );
          }}
        />
      </Container>
    );
  }
}
