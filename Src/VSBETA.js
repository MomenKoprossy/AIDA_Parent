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
  Icon,
  Thumbnail,
  Right,
  H3,
  ListItem,
  CheckBox,
  List
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

export default class VSBeta extends React.Component {
  state = {};

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <Header style={{ backgroundColor: "#c23fc4" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title> Visual Schedule BETA </Title>
          </Body>
        </Header>
        <Content>
          <ScrollView>
            <Card style={{ marginTop: 15, marginRight: 15, marginLeft: 15 }}>
              <CardItem bordered>
                <Left>
                  <Thumbnail
                    square
                    source={require("../assets/school-bus.png")}
                    style={{ marginRight: 20 }}
                  />
                  <H3>Ride the bus</H3>
                </Left>
                <Right>
                  <H3>7.30</H3>
                </Right>
              </CardItem>
              <CardItem style={{ marginTop: 5 }}>
                <CheckBox checked={true} />
                <Text style={{ marginLeft: 20 }}>Greet the Driver</Text>
              </CardItem>
            </Card>
            <Card style={{ marginTop: 15, marginRight: 15, marginLeft: 15 }}>
              <CardItem bordered>
                <Left>
                  <Thumbnail
                    square
                    source={require("../assets/school-bus.png")}
                    style={{ marginRight: 20 }}
                  />
                  <H3>Ride the bus</H3>
                </Left>
                <Right>
                  <H3>7.30</H3>
                </Right>
              </CardItem>
              <CardItem style={{ marginTop: 5 }}>
                <CheckBox checked={true} />
                <Text style={{ marginLeft: 20 }}>Greet the Driver</Text>
              </CardItem>
            </Card>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
