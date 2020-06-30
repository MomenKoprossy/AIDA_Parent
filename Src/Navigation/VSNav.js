import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ChildVSView from "../ChildVSView";
import ChildListView from "../ChildListView";

const VSStack = createStackNavigator(
  {
    CList: { screen: ChildListView },
    CVS: { screen: ChildVSView },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      initialRouteName: "CList",
    },
  }
);

const VSApp = createAppContainer(VSStack);

export default class VSNav extends React.Component {
  render() {
    return <VSApp />;
  }
}
