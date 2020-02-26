import React from "react";
import { StyleSheet } from "react-native";
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

export default class DiagnosisHomeView extends React.Component {
  state = {
    activeTab: "All"
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header hasSegment style={{ backgroundColor: "#c23fc4" }}>
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
            <Title style={{ alignSelf: "center" }}>Home Page</Title>
          </Body>
          <Right></Right>
        </Header>
        <Segment style={{ backgroundColor: "#c23fc4" }}>
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
        </Segment>
        <Content padder>
          <Card>
            <CardItem
              header
              bordered
              button
              onPress={() => alert("Request Clicked")}
            >
              <Text>Reqest No.123154</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Autism Lord</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <FloatingAction
          actions={[
            {
              text: "Questionnaire",
              name: "q",
              color: "#c23fc4"
            },
            {
              text: "Video Analysis",
              name: "v",
              color: "#c23fc4"
            },
            {
              text: "fMRI",
              name: "f",
              color: "#c23fc4"
            }
          ]}
          onPressItem={name => {
            if (name == "q") this.props.navigation.navigate("Questionnaire");
            else if (name == "v") this.props.navigation.navigate("Upload");
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
