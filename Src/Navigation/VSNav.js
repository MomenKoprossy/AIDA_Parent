import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const VSStack = createStackNavigator(
  {
    CList: { screen: ChildListView },
    
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      initialRouteName: "CList"
    }
  }
);

const VSApp = createAppContainer(VSStack);

export default class ChildNav extends React.Component {
  render() {
    return <VSApp />;
  }
}