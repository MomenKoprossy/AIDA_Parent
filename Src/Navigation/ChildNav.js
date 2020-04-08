import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ChildDetailsView from "../ChildDetailsView";
import ChildListView from "../ChildListView";
import ChildAddView from "../ChildAddView";

const CStack = createStackNavigator(
  {
    CList: { screen: ChildListView },
    CDetails: { screen: ChildDetailsView },
    CAdd: { screen: ChildAddView }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      initialRouteName: "CList"
    }
  }
);

const CApp = createAppContainer(CStack);

export default class ChildNav extends React.Component {
  render() {
    return <CApp />;
  }
}
