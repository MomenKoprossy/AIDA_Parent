import * as React from "react";
import Constants from "expo-constants";
import {
  Container,
  Header,
  Body,
  Button,
  Title,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Icon
} from "native-base";
import { RefreshControl, ActivityIndicator, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FloatingAction } from "react-native-floating-action";
import axios from "react-native-axios";
import { serverURL } from "./utils";
import { LoadingView } from "./LoadingView";

export default class VSListView extends React.Component {
  state = {
    VS: [],
    refresh: true
  };

  //url = serverURL + "get_all_VSs_data";

  // componentDidMount() {
  //   this.getVSsList();
  // }

  // getVSsList = () => {
  //   axios
  //     .post(this.url)
  //     .then(req => {
  //       if (JSON.stringify(req.data.success) == "false")
  //         alert(JSON.stringify(req.data.errors));
  //       else if (JSON.stringify(req.data.success) == "true") {
  //         this.setState({ VSsren: req.data.result, refresh: false });
  //       }
  //     })
  //     .catch(Error => alert(Error));
  // };

  renderButton = () => {
    if (this.state.VS != [])
      return (
        <Button
          style={{
            backgroundColor: "#c23fc4",
            width: "60%",
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          <Icon name="checkmark-circle-outline" />
          <Text>Confrim</Text>
        </Button>
      );
  };

  render() {
    // if (this.state.refresh) {
    //   return <LoadingView />;
    // }
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <Header style={{ backgroundColor: "#c23fc4" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Visual Schedules</Title>
          </Body>
        </Header>
        <Content
        // refreshControl={
        //   <RefreshControl
        //     refreshing={this.state.refresh}
        //     onRefresh={() => this.getVSsList()}
        //   />
        // }
        >
          <ScrollView>
            {(this.state.VS || []).map((VSs, index) => (
              <Card key={index}>
                <CardItem
                  button
                  onPress={() => {
                    this.props.navigation.navigate("VSDetails", {
                      //cCode: VSs.VSs_code
                    });
                  }}
                >
                  <Text>{VSs.first_name}</Text>
                </CardItem>
              </Card>
            ))}
          </ScrollView>
          {this.renderButton()}
        </Content>
        <FloatingAction
          actions={[
            {
              text: "Create Visual Schedule",
              name: "c",
              color: "#c23fc4"
            },
            {
              text: "Add From Presets",
              name: "p",
              color: "#c23fc4"
            }
          ]}
          onPressItem={name => {
            if (name == "c")
              this.props.navigation.navigate("CreateVS", {
                //cCode: this.state.cDet.VSs_code
              });
            else if (name == "p")
              this.props.navigation.navigate("VSPresets", {
                //cCode: this.state.cDet.VSs_code
              });
          }}
          color="#c23fc4"
        />
      </Container>
    );
  }
}
