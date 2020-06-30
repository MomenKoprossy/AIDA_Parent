import React from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
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
  Label,
  Picker
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import { serverURL, Theme_color } from "./utils";
import axios from "react-native-axios";
import DatePicker from "react-native-datepicker";

export default class ChildAddView extends React.Component {
  state = {
    cCode: "",
    fname: "",
    lname: "",
    gender: "Male",
    date: ""
  };
  
  componentDidMount() {
    this.CodeGen();
  }

  url = serverURL + "addchild";
  codeGenURL = serverURL + "generate_child_code";

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <Header style={{ backgroundColor: Theme_color }}>
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
          <KeyboardAvoidingView enabled behavior="padding">
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
                <Item
                  fixedLabel
                  picker
                  style={(styles.item, { marginLeft: 15 })}
                >
                  <Label>Gender:</Label>
                  <Picker
                    selectedValue={this.state.gender}
                    mode="dropdown"
                    onValueChange={value => this.setState({ gender: value })}
                  >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item
                      label="Prefer Not To Specify"
                      value="Not Specified"
                    />
                  </Picker>
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label style={{ marginBottom: 15, marginTop: 10 }}>
                    Date of Birth:
                  </Label>
                  <Left marginRight={20}>
                    <DatePicker
                      style={{ marginBottom: 15, marginTop: 10 }}
                      placeholder="Select Date"
                      date={this.state.date}
                      confirmBtnText="Confirm"
                      cancelBtnTestID="Cancel"
                      onDateChange={date => {
                        this.setState({ date: date });
                      }}
                    />
                  </Left>
                </Item>
              </Form>
              <View style={{ height: 60 }}></View>
              <Button
                style={{
                  backgroundColor: Theme_color,
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
          </KeyboardAvoidingView>
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
        date: this.state.date
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
