import { Platform, StatusBar } from "react-native";
import { theme } from "galio-framework";

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 4 + StatusHeight;
export const iPhoneX = () =>
  Platform.OS === "ios" && (height === 812 || width === 812);

export const serverURL = "http://ed7a0566e37d.ngrok.io/";
export const Theme_color = "#6026ff";
