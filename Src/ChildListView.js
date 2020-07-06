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
} from "native-base";
import { RefreshControl, ActivityIndicator, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FloatingAction } from "react-native-floating-action";
import axios from "react-native-axios";
import { serverURL, Theme_color } from "./utils";
import { LoadingView } from "./LoadingView";
import * as FileSystem from "expo-file-system";

export default class ChildListView extends React.Component {
  state = {
    Children: [],
    refresh: true,
  };

  url = serverURL + "get_all_child_data";
  cloneurl = serverURL + "add_task";

  componentDidMount() {
    this.getChildList();
  }

  getChildList = () => {
    axios
      .post(this.url)
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          this.setState({ Children: req.data.result, refresh: false });
        }
      })
      .catch((Error) => alert(Error));
  };

  renderDate = (date) => {
    var temp = date.split("T");
    return temp[0];
  };

  renderTime = (time) => {
    var temp = time.split("T");
    var temp2 = temp[1].split(":");
    return `${temp2[0]}:${temp2[1]}`;
  };

  renderHeader = () => {
    if (this.props.navigation.state.params)
      return (
        <Header style={{ backgroundColor: Theme_color }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title> Child List </Title>
          </Body>
        </Header>
      );
    else
      return (
        <Header style={{ backgroundColor: Theme_color }}>
          <Body>
            <Title style={{ alignSelf: "center" }}> Child List </Title>
          </Body>
        </Header>
      );
  };

  render() {
    if (this.state.refresh) {
      return <LoadingView />;
    }
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        {this.renderHeader()}
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.getChildList()}
            />
          }
        >
          <ScrollView>
            {(this.state.Children || []).map((Child, index) => (
              <Card key={index}>
                <CardItem
                  button
                  onPress={() => {
                    if (this.props.navigation.state.params) {
                      if (this.props.navigation.state.params.Det) {
                        var Det = this.props.navigation.state.params.Det;
                        var data = new FormData();
                        var url = `${serverURL}get_task_image?task_id=${Det.task_id}`;

                        FileSystem.downloadAsync(
                          url,
                          FileSystem.documentDirectory
                        )
                          .then((res) => {
                            var uri = res.uri;
                            console.log(uri);

                            data.append("file", {
                              uri: uri,
                              type: `image/jpeg`,
                              name: `clone.jpeg`,
                            });
                            var fields = {
                              date: this.renderDate(Det.start_date_time),
                              time: this.renderTime(Det.start_date_time),
                              duration: Det.duration,
                              child_id: Child.child_id,
                              name: Det.name,
                              public_tags: Det.tags,
                              repeat: Det.repeat,
                            };
                            data.append("fields", JSON.stringify(fields));
                            console.log(data);

                            axios
                              .post(this.cloneurl, data, {
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                },
                              })
                              .then((req) => {
                                if (JSON.stringify(req.data.success) == "false")
                                  alert(JSON.stringify(req.data.errors));
                                else JSON.stringify(req.data.success) == "true";
                                alert("Task Cloned Successfully!");
                                this.props.navigation.pop(2);
                              })
                              .catch((error) => {
                                alert(error);
                              });
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                      } else
                        this.props.navigation.navigate(
                          this.props.navigation.state.params.next,
                          {
                            cCode: Child.child_id,
                          }
                        );
                    } else
                      this.props.navigation.navigate("CDetails", {
                        cCode: Child.child_code,
                      });
                  }}
                >
                  <Text>{Child.first_name}</Text>
                </CardItem>
              </Card>
            ))}
          </ScrollView>
        </Content>
        <FloatingAction
          onPressMain={() => this.props.navigation.navigate("CAdd")}
          animated={false}
          color={Theme_color}
          showBackground={false}
        />
      </Container>
    );
  }
}
