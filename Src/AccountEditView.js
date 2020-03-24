import React from "react";
import {
  StyleSheet,
  Dimensions,
  RefreshControl,
  ActivityIndicator
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
import { serverURL } from "./utils";
import axios from "react-native-axios";

export default class AccountEditView extends React.Component {
  state = {
    fname: "",
    lname: "",
    country: "",
    pw: "",
    d: "",
    m: "",
    y: ""
  };

  url = serverURL + "modifi_user_data";

  sendEdit = () => {
    edit = {};
    this.state.fname != "" ? (edit.firstname = this.state.fname) : null;
    this.state.pw != "" ? (edit.password = this.state.pw) : null;
    this.state.lname != "" ? (edit.lastname = this.state.lname) : null;
    this.state.country != "" ? (edit.country = this.state.country) : null;
    this.state.d != "" && this.state.m != "" && this.state.y != ""
      ? (edit.date = this.state.y + "-" + this.state.m + "-" + this.state.d)
      : null;
    axios
      .post(this.url, edit)
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          alert("Account Edited Successfully");
          this.props.navigation.goBack();
        }
      })
      .catch(() => alert("Connection Error"));
  };

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <Header style={{ backgroundColor: "#c23fc4" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edit</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <ScrollView>
            <Form>
              <Item fixedLabel style={styles.item}>
                <Label>First Name:</Label>
                <Input
                  style={styles.input}
                  editable={true}
                  onChangeText={value => this.setState({ fname: value })}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Last Name:</Label>
                <Input
                  style={styles.input}
                  editable={true}
                  onChangeText={value => this.setState({ lname: value })}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Country:</Label>
                <Input
                  style={styles.input}
                  editable={true}
                  onChangeText={value => this.setState({ country: value })}
                />
              </Item>
              <Item fixedLabel style={(styles.item, { flexDirection: "row" })}>
                <Label>Date of Birth:</Label>
                <Input
                  type="number-pad"
                  placeholder="DD"
                  style={{
                    width: 0.15 * Dimensions.get("window").width,
                    marginRight: 15
                  }}
                  editable={true}
                  onChangeText={value => this.setState({ d: value })}
                />
                <Input
                  type="number-pad"
                  placeholder="MM"
                  style={{
                    width: 0.15 * Dimensions.get("window").width,
                    marginRight: 15
                  }}
                  editable={true}
                  onChangeText={value => this.setState({ m: value })}
                />
                <Input
                  placeholder="YYYY"
                  type="number-pad"
                  style={{
                    width: 0.2 * Dimensions.get("window").width,
                    marginRight: 15
                  }}
                  editable={true}
                  onChangeText={value => this.setState({ y: value })}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>New Password:</Label>
                <Input
                  password
                  style={styles.input}
                  editable={true}
                  onChangeText={value => this.setState({ pw: value })}
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
              onPress={() => this.sendEdit()}
            >
              <Icon name="checkmark-circle-outline" />
              <Text>Confrim</Text>
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
