import React from "react";
import * as Font from "expo-font";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LoadingView } from "./Src/LoadingView";
import { LoginView } from "./Src/LoginView";
import { SignUpView } from "./Src/SingUpView";
import QuestionnaireView from "./Src/QuestionnaireView";
import DiagnosisHomeView from "./Src/DiagnosisHomeView";
import VideoUploadView from "./Src/VideoUploadView";

const SNav = createStackNavigator(
  {
    Login: { screen: LoginView },
    SignUp: { screen: SignUpView },
    DiagnosisHome: { screen: DiagnosisHomeView },
    Upload: { screen: VideoUploadView },
    Questionnaire: { screen: QuestionnaireView }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const Main = createAppContainer(SNav);

export default class App extends React.Component {
  state = {
    loading: true
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <LoadingView />;
    }

    return <Main></Main>;
  }
}
