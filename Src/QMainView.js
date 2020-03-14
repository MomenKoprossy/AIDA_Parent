import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Button,
  Title,
  Content,
  Text,
  Icon
} from "native-base";
import Constants from "expo-constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default class QMainView extends Component {
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
            <Title>Questionnaires</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <ScrollView>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Questionnaire", {
                  ageGrp: "Toddler"
                })
              }
            >
              <Image
                source={require("../assets/child.png")}
                style={{
                  marginBottom: 10,
                  width: 80,
                  height: 80,
                  marginStart: 6
                }}
              />
              <Button
                rounded
                style={{ backgroundColor: "#c23fc4", justifyContent: "center" }}
              >
                <Text>Toddler</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("Questionnaire", {
                  ageGrp: "Child"
                });
              }}
            >
              <Image
                source={require("../assets/avatar.png")}
                style={{
                  marginBottom: 10,
                  width: 80,
                  height: 80,
                  marginStart: 7
                }}
              />
              <Button
                rounded
                style={{ backgroundColor: "#c23fc4", justifyContent: "center" }}
              >
                <Text>Child</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Questionnaire", {
                  ageGrp: "Adolescent"
                })
              }
            >
              <Image
                source={require("../assets/teen.png")}
                style={{
                  marginBottom: 10,
                  width: 80,
                  height: 80,
                  marginStart: 18
                }}
              />
              <Button
                rounded
                style={{ backgroundColor: "#c23fc4", justifyContent: "center" }}
              >
                <Text>Adolescent</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Questionnaire", {
                  ageGrp: "Adult"
                })
              }
            >
              <Image
                source={require("../assets/adult.png")}
                style={{
                  marginBottom: 10,
                  width: 80,
                  height: 80,
                  marginStart: 9
                }}
              />
              <Button
                rounded
                style={{ backgroundColor: "#c23fc4", justifyContent: "center" }}
              >
                <Text>Adult</Text>
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
    justifyContent: "center"
  },
  button: {
    marginBottom: 50,
    alignSelf: "center"
  },
  icon: {
    marginBottom: 10,
    width: 80,
    height: 80
  }
});
