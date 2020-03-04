import React from "react";
import { StyleSheet, Dimensions } from "react-native";
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

export default class AccountDetailsView extends React.Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    country: "",
    age: ""
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
            <Title>Account Details</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <ScrollView>
            <Form>
              <Item fixedLabel style={styles.item}>
                <Label>First Name:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.fname}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Last Name:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.lname}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Email:</Label>
                <Input
                  type="email-address"
                  style={styles.input}
                  editable={false}
                  value={this.state.email}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Country:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.country}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Age:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.age}
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
