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
  Picker
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import { serverURL } from "./utils";
import axios from "react-native-axios";

export default class ChildAddView extends React.Component {
  state = {
    cCode: "",
    fname: "",
    lname: "",
    gender: "",
    y: "",
    m: "",
    d: ""
  };
  componentDidMount() {
    this.CodeGen();
  }

  url = serverURL + "addchild";
  codeGenURL = serverURL + "generate_child_code";

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
            <Title>Add Child</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <ScrollView>
            <Form>
              <Item fixedLabel style={styles.item}>
                <Label>Child Code:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  placeholder={this.state.cCode}
                />
              </Item>
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
            </Form>
            <Button
              style={{
                backgroundColor: "#c23fc4",
                width: "60%",
                justifyContent: "center",
                alignSelf: "center"
              }}
              onPress={() => this.addChildRequest()}
            >
              <Icon name="add" />
              <Text>Add Child</Text>
            </Button>
          </ScrollView>
        </Content>
      </Container>
    );
  }

  CodeGen = () => {
    axios.post(this.codeGenURL).then(req => {
      this.setState({ cCode: req.data.child_code });
    });
  };

  addChildRequest = () => {
    axios
      .post(this.url, {
        child_code: this.state.cCode,
        first_name: this.state.fname,
        last_name: this.state.lname,
        gender: this.state.gender,
        year: this.state.y,
        month: this.state.m,
        day: this.state.d
      })
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          alert("Child Added Successfully!");
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
