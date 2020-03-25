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
  H1,
  Picker
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import { serverURL } from "./utils";
import axios from "react-native-axios";
import CountryPicker from "react-native-country-picker-modal";
import DatePicker from "react-native-datepicker";

export class SignUpView extends React.Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    country: "",
    gender: "",
    date: "",
    pw: "",
    cpw: "",
    countryCode: ""
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
          <KeyboardAvoidingView enabled behavior="padding">
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
                  <Label style={{ marginBottom: 15 }}>Country:</Label>
                  <Left marginRight={20} style={{ marginBottom: 15 }}>
                    <CountryPicker
                      onSelect={country =>
                        this.setState({
                          country: country.name,
                          countryCode: country.cca2
                        })
                      }
                      withFilter={true}
                      withAlphaFilter={true}
                      withCountryNameButton={true}
                      countryCode={this.state.countryCode}
                    />
                  </Left>
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
                <View style={{ height: 60 }}></View>
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
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }

  signUpRequest = () => {
    if (this.state.cpw == this.state.pw) {
      axios
        .post(this.url, {
          first_name: this.state.fname,
          last_name: this.state.lname,
          email: this.state.email,
          password: this.state.pw,
          gender: this.state.gender,
          country: this.state.country,
          date: this.state.date
        })
        .then(req => {
          if (JSON.stringify(req.data.success) == "false")
            alert(JSON.stringify(req.data.errors));
          else if (JSON.stringify(req.data.success) == "true") {
            alert("Signed Up Successfully! Now Login");
            this.props.navigation.goBack();
          }
        })
        .catch(() => alert("Connection Error"));
    } else alert("Passwords Doesnt Match");
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
