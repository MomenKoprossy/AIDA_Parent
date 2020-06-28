import React from "react";
import * as Font from "expo-font";
import { AsyncStorage } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { LoadingView } from "./Src/LoadingView";
import { LoginView } from "./Src/LoginView";
import { SignUpView } from "./Src/SignUpView";
import VSBeta from "./Src/VSBETA";
import AccountDetailsView from "./Src/AccountDetailsView";
import GetStartedView from "./Src/GetStartedView";
import { Icon } from "native-base";

import ChildNav from "./Src/Navigation/ChildNav";
import HomeNav from "./Src/Navigation/HomeNav";
import CreateTaskView from "./Src/CreateTaskView";

const SignoutScreen = () => {};

const AppDrawer = createBottomTabNavigator(
  {
    HomePage: {
      screen: HomeNav,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" style={{ color: tintColor }} />
        ),
      },
    },
    Details: {
      screen: AccountDetailsView,
      navigationOptions: {
        tabBarLabel: "Account Details",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" style={{ color: tintColor }} />
        ),
      },
    },
    CList: {
      screen: ChildNav,
      navigationOptions: {
        tabBarLabel: "Child List",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="people" style={{ color: tintColor }} />
        ),
      },
    },
    VS: {
      screen: VSBeta,
      navigationOptions: {
        tabBarLabel: "VSBeta",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="calendar" style={{ color: tintColor }} />
        ),
      },
    },
    Logout: {
      screen: SignoutScreen,
      navigationOptions: {
        tabBarLabel: "Logout",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="log-out" style={{ color: tintColor }} />
        ),
        tabBarOnPress: async ({ navigation }) => {
          try {
            await AsyncStorage.removeItem("login").then(() =>
              navigation.navigate("Auth")
            );
          } catch (error) {
            console.log(error);
          }
        },
      },
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
    tabBarOptions: {
      activeTintColor: "#c23fc4",
      inactiveTintColor: "grey",
      showIcon: true,
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Login: { screen: LoginView },
    SignUp: { screen: SignUpView },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const Main = createAppContainer(
  createSwitchNavigator(
    {
      GetStarted: { screen: GetStartedView },
      App: AppDrawer,
      Auth: AuthStack,
    },
    { initialRouteName: "GetStarted", headerMode: "none" }
  )
);

export default class App extends React.Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
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
