import React from "react";
import { StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import {
  Container,
  Button,
  Text,
  Header,
  Body,
  Title,
  Left,
  Right,
  Content,
  Card,
  CardItem,
  H3,
  Thumbnail,
  H2,
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { serverURL, Theme_color } from "./utils";
import axios from "react-native-axios";

export default class GetStartedView extends React.Component {
  url = serverURL + "login";
  render() {
    return (
      <Container style={styles.container}>
        <Header hasSegment style={{ backgroundColor: Theme_color }}>
          <Left></Left>
          <Body>
            <Title style={{ alignSelf: "center" }}>Welcome To AIDA!</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <ScrollView>
            <Card>
              <CardItem header>
                <Left>
                  <Thumbnail square source={require("../assets/logo.png")} />
                  <Body>
                    <H3 style={{ fontWeight: "bold", color: Theme_color }}>
                      AIDA
                    </H3>
                    <Text note>Autism Integrated Diagnosis and Assistance</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody bordered>
                <Text style={{ margin: 15 }}>
                  AIDA provides early diagnosis for the risk of autism in
                  children, In Addition to many assistance methods for autistic
                  patients.
                </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem bordered>
                <H2 style={{ fontWeight: "bold", color: Theme_color }}>
                  What exactly do we offer?
                </H2>
              </CardItem>
            </Card>
            <Card>
              <CardItem header bordered>
                <Left>
                  <Thumbnail
                    square
                    source={require("../assets/appraisal-form.png")}
                  />
                  <Body>
                    <H3 style={{ fontWeight: "bold", color: Theme_color }}>
                      Diagnosis
                    </H3>
                    <Text note>through Questionnaire and Video Analysis.</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Left>
                  <Thumbnail square source={require("../assets/support.png")} />
                  <Body>
                    <H3 style={{ fontWeight: "bold", color: Theme_color }}>
                      Assistance (AIDA Child)
                    </H3>
                    <Text note>Social Stories, Visual Schedules and AAC.</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </ScrollView>
          <Button
            style={{
              marginVertical: 20,
              backgroundColor: Theme_color,
              width: "95%",
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => this.getLogin()}
          >
            <Text>Get Started!</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  loginRequest = (email, password) => {
    axios
      .post(this.url, {
        email: email,
        password: password,
      })
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false") {
          alert(JSON.stringify(req.data.errors));
          this.props.navigation.navigate("Auth");
        } else if (JSON.stringify(req.data.success) == "true") {
          this.props.navigation.navigate("App");
        }
      })
      .catch((error) => alert(error));
  };

  getLogin = async () => {
    try {
      rero = await AsyncStorage.getItem("login");
      if (rero != null) {
        info = JSON.parse(rero);
        this.loginRequest(info.email, info.password);
      } else this.props.navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
