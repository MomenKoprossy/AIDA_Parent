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
  Icon
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { FloatingAction } from "react-native-floating-action";
import axios from "react-native-axios";
import { serverURL } from "./utils";

export default class ChildListView extends React.Component {
  state = {
    Children: []
  };

  url = serverURL + "get_all_child_data";

  componentDidMount() {
    axios
      .post(this.url)
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          this.setState({ Children: req.data.result });
        }
      })
      .catch(Error => alert(Error));
  }

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
            <Title> Child List </Title>
          </Body>
        </Header>
        <Content>
          <ScrollView>
            {(this.state.Children || []).map((Child, index) => (
              <Card key={index}>
                <CardItem
                  button
                  onPress={() =>
                    this.props.navigation.navigate("CDetails", {
                      cCode: Child.child_code
                    })
                  }
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
          color="#c23fc4"
          showBackground={false}
        />
      </Container>
    );
  }
}
