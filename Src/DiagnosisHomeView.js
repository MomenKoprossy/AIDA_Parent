import React from "react";
import { StyleSheet, RefreshControl, Dimensions } from "react-native";
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
  CardItem,
} from "native-base";
import Constants from "expo-constants";
import { FloatingAction } from "react-native-floating-action";
import axios from "react-native-axios";
import { serverURL, Theme_color } from "./utils";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-multicolor-progress-bar";
import { LoadingView } from "./LoadingView";

export default class DiagnosisHomeView extends React.Component {
  state = {
    refresh: true,
    activeTab: "All",
    reqs: [],
  };

  url = serverURL + "get_all_questionnaire_data";
  pdfurl = serverURL + "get_questionaire_report_pdf_app/";

  componentDidMount() {
    this.getRequests();
  }

  progObj = (res) => {
    if (res == null) return;
    else {
      var n = parseInt(res, 10);
      var val = n / 10;
      var c = "";
      var r = "";
      if (n < 6) {
        c = "green";
        r = " Not Autistic";
      } else {
        c = "red";
        r = " Autistic: Visit a Doctor";
      }
      var ret = [{ color: c, value: val, nameToDisplay: r }];
      return (
        <CardItem>
          <ProgressBar
            arrayOfProgressObjects={ret}
            parentViewStyle={{
              width: 0.86 * Dimensions.get("window").width,
            }}
            backgroundBarStyle={{ height: 20 }}
            textStyle={{ fontSize: 14 }}
          />
        </CardItem>
      );
    }
  };

  getRequests = () => {
    axios
      .post(this.url)
      .then((req) => {
        if (JSON.stringify(req.data.success) == "false") {
          alert(JSON.stringify(req.data.errors));
          this.setState({ refresh: false });
        } else if (JSON.stringify(req.data.success) == "true") {
          this.setState({ reqs: req.data.result, refresh: false });
        }
      })
      .catch((error) => alert(error));
  };

  //klaby
  getReport = (questionaire_id) => {
    axios(
      {
        url: this.pdfurl,
        method: "POST",
        data: { questionaire_id: questionaire_id },
      },
      { questionaire_id: questionaire_id }
    ).then((response) => {
      this.props.navigation.navigate("PDF", {
        stream: response.data,
      });
    });
  };

  render() {
    if (this.state.refresh) {
      return <LoadingView />;
    }
    return (
      <Container style={styles.container}>
        <Header hasSegment style={{ backgroundColor: Theme_color }}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ alignSelf: "center" }}>Diagnosis Home</Title>
          </Body>
          <Right></Right>
        </Header>
        {/* <Segment style={{ backgroundColor: Theme_color }}>
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
                  <Text>Request for Child: {Req.first_name}</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>
                      Submission Date: {Req.date.substr(0, 10)} at {Req.time}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Text>Result: {Req.result}/10</Text>
                </CardItem>
                {this.progObj(Req.result)}
              </Card>
            ))}
          </ScrollView>
        </Content>
        <FloatingAction
          actions={[
            {
              text: "Child Questionnaire",
              name: "c",
              color: Theme_color,
            },
            {
              text: "Video Analysis",
              name: "v",
              color: Theme_color,
            },
            {
              text: "Adult Questionnaire",
              name: "q",
              color: Theme_color,
            },
          ]}
          onPressItem={(name) => {
            if (name == "q")
              this.props.navigation.navigate("Questionnaire", {
                ageGrp: "Adult",
              });
            else if (name == "c")
              this.props.navigation.navigate("CList", { next: "QMain" });
            else if (name == "v")
              this.props.navigation.navigate("CList", { next: "Upload" });
          }}
          color={Theme_color}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  item: {
    margin: 8,
    fontSize: 18,
    textAlign: "center",
  },
  segbutton: {
    width: "34%",
    justifyContent: "center",
  },
});
