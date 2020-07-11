import * as React from "react";
import Constants from "expo-constants";
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

export default class CollisionOptions extends React.Component {
  picurl = serverURL + "get_task_image?reduced=1&task_id=";

  componentDidMount() {
    alert("Collision Detected!", "Click on the task to modify/delete it");
  }

  renderTime = (time) => {
    var temp = time.split("T");
    var temp2 = temp[1].split(":");
    return `${temp2[0]}:${temp2[1]}`;
  };

  renderTask = (task) => {
    return (
      <Card
        style={{
          marginTop: 10,
          marginRight: 10,
          marginLeft: 10,
        }}
        button
        onPress={() => {
          this.props.navigation.navigate("TDetails", {
            info: task,
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
            <Body>
              <H3>{task.name}</H3>
            </Body>
          </Left>
          <Right style={{ flexDirection: "column" }}>
            <Text>Start: {this.renderTime(task.start_date_time)}</Text>
            <Text>End: {this.renderTime(task.end_date_time)}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  };

  state = {
    VS: this.props.navigation.state.params.cTasks,
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
        </Header>
        <Content>
          <ScrollView>
            {(this.state.VS || []).map((task, index) => this.renderTask(task))}
          </ScrollView>
          <Button
            style={{
              backgroundColor: Theme_color,
              marginTop: 20,
              width: "60%",
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={}
          >
            <Icon name="close" />
            <Text>Done</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
