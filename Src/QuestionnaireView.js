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
import axios from "react-native-axios";
import { serverURL } from "./utils";

export default class QuestionnaireView extends React.Component {
  state = {
    Questions: [],
    Answers: [],
    Submit: [
      "Definitely Agree",
      "Definitely Agree",
      "Definitely Agree",
      "Definitely Agree",
      "Definitely Agree",
      "Definitely Agree",
      "Definitely Agree",
      "Definitely Agree",
      "Definitely Agree",
      "Definitely Agree"
    ]
  };

  url = serverURL + "submit_questionaire";

  submitQues = () => {
    axios
      .post(this.url, {
        child_code: this.props.navigation.state.params.cCode,
        model_type: this.props.navigation.state.params.ageGrp,
        answers: this.state.Submit
      })
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          alert("Questionnaire Submitted Successfully!");
          this.props.navigation.goBack();
        }
      })
      .catch(() => alert("Connection Error"));
  };

  QCHAT10 = [
    "Does your child look at you when you call his/her name?",
    "How easy is it for you to get eye contact with your child?",
    "Does your child point to indicate that s/he wants something? (e.g. a toy that is out of reach)",
    "Does your child point to share interest with you? (e.g. poin9ng at an interesting sight)",
    "Does your child pretend? (e.g. care for dolls, talk on a toy phone)",
    "Does your child follow where you’re looking?",
    "If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them?  (e.g. stroking hair, hugging them)",
    "Would you describe your child’s first words as: ",
    "Does your child use simple gestures?  (e.g. wave goodbye)",
    "Does your child stare at nothing with no apparent purpose?"
  ];

  ChildAQ10 = [
    "S/he often notices small sounds when others do not",
    "S/he usually concentrates more on the whole picture, rather than the small details",
    "In a social group, s/he can easily keep track of several different people’s conversations",
    "S/he finds it easy to go back and forth between different activities",
    "S/he doesn’t know how to keep a conversation going with his/her peers",
    "S/he is good at social chit-chat",
    "When s/he is read a story, s/he finds it difficult to work out the character’s intentions or feelings",
    "When s/he was in preschool, s/he used to enjoy playing games involving pretending with other children",
    "S/he finds it easy to work out what someone is thinking or feeling just by looking at their face",
    "S/he finds it hard to make new friends"
  ];

  AdolescentAQ10 = [
    "S/he notices patterns in things all the time",
    "S/he usually concentrates more on the whole picture, rather than the small details",
    "In a social group, s/he can easily keep track of several different people’s conversations",
    "If there is an interruption, s/he can switch back to what s/he was doing very quickly",
    "S/he frequently finds that s/he doesn’t know how to keep a conversation going",
    "S/he is good at social chit-chat",
    "When s/he was younger, s/he used to enjoy playing games involving pretending with other children",
    "S/he finds it difficult to imagine what it would be like to be someone else",
    "S/he finds social situations easy",
    "S/he finds it hard to make new friends"
  ];

  AdultAQ10 = [
    "I often notice small sounds when others do not",
    "I usually concentrate more on the whole picture, rather than the small details",
    "I find it easy to do more than one thing at once",
    "If there is an interruption, I can switch back to what I was doing very quickly",
    "I find it easy to ‘read between the lines’ when someone is talking to me",
    "I know how to tell if someone listening to me is getting bored",
    "When I’m reading a story I find it difficult to work out the characters’ intentions",
    "I like to collect information about categories of things (e.g. types of car, types of bird, typesof train, types of plant etc)",
    "I find it easy to work out what someone is thinking or feeling just by looking at their face",
    "I find it difficult to work out people’s intentions"
  ];

  AnswersAQ10 = [
    "Definitely Agree",
    "Slightly Agree",
    "Slightly Disagree",
    "Definitely Disagree"
  ];

  AnswersQCHAT10 = [
    ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    [
      "Very easy",
      "Quite easy",
      "Quite difficult",
      "Very difficult",
      "Impossible"
    ],
    [
      "Many times a day",
      "A few times a day",
      "A few times a week",
      "Less than once a week",
      "Never"
    ],
    [
      "Many times a day",
      "A few times a day",
      "A few times a week",
      "Less than once a week",
      "Never"
    ],
    [
      "Many times a day",
      "A few times a day",
      "A few times a week",
      "Less than once a week",
      "Never"
    ],
    [
      "Many times a day",
      "A few times a day",
      "A few times a week",
      "Less than once a week",
      "Never"
    ],
    ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    [
      "Very typical",
      "Quite typical",
      "Slightly unusual",
      "Very unusual",
      "My child doesn’t speak"
    ]
  ];

  componentDidMount() {
    this.setState({ ageGrp: this.props.navigation.state.params.ageGrp });
    if (this.props.navigation.state.params.ageGrp == "Toddler")
      this.setState({ Questions: this.QCHAT10, Answers: this.AnswersQCHAT10 });
    else if (this.props.navigation.state.params.ageGrp == "Child")
      this.setState({ Questions: this.ChildAQ10, Answers: this.AnswersAQ10 });
    else if (this.props.navigation.state.params.ageGrp == "Adolescent")
      this.setState({
        Questions: this.AdolescentAQ10,
        Answers: this.AnswersAQ10
      });
    else if (this.props.navigation.state.params.ageGrp == "Adult")
      this.setState({ Questions: this.AdultAQ10, Answers: this.AnswersAQ10 });
  }

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
            <Title>Questionnaire</Title>
          </Body>
        </Header>
        <Content>
          <ScrollView>
            {(this.state.Questions || []).map((Ques, index) => (
              <Card key={index}>
                <CardItem>
                  <H3>
                    {index + 1}. {Ques}
                  </H3>
                </CardItem>
                <CardItem
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  {this.props.navigation.state.params.ageGrp == "Toddler"
                    ? (this.state.Answers[index] || []).map((Ans, idx) => (
                        <ListItem key={idx}>
                          <Radio
                            selected={Ans == this.state.Submit[index]}
                            onPress={() => this.Select(index, Ans)}
                          />
                          <Text> {Ans}</Text>
                        </ListItem>
                      ))
                    : (this.state.Answers || []).map((Ans, idx) => (
                        <ListItem key={idx}>
                          <Radio
                            selected={Ans == this.state.Submit[index]}
                            onPress={() => this.Select(index, Ans)}
                          />
                          <Text> {Ans}</Text>
                        </ListItem>
                      ))}
                  {/* <ListItem>
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
                  </ListItem> */}
                </CardItem>
              </Card>
            ))}
          </ScrollView>
          <Button
            rounded
            style={{ justifyContent: "center", backgroundColor: "#c23fc4" }}
            onPress={() => this.SubmitQues()}
          >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  Select = (index, selected) => {
    tempArray = this.state.Submit;
    tempArray[index] = selected;
    this.setState({ Submit: tempArray });
  };
  SubmitQues = () => {
    axios
      .post(this.url, {
        model_type: this.state.ageGrp,
        child_code: "C9MX3D59",
        answers: this.state.Submit
      })
      .then(req => {
        if (JSON.stringify(req.data.success) == "false")
          alert(JSON.stringify(req.data.errors));
        else if (JSON.stringify(req.data.success) == "true") {
          alert("Eshta");
          //this.props.navigation.goBack();
        }
      })
      .catch(Error => alert(Error));
  };
}
