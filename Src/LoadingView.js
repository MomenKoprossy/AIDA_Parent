import React from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { Container, Content } from "native-base";
import Constants from "expo-constants";
import ImageResizeMode from "react-native/Libraries/Image/ImageResizeMode";

export class LoadingView extends React.Component {
  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Image
            resizeMode={ImageResizeMode.contain}
            style={{
              alignSelf: "center",
              width: 120,
              height: 100
            }}
            source={require("../assets/logo.png")}
          />
          <ActivityIndicator
            style={{ margin: 50 }}
            size="large"
            color="#0000ff"
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  }
});
