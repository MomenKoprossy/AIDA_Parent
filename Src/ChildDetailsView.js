import React from "react";
import { StyleSheet, Dimensions, RefreshControl } from "react-native";
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
  Label,
  Text
} from "native-base";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "galio-framework";
import axios from "react-native-axios";
import { serverURL, Theme_color } from "./utils";
import { FloatingAction } from "react-native-floating-action";
import DatePicker from "react-native-datepicker";
import { LoadingView } from "./LoadingView";

export default class ChildDetailsView extends React.Component {
  state = {
    cDet: {},

    refresh: true,

    fname: null,
    lname: null,
    date: null
  };

  url = serverURL + "get_child_data";
  rmurl = serverURL + "remove_child";

  eurl = serverURL + "modifi_child_data";

  sendEdit = () => {
    var edit = { child_code: this.props.navigation.state.params.cCode };
    this.state.fname != this.state.cDet.first_name && this.state.fname != null
      ? (edit.firstname = this.state.fname)
      : null;
    this.state.lname != this.state.cDet.last_name && this.state.lname != null
      ? (edit.lastname = this.state.lname)
      : null;
    this.state.date != this.state.cDet.Birth_Date && this.state.date != null
      ? (edit.date = this.state.date)
      : null;
    axios
      .post(this.eurl, edit)
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          alert("Child Edited Successfully");
          this.props.navigation.goBack();
        }
      })
      .catch(() => alert("Connection Error"));
  };

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
          this.setState({ cDet: req.data.result, refresh: false });
        }
      })
      .catch(() => alert("Connection Error"));
  };

  componentDidMount() {
    this.childDetails(this.props.navigation.state.params.cCode);
  }

  render() {
    if (this.state.refresh) {
      return <LoadingView />;
    }
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <Header style={{ backgroundColor: Theme_color }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Child Details</Title>
          </Body>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.childDetails(this.props.navigation.state.params.cCode);
                this.setState({ fname: null, lname: null, date: null });
              }}
            />
          }
          contentContainerStyle={styles.container}
        >
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
                  editable={true}
                  value={
                    this.state.fname == null
                      ? this.state.cDet.first_name
                      : this.state.fname
                  }
                  onChangeText={val => this.setState({ fname: val })}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Last Name:</Label>
                <Input
                  style={styles.input}
                  editable={true}
                  value={
                    this.state.lname == null
                      ? this.state.cDet.last_name
                      : this.state.lname
                  }
                  onChangeText={val => this.setState({ lname: val })}
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
              <Item fixedLabel style={styles.item}>
                <Label style={{ marginBottom: 15, marginTop: 10 }}>
                  Date of Birth:
                </Label>
                <Left marginRight={20}>
                  <DatePicker
                    style={{ marginBottom: 15, marginTop: 10 }}
                    date={
                      this.state.date == null
                        ? this.state.cDet.Birth_Date
                        : this.state.date
                    }
                    confirmBtnText="Confirm"
                    cancelBtnTestID="Cancel"
                    onDateChange={date => {
                      this.setState({ date: date });
                    }}
                  />
                </Left>
              </Item>
            </Form>
          </ScrollView>
          <Button
            style={{
              backgroundColor: Theme_color,
              width: "60%",
              justifyContent: "center",
              alignSelf: "center"
            }}
            onPress={() => this.sendEdit()}
          >
            <Icon name="checkmark-circle-outline" />
            <Text>Confrim</Text>
          </Button>
          <Button
            danger
            style={{
              marginTop: 20,
              width: "60%",
              justifyContent: "center",
              alignSelf: "center"
            }}
            onPress={() => this.removeRequest(this.state.cDet.child_code)}
          >
            <Icon name="close" />
            <Text>Remove Child</Text>
          </Button>
        </Content>
        {/* <FloatingAction
          actions={[
            {
              text: "Submit Questionnaire",
              name: "q",
              color: Theme_color
            },
            {
              text: "Video Analysis",
              name: "va",
              color: Theme_color
            },
            {
              text: "Visual Schedules",
              name: "vs",
              color: Theme_color
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
            else if (name == "r")
              this.removeRequest(this.state.cDet.child_code);
          }}
          color=Theme_color
        /> */}
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
