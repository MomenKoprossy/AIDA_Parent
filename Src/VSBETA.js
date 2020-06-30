import * as React from "react";
import Constants from "expo-constants";
import { Image } from "react-native";
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

export default class VSBeta extends React.Component {
  url = serverURL + "get_image";
  rewards = () => {
    var temp = [];
    temp = this.state.VS;
    var rewards = 0;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].status == "done") rewards++;
    }
    return (
      <Text style={{ marginRight: 10, color: "gold" }}>
        {rewards}/{temp.length}
      </Text>
    );
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
          <Text note style={{ color: "white" }}>
            Repeat: {task.repeat}
          </Text>
        </Body>
      );
  };

  changeStatus = (index) => {
    var temp = [];
    temp = this.state.VS;
    temp[index].status = "done";
    if (temp[index + 1] != null) temp[index + 1].status = "next";
    this.setState({ VS: temp });
    console.log(this.url);
  };

  renderTask = (task, index) => {
    if (task.status == "missed") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem bordered style={{ backgroundColor: "red" }}>
            <Left>
              <Thumbnail
                square
                source={{ uri: this.url }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <Text>Start: {task.time}</Text>
              <Text>End: {task.end}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.status == "done") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem bordered style={{ backgroundColor: "green" }}>
            <Left>
              <Thumbnail
                square
                source={{ uri: task.pic }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right>
              <H3>{task.time}</H3>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.status == "due") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem bordered>
            <Left>
              <Thumbnail
                square
                source={{ uri: this.url }}
                style={{ marginRight: 20 }}
              />
              {this.renderRepeat(task)}
            </Left>
            <Right>
              <H3>{task.time}</H3>
            </Right>
          </CardItem>
        </Card>
      );
    } else if (task.status == "next") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <CardItem bordered style={{ backgroundColor: "#371796" }}>
            <Left>
              <Body>
                <H3 style={{ color: "white" }}>{task.name}</H3>
              </Body>
              <Right>
                <H3 style={{ color: "white" }}>{task.time}</H3>
              </Right>
            </Left>
          </CardItem>
          <CardItem bordered style={{ backgroundColor: Theme_color }}>
            <Image
              source={{
                uri: "http://6c42d235ad25.ngrok.io/get_image",
              }}
              style={{ flex: 1, height: 200, width: 200 }}
            />
          </CardItem>
          <CardItem
            justifyContent="center"
            style={{ backgroundColor: "#371796" }}
          >
            <Button
              style={{
                backgroundColor: Theme_color,
                width: "60%",
                justifyContent: "center",
                alignSelf: "center",
              }}
              onPress={() => this.changeStatus(index)}
            >
              <Icon name="checkmark-circle-outline" />
              <Text>Confrim</Text>
            </Button>
          </CardItem>
        </Card>
      );
    }
  };

  state = {
    VS: [
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "7:30",
        end: "8:00",
        status: "missed",
        repeat: "Daily",
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "8:30",
        end: "9:00",
        status: "done",
        repeat: null,
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "9:30",
        end: "10:00",
        status: "next",
        repeat: null,
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "10:30",
        end: "11:00",
        status: "due",
        repeat: null,
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "7:30",
        end: "8:00",
        status: "due",
        repeat: null,
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "7:30",
        end: "8:00",
        status: "due",
        repeat: null,
      },
    ],
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
            <Title style={{ alignSelf: "center" }}> VS BETA </Title>
          </Body>
          <Right>
            {this.rewards()}
            <Icon name="star" style={{ color: "gold" }} />
          </Right>
        </Header>
        <Content>
          <ScrollView>
            {(this.state.VS || []).map((task, index) =>
              this.renderTask(task, index)
            )}
            {/* <Card style={{ marginTop: 15, marginRight: 15, marginLeft: 15 }}>
              <CardItem bordered>
                <Left>
                  <Thumbnail
                    square
                    source={require("../assets/school-bus.png")}
                    style={{ marginRight: 20 }}
                  />
                  <H3>Ride the bus</H3>
                </Left>
                <Right>
                  <H3>7.30</H3>
                </Right>
              </CardItem>
              <CardItem style={{ marginTop: 5 }}>
                <CheckBox checked={true} />
                <Text style={{ marginLeft: 20 }}>Greet the Driver</Text>
              </CardItem>
            </Card>
            <Card style={{ marginTop: 15, marginRight: 15, marginLeft: 15 }}>
              <CardItem bordered>
                <Left>
                  <Thumbnail
                    square
                    source={require("../assets/school-bus.png")}
                    style={{ marginRight: 20 }}
                  />
                  <H3>Ride the bus</H3>
                </Left>
                <Right>
                  <H3>7.30</H3>
                </Right>
              </CardItem>
              <CardItem style={{ marginTop: 5 }}>
                <CheckBox checked={true} />
                <Text style={{ marginLeft: 20 }}>Greet the Driver</Text>
              </CardItem>
            </Card> */}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
