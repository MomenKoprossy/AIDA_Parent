import React from "react";
import {
  StyleSheet,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  View
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
  Label
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import axios from "react-native-axios";
import { serverURL } from "./utils";

export default class AccountDetailsView extends React.Component {
  state = {
    Det: {},
    refresh: true
  };

  url = serverURL + "get_user_data";

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    axios
      .post(this.url)
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          this.setState({ Det: req.data.result, refresh: false });
        }
      })
      .catch(() => alert("Connection Error"));
  };

  render() {
    if (this.state.refresh) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <Header style={{ backgroundColor: "#c23fc4" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Account Details</Title>
          </Body>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.getDetails()}
            />
          }
          contentContainerStyle={styles.container}
        >
          <ScrollView>
            <Form>
              <Item fixedLabel style={styles.item}>
                <Label>First Name:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.Det.first_name}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Last Name:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.Det.last_name}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Email:</Label>
                <Input
                  type="email-address"
                  style={styles.input}
                  editable={false}
                  value={this.state.Det.email}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Country:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.Det.country}
                />
              </Item>
            </Form>
            <Button
              style={{
                backgroundColor: "#c23fc4",
                width: "60%",
                justifyContent: "center",
                alignSelf: "center"
              }}
              onPress={() => this.props.navigation.navigate("Edit")}
            >
              <Icon name="create" />
              <Text>Edit</Text>
            </Button>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 10
  },
  input: {
    width: 0.65 * Dimensions.get("window").width
  },
  item: {
    margin: 8,
    fontSize: 18,
    textAlign: "center"
  }
});
