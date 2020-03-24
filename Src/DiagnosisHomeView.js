import React from "react";
import {
  StyleSheet,
  AsyncStorage,
  RefreshControl,
  View,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Button,
  Text,
  Header,
  Segment,
  Body,
  Title,
  Left,
  Icon,
  Right,
  Content,
  Card,
  CardItem
} from "native-base";
import Constants from "expo-constants";
import { FloatingAction } from "react-native-floating-action";
import axios from "react-native-axios";
import { serverURL } from "./utils";
import { ScrollView } from "react-native-gesture-handler";

export default class DiagnosisHomeView extends React.Component {
  state = {
    refresh: true,
    activeTab: "All",
    reqs: []
  };

  url = serverURL + "get_all_questionaire_data";
  pdfurl = serverURL + "get_questionaire_report_pdf";

  componentDidMount() {
    this.getRequests();
  }

  getRequests = () => {
    axios
      .post(this.url)
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          this.setState({ reqs: req.data.result, refresh: false });
        }
      })
      .catch(() => alert("Connection Error"));
  };

  getReport = questionaire_id => {
    axios
      .post(this.pdfurl, { questionaire_id: questionaire_id })
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          //no idea
        }
      })
      .catch(() => alert("Connection Error"));
  };

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
    if (this.state.refresh) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
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
        {/* <Segment style={{ backgroundColor: "#c23fc4" }}>
          <Button
            active={this.state.activeTab === "All"}
            onPress={() => {
              this.setState({ activeTab: "All" });
            }}
            style={styles.segbutton}
          >
            <Text style={{ fontSize: 13 }}>All</Text>
          </Button>
          <Button
            active={this.state.activeTab == "Pending"}
            onPress={() => {
              this.setState({ activeTab: "Pending" });
            }}
            style={styles.segbutton}
          >
            <Text style={{ fontSize: 13 }}>Pending</Text>
          </Button>
          <Button
            active={this.state.activeTab == "Completed"}
            onPress={() => {
              this.setState({ activeTab: "Completed" });
            }}
            style={styles.segbutton}
          >
            <Text style={{ fontSize: 13 }}>Completed</Text>
          </Button>
        </Segment> */}
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.getRequests()}
            />
          }
          padder
        >
          <ScrollView>
            {(this.state.reqs || []).map((Req, index) => (
              <Card key={index}>
                <CardItem
                  header
                  bordered
                  button
                  onPress={() => this.getReport(Req.questionaire_id)}
                >
                  <Text>Request No.{Req.questionaire_id}</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>
                      Submission Date: {Req.date.substr(0, 10)} at {Req.time}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>Result: {Req.result}/10</Text>
                  </Body>
                </CardItem>
              </Card>
            ))}
          </ScrollView>
        </Content>
        <FloatingAction
          actions={[
            {
              text: "Child List",
              name: "c",
              color: "#c23fc4"
            },
            {
              text: "Account Details",
              name: "d",
              color: "#c23fc4"
            },
            {
              text: "Adult Questionnaire",
              name: "q",
              color: "#c23fc4"
            },
            {
              text: "fMRI",
              name: "f",
              color: "#c23fc4"
            }
          ]}
          onPressItem={name => {
            if (name == "q")
              this.props.navigation.navigate("Questionnaire", {
                ageGrp: "Adult"
              });
            else if (name == "c") this.props.navigation.navigate("CList");
            else if (name == "d") this.props.navigation.navigate("Details");
            else if (name == "f")
              alert("Visit Our Website to use this feature!");
          }}
          color="#c23fc4"
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  },
  item: {
    margin: 8,
    fontSize: 18,
    textAlign: "center"
  },
  segbutton: {
    width: "34%",
    justifyContent: "center"
  }
});
