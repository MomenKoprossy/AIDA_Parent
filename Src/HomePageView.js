import React, { Component } from "react";
import { StyleSheet, Image, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Button,
  Title,
  Content,
  Text,
  Icon,
  Right,
} from "native-base";
import Constants from "expo-constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Theme_color } from "./utils";

export default class HomePageView extends Component {
  logout = async () => {
    try {
      await AsyncStorage.removeItem("login").then(() =>
        this.props.navigation.navigate("Auth")
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <Header style={{ backgroundColor: Theme_color }}>
          <Body>
            <Title style={{ alignSelf: "center" }}>Home Page</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <ScrollView>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("DiagnosisHome")}
            >
              <Image
                source={require("../assets/appraisal-form.png")}
                style={{
                  marginBottom: 10,
                  width: 80,
                  height: 80,
                  marginStart: 15,
                }}
              />
              <Button
                rounded
                style={{
                  backgroundColor: Theme_color,
                  justifyContent: "center",
                }}
              >
                <Text>Diagnosis</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("CList", {
                  next: "CVS",
                })
              }
            >
              <Image
                source={require("../assets/calendar.png")}
                style={{
                  marginBottom: 10,
                  width: 80,
                  height: 80,
                  marginStart: 40,
                }}
              />
              <Button
                rounded
                style={{
                  backgroundColor: Theme_color,
                  justifyContent: "center",
                }}
                onPress={() =>
                  this.props.navigation.navigate("CList", {
                    next: "CVS",
                  })
                }
              >
                <Text>Visual Scheduling</Text>
              </Button>
            </TouchableOpacity>
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
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    marginBottom: 50,
    alignSelf: "center",
  },
  icon: {
    marginBottom: 10,
    width: 80,
    height: 80,
  },
});
