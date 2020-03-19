import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  Container,
  Button,
  Header,
  Body,
  Title,
  Left,
  Icon,
  Content,
  Form,
  Item,
  Label
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import axios from "react-native-axios";
import { serverURL } from "./utils";
import { FloatingAction } from "react-native-floating-action";

export default class ChildDetailsView extends React.Component {
  state = {
    cDet: {}
  };

  url = serverURL + "get_child_data";
  rmurl = serverURL + "remove_child";

  removeRequest = child_code => {
    axios
      .post(this.rmurl, { child_code: child_code })
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          alert("Child Removed Successfully");
          this.props.navigation.goBack();
        }
      })
      .catch(() => alert("Connection Error"));
  };

  childDetails = child_code => {
    axios
      .post(this.url, { child_code: child_code })
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          this.setState({ cDet: req.data.result });
        }
      })
      .catch(() => alert("Connection Error"));
  };

  componentDidMount() {
    this.childDetails(this.props.navigation.state.params.cCode);
  }

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
            <Title>Child Details</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <ScrollView>
            <Form>
              <Item fixedLabel style={styles.item}>
                <Label>Child Code:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.cDet.child_code}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>First Name:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.cDet.first_name}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Last Name:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.cDet.last_name}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Gender:</Label>
                <Input
                  style={styles.input}
                  editable={false}
                  value={this.state.cDet.gender}
                />
              </Item>
            </Form>
          </ScrollView>
        </Content>
        <FloatingAction
          actions={[
            {
              text: "Edit Child",
              name: "e",
              color: "#c23fc4"
            },
            {
              text: "Submit Questionnaire",
              name: "q",
              color: "#c23fc4"
            },
            {
              text: "Video Analysis",
              name: "va",
              color: "#c23fc4"
            },
            {
              text: "Visual Schedules",
              name: "vs",
              color: "#c23fc4"
            },
            {
              text: "Remove Child",
              name: "r",
              color: "#ff0000"
            }
          ]}
          onPressItem={name => {
            if (name == "q")
              this.props.navigation.navigate("QMain", {
                cCode: this.state.cDet.child_code
              });
            else if (name == "va")
              this.props.navigation.navigate("Upload", {
                cCode: this.state.cDet.child_code
              });
            //else if (name == "vs") this.props.navigation.navigate("Visual Schedule");
            else if (name == "e")
              this.props.navigation.navigate("CEdit", {
                cCode: this.state.cDet.child_code
              });
            else if (name == "r")
              this.removeRequest(this.state.cDet.child_code);
          }}
          color="#c23fc4"
        />
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
