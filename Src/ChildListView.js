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
import { ScrollView } from "react-native-gesture-handler";
import { FloatingAction } from "react-native-floating-action";

export default class ChildListView extends React.Component {
  state = {
    Children: ["autistic child 1", "autistic child 2", "autistic child 3"]
  };

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
            <Title> Child List </Title>
          </Body>
        </Header>
        <Content>
          <ScrollView>
            {(this.state.Children || []).map((Child, index) => (
              <Card key={index}>
                <CardItem>
                  <Text>{Child}</Text>
                </CardItem>
              </Card>
            ))}
          </ScrollView>
        </Content>
        <FloatingAction
          onPressMain={() => this.props.navigation.navigate("CAdd")}
          animated={false}
          color="#c23fc4"
          showBackground={false}
        />
      </Container>
    );
  }
}
