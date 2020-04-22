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
  H3
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

export default class VSBeta extends React.Component {
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

  changeStatus = index => {
    var temp = [];
    temp = this.state.VS;
    temp[index].status = "done";
    if (temp[index + 1] != null) temp[index + 1].status = "next";
    this.setState({ VS: temp });
  };

  renderTask = (task, index) => {
    if (task.status == "missed") {
      return (
        <Card
          key={index}
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10
          }}
        >
          <CardItem bordered style={{ backgroundColor: "red" }}>
            <Left>
              <Thumbnail
                square
                source={{ uri: task.pic }}
                style={{ marginRight: 20 }}
              />
              <H3>{task.name}</H3>
            </Left>
            <Right>
              <H3>{task.time}</H3>
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
            marginLeft: 10
          }}
        >
          <CardItem bordered style={{ backgroundColor: "green" }}>
            <Left>
              <Thumbnail
                square
                source={{ uri: task.pic }}
                style={{ marginRight: 20 }}
              />
              <H3>{task.name}</H3>
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
            marginLeft: 10
          }}
        >
          <CardItem bordered>
            <Left>
              <Thumbnail
                square
                source={{ uri: task.pic }}
                style={{ marginRight: 20 }}
              />
              <H3>{task.name}</H3>
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
            marginLeft: 10
          }}
        >
          <CardItem bordered style={{ backgroundColor: "#c23fc4" }}>
            <Left>
              <Body>
                <H3 style={{ color: "white" }}>{task.name}</H3>
              </Body>
              <Right>
                <H3 style={{ color: "white" }}>{task.time}</H3>
              </Right>
            </Left>
          </CardItem>
          <CardItem bordered style={{ backgroundColor: "#fa66da" }}>
            <Image
              source={{
                uri: task.pic,
                flex: 1,
                height: 200,
                width: "100%"
              }}
            />
          </CardItem>
          <CardItem
            justifyContent="center"
            style={{ backgroundColor: "#fa66da" }}
          >
            <Button
              style={{
                backgroundColor: "#c23fc4",
                width: "60%",
                justifyContent: "center",
                alignSelf: "center"
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
        status: "missed"
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "8:30",
        status: "done"
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "9:30",
        status: "next"
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "10:30",
        status: "due"
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "11:30",
        status: "due"
      },
      {
        name: "Ride School Bus",
        pic:
          "https://i.pinimg.com/originals/95/e3/65/95e365705c7a7b977b74a182f89c7ca9.png",
        time: "12:30",
        status: "due"
      }
    ]
  };

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <Header style={{ backgroundColor: "#c23fc4" }}>
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
