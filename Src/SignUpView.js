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
  Label,
  H1,
  Picker
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import { serverURL } from "./utils";
import axios from "react-native-axios";

export class SignUpView extends React.Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    country: "",
    gender: "",
    d: "",
    m: "",
    y: "",
    pw: "",
    cpw: ""
  };

  url = serverURL + "signup";

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
              <H1>Guardian Details ONLY!</H1>
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
                <Label>Email:</Label>
                <Input
                  type="email-address"
                  style={styles.input}
                  editable={true}
                  onChangeText={value => this.setState({ email: value })}
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
              <Item fixedLabel picker style={(styles.item, { marginLeft: 15 })}>
                <Label>Gender:</Label>
                <Picker
                  selectedValue={this.state.gender}
                  mode="dropdown"
                  onValueChange={value => this.setState({ gender: value })}
                >
                  <Picker.Item label="Male" value="M" />
                  <Picker.Item label="Female" value="F" />
                  <Picker.Item label="Apache Helicopter" value="Sad" />
                </Picker>
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
                <Label>Password:</Label>
                <Input
                  password
                  style={styles.input}
                  editable={true}
                  onChangeText={value => this.setState({ pw: value })}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Confirm Password:</Label>
                <Input
                  password
                  style={styles.input}
                  editable={true}
                  onChangeText={value => this.setState({ cpw: value })}
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
              onPress={() => this.signUpRequest()}
            >
              <Icon name="checkmark-circle-outline" />
              <Text>Sign Up!</Text>
            </Button>
          </ScrollView>
        </Content>
      </Container>
    );
  }
  checkPass = () => {
    if (this.state.cpw != this.state.pw) alert("Password Doesnt Match");
  };
  signUpRequest = () => {
    axios
      .post(this.url, {
        first_name: this.state.fname,
        last_name: this.state.lname,
        email: this.state.email,
        password: this.state.pw,
        gender: this.state.gender,
        country: this.state.country,
        year: this.state.y,
        month: this.state.m,
        day: this.state.d
      })
      .then(req => {
        alert(JSON.stringify(req.data.success));
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else {
          alert("Signed Up Successfully! Now Login");
          this.props.navigation.goBack();
        }
      })
      .catch(() => alert("Connection Error"));
  };
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