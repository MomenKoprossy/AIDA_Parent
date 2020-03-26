import React from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import {
  Container,
  Button,
  Text,
  Header,
  Body,
  Title,
  Left,
  Icon,
  Right,
  Content,
  Card,
  CardItem,
  H3,
  Thumbnail,
  H2
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";

export default class HomePageView extends React.Component {
  logout = async () => {
    try {
      await AsyncStorage.removeItem("login").then(() =>
        this.props.navigation.goBack()
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header hasSegment style={{ backgroundColor: "#c23fc4" }}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.logout();
              }}
            >
              <Icon name="exit" />
            </Button>
          </Left>
          <Body>
            <Title style={{ alignSelf: "center" }}>Home Page</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <ScrollView>
            <Card>
              <CardItem header>
                <Left>
                  <Thumbnail source={require("../assets/logo.png")} />
                  <Body>
                    <H3 style={{ fontWeight: "bold", color: "#c23fc4" }}>
                      AIDA
                    </H3>
                    <Text note>Autism Integrated Diagnosis and Assistance</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody bordered>
                <Text style={{ margin: 15 }}>
                  AIDA provides screening methods for parents to easily provide
                  early diagnosis for the risk of autism in their children, In
                  Addition to many assistance methods for autistic patients
                  including special tools to help guardians with their children.
                </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem bordered>
                <H2 style={{ fontWeight: "bold", color: "#c23fc4" }}>
                  What exactly do we offer?
                </H2>
              </CardItem>
            </Card>
            <Card>
              <CardItem header bordered>
                <Left>
                  <Thumbnail source={require("../assets/logo.png")} />
                  <Body>
                    <H3 style={{ fontWeight: "bold", color: "#c23fc4" }}>
                      Questionnaires
                    </H3>
                    <Text note>
                      Does my child suffer from autism? Find out by answering
                      simple questions!
                    </Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem
                button
                onPress={() => {
                  this.props.navigation.navigate("Questionnaire", {
                    ageGrp: "Adult"
                  });
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#c23fc4" }}>
                  Having doubts as an adult? Click here to take the test!
                </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Left>
                  <Thumbnail source={require("../assets/logo.png")} />
                  <Body>
                    <H3 style={{ fontWeight: "bold", color: "#c23fc4" }}>
                      Video Analysis
                    </H3>
                    <Text note>
                      "I think my child's behaviour is odd, is that autism?"
                      Dont overthink it! take a video and upload it in our
                      platform!
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Left>
                  <Thumbnail source={require("../assets/logo.png")} />
                  <Body>
                    <H3 style={{ fontWeight: "bold", color: "#c23fc4" }}>
                      fMRI Analysis
                    </H3>
                    <Text note>
                      Have an fMRI of your child? Visit our website to upload it
                      for analysis by clicking here
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Left>
                  <Thumbnail source={require("../assets/logo.png")} />
                  <Body>
                    <H3 style={{ fontWeight: "bold", color: "#c23fc4" }}>
                      AIDA Child
                    </H3>
                    <Text note>
                      Download our Child app and enjoy various Assistance
                      methods!
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Text style={{ fontWeight: "bold", color: "#c23fc4" }}>
                  Click the button below and go to child list, add you child and
                  enjoy these features!
                </Text>
              </CardItem>
            </Card>
          </ScrollView>
          <Button
            style={{
              marginVertical: 20,
              backgroundColor: "#c23fc4",
              width: "95%",
              justifyContent: "center",
              alignSelf: "center"
            }}
            onPress={() => this.props.navigation.navigate("DiagnosisHome")}
          >
            <Text>Get Started!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
});
