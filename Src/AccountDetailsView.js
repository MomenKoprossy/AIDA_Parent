import React from "react";
import {
  StyleSheet,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
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
  Label
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import axios from "react-native-axios";
import { serverURL } from "./utils";
import DatePicker from "react-native-datepicker";
import { LoadingView } from "./LoadingView";

export default class AccountDetailsView extends React.Component {
  state = {
    Det: {},

    refresh: true,

    fname: null,
    lname: null,
    date: null,
    pw: null,
    cpw: null
  };

  url = serverURL + "get_user_data";
  eurl = serverURL + "modifi_user_data";

  sendEdit = () => {
    var edit = {};
    this.state.fname != this.state.Det.first_name && this.state.fname != null
      ? (edit.firstname = this.state.fname)
      : null;
    this.state.pw != this.state.Det.password && this.state.pw != null
      ? (edit.password = this.state.pw)
      : null;
    this.state.lname != this.state.Det.last_name && this.state.lname != null
      ? (edit.lastname = this.state.lname)
      : null;
    this.state.date != this.state.Det.birth_date && this.state.date != null
      ? (edit.date = this.state.date)
      : null;
    if (this.state.pw == this.state.cpw) {
      axios
        .post(this.eurl, edit)
        .then(req => {
          if (JSON.stringify(req.data.success) == "false")
            alert(JSON.stringify(req.data.errors));
          else if (JSON.stringify(req.data.success) == "true") {
            alert("Account Edited Successfully");
            this.props.navigation.goBack();
          }
        })
        .catch(() => alert("Connection Error"));
    } else {
      alert("Password Doesnt Match");
    }
  };

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
      return <LoadingView />;
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
              onRefresh={() => {
                this.getDetails();
                this.setState({
                  fname: null,
                  lname: null,
                  date: null,
                  pw: null,
                  cpw: null
                });
              }}
            />
          }
          contentContainerStyle={styles.container}
        >
          <KeyboardAvoidingView enabled behavior="padding">
            <ScrollView>
              <Form>
                <Item fixedLabel style={styles.item}>
                  <Label>First Name:</Label>
                  <Input
                    style={styles.input}
                    editable={true}
                    value={
                      this.state.fname == null
                        ? this.state.Det.first_name
                        : this.state.fname
                    }
                    onChangeText={val => this.setState({ fname: val })}
                  />
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label>Last Name:</Label>
                  <Input
                    style={styles.input}
                    editable={true}
                    value={
                      this.state.lname == null
                        ? this.state.Det.last_name
                        : this.state.lname
                    }
                    onChangeText={val => this.setState({ lname: val })}
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
                <Item fixedLabel style={styles.item}>
                  <Label>Gender:</Label>
                  <Input
                    style={styles.input}
                    editable={false}
                    value={this.state.Det.gender}
                  />
                </Item>
                <Item fixedLabel style={styles.item}>
                  <Label style={{ marginBottom: 15, marginTop: 10 }}>
                    Date of Birth:
                  </Label>
                  <Left marginRight={20}>
                    <DatePicker
                      style={{ marginBottom: 15, marginTop: 10 }}
                      date={
                        this.state.date == null
                          ? this.state.Det.Birth_Date
                          : this.state.date
                      }
                      confirmBtnText="Confirm"
                      cancelBtnTestID="Cancel"
                      onDateChange={date => {
                        this.setState({ date: date });
                      }}
                    />
                  </Left>
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
                <Item fixedLabel style={styles.item}>
                  <Label>Confirm Password:</Label>
                  <Input
                    password
                    style={styles.input}
                    editable={true}
                    onChangeText={value => this.setState({ cpw: value })}
                  />
                </Item>
                <View style={{ height: 60 }}></View>
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
                <Text>Edit</Text>
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
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
