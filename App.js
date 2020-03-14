import React from "react";
import * as Font from "expo-font";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LoadingView } from "./Src/LoadingView";
import { LoginView } from "./Src/LoginView";
import { SignUpView } from "./Src/SignUpView";
import QuestionnaireView from "./Src/QuestionnaireView";
import DiagnosisHomeView from "./Src/DiagnosisHomeView";
import VideoUploadView from "./Src/VideoUploadView";
import AccountDetailsView from "./Src/AccountDetailsView";
import AccountEditView from "./Src/AccountEditView";
import ChildDetailsView from "./Src/ChildDetailsView";
import ChildListView from "./Src/ChildListView";
import ChildAddView from "./Src/ChildAddView";
import QMainView from "./Src/QMainView";

const SNav = createStackNavigator(
  {
    Login: { screen: LoginView },
    SignUp: { screen: SignUpView },
    DiagnosisHome: { screen: DiagnosisHomeView },
    Upload: { screen: VideoUploadView },
    QMain: { screen: QMainView },
    Questionnaire: { screen: QuestionnaireView },
    Details: { screen: AccountDetailsView },
    Edit: { screen: AccountEditView },
    CList: { screen: ChildListView },
    //CDetails: { screen: ChildDetailsView },
    CAdd: { screen: ChildAddView }
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
