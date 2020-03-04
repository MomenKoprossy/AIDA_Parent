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

export default class ChildAddView extends React.Component {
  state = {
    fname: "",
    lname: "",
    country: "",
    gender: "",
    dob: ""
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
            <Title>Sign Up</Title>
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
              <Item fixedLabel style={styles.item}>
                <Label>Gender:</Label>
                <Input
                  style={styles.input}
                  editable={true}
                  onChangeText={value => this.setState({ gender: value })}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Date of Birth:</Label>
                <Input
                  style={styles.input}
                  editable={true}
                  onChangeText={value => this.setState({ email: value })}
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
            >
              <Icon name="add" />
              <Text>Add Child</Text>
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
