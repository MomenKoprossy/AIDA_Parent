import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import QuestionnaireView from "../QuestionnaireView";
import DiagnosisHomeView from "../DiagnosisHomeView";
import VideoUploadView from "../VideoUploadView";
import QMainView from "../QMainView";
import HomePageView from "../HomePageView";
import ChildListView from "../ChildListView";
import ChildAddView from "../ChildAddView";

const DStack = createStackNavigator(
  {
    HomePage: {
      screen: HomePageView
    },
    DiagnosisHome: {
      screen: DiagnosisHomeView
    },
    Upload: {
      screen: VideoUploadView
    },
    QMain: {
      screen: QMainView
    },
    Questionnaire: {
      screen: QuestionnaireView
    },
    CList: { screen: ChildListView },
    CAdd: { screen: ChildAddView }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      initialRouteName: "DiagnosisHome"
    }
  }
);

const DApp = createAppContainer(DStack);

export default class HomeNav extends React.Component {
  render() {
    return <DApp />;
  }
}
