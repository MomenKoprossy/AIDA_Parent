import React from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { Block, Button, Input, Text } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { HeaderHeight } from "./utils";

const { width } = Dimensions.get("window");

export class LoginView extends React.Component {
  state = {
    email: "",
    password: "",
    active: {
      email: false,
      password: false
    }
  };
  toggleActive = name => {
    const { active } = this.state;
    active[name] = !active[name];

    this.setState({ active });
  };
  render() {
    return (
      <LinearGradient
        locations={[0.1, 1]}
        colors={["#ffffff", "#e85fc8"]}
        style={{
          marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
          flex: 1,
          paddingTop: Constants.statusBarHeight
        }}
      >
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Block middle>
              <Block
                center
                style={{
                  marginTop: 250,
                  shadowColor: "#202020",
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 5
                }}
              >
                <Image source={require("../assets/logo.png")} />
              </Block>
            </Block>
            <Block flex>
              <Block center>
                <Input
                  borderless
                  color="#333435"
                  placeholder="Email"
                  type="email-address"
                  autoCapitalize="none"
                  bgColor="transparent"
                  onBlur={() => this.toggleActive("email")}
                  onFocus={() => this.toggleActive("email")}
                  onChangeText={text => this.setState({ email: text })}
                  style={[
                    styles.input,
                    this.state.active.email ? styles.inputActive : null
                  ]}
                />
                <Input
                  password
                  borderless
                  color="#333435"
                  placeholder="Password"
                  bgColor="transparent"
                  onBlur={() => this.toggleActive("password")}
                  onFocus={() => this.toggleActive("password")}
                  onChangeText={text => this.setState({ password: text })}
                  style={[
                    styles.input,
                    this.state.active.password ? styles.inputActive : null
                  ]}
                />
              </Block>
              <Block flex top style={{ marginTop: 20 }}>
                <Button
                  shadowless
                  color="#c23fc4"
                  style={{ height: 48 }}
                  onPress={() => this.handleLogin()}
                >
                  Login
                </Button>
                <Text style={{ alignSelf: "center", margin: 10 }}>
                  Dont Have an Account?
                </Text>
                <Button
                  shadowless
                  color="#c23fc4"
                  style={{ height: 48 }}
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  SignUp
                </Button>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </LinearGradient>
    );
  }
  handleLogin = () => {
    //this.loginRequest();

    this.props.navigation.navigate("DiagnosisHome");
  };
  //   loginRequest = () => {
  //     axios
  //       .post("http://192.168.1.13:8080/login/", {
  //         email: this.state.email,
  //         password: this.state.password
  //       })
  //       .then(req => alert(JSON.stringify(req.data)));
  //   };
}

const styles = StyleSheet.create({
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#727276"
  },
  inputActive: {
    borderBottomColor: "white"
  }
});
