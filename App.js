import { View, Text, SafeAreaView, LogBox } from "react-native";
import React, { useEffect } from "react";
import AppNavigation from "./src/navigation/index";
import { apiCall } from "./src/api/openAI";

export default function App() {
  LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  useEffect(() => {
    apiCall("create an image with a dog playing with cat");
  }, []);
  return <AppNavigation />;
}
