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
  H3,
  Text,
  Left,
  ListItem,
  Radio,
  Icon
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

export default class QuestionnaireView extends React.Component {
  state = {
    Questions: [
      { Q: "Are you autistic?", A: "Never" },
      { Q: "How autistic are you?", A: "Never" }
    ]
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
            <Title> Questionnaire </Title>
          </Body>
        </Header>
        <Content>
          <ScrollView>
            {(this.state.Questions || []).map((Ques, index) => (
              <Card key={index}>
                <CardItem>
                  <H3>
                    {index + 1}. {Ques.Q}
                  </H3>
                </CardItem>
                <CardItem
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <ListItem>
                    <Radio
                      selected={Ques.A == "Never"}
                      onPress={() => this.Select(index, "Never")}
                    />
                    <Text> Never</Text>
                  </ListItem>
                  <ListItem>
                    <Radio
                      selected={Ques.A == "Rarely"}
                      onPress={() => this.Select(index, "Rarely")}
                    />
                    <Text> Rarely</Text>
                  </ListItem>
                  <ListItem>
                    <Radio
                      selected={Ques.A == "Sometimes"}
                      onPress={() => this.Select(index, "Sometimes")}
                    />
                    <Text> Sometimes</Text>
                  </ListItem>
                  <ListItem>
                    <Radio
                      selected={Ques.A == "Often"}
                      onPress={() => this.Select(index, "Often")}
                    />
                    <Text> Often</Text>
                  </ListItem>
                  <ListItem>
                    <Radio
                      selected={Ques.A == "Very Often"}
                      onPress={() => this.Select(index, "Very Often")}
                    />
                    <Text> Very Often</Text>
                  </ListItem>
                </CardItem>
              </Card>
            ))}
          </ScrollView>
          <Button
            rounded
            style={{ justifyContent: "center", backgroundColor: "#c23fc4" }}
          >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  Select = (index, selected) => {
    tempArray = this.state.Questions;
    tempArray[index].A = selected;
    this.setState({ Questions: tempArray });
  };
}
