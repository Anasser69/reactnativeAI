import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  LogBox,
} from "react-native";
import React, { useEffect, useState, Component } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Features from "../components/features";
import { dummyMessages } from "../constans";
import Voice from "@react-native-community/voice";

export default function HomeScreen() {
  LogBox.ignoreLogs(["new NativeEventEmitter()"]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(true);
  const [result, setResult] = useState("");

  const speechStartHandler = (e) => {
    console.log("Speech Start Handler");
  };
  const speechEndHandler = (e) => {
    setRecording(false);
    console.log("Speech End Handler");
  };
  const speechResultHandler = (e) => {
    console.log("Voice Event", e);
    const text = e.value[0];
    setResult(text);
  };
  const speechErrorHandler = (e) => {
    console.log("speech error handler", e);
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start("en-US", "ar-EG");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
      // Fetch Response
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const clear = () => {
    setMessages([]);
  };
  const stopSpeaking = () => {
    setSpeaking(false);
  };

  useEffect(() => {
    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultHandler;
    Voice.onSpeechError = speechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  console.log("result: ", result);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex flex-1 mx-5">
        {/* bot icon */}
        <View
          style={{ marginTop: StatusBar.currentHeight || 0 }}
          className="flex-row justify-center"
        >
          <Image
            source={require("../../assets/images/bot.png.png")}
            style={{ height: hp(15), width: hp(15) }}
          />
        </View>

        {/* features || message */}
        {messages.length > 0 ? (
          <View className="space-y-2 flex-1">
            <Text
              style={{ fontSize: wp(5) }}
              className="text-gray-700 font-semibold ml-1"
            >
              Assisstant
            </Text>
            <View
              style={{ height: hp(58) }}
              className="bg-neutral-200 rounded-3xl p-4"
            >
              <ScrollView
                bounces={false}
                className="space-y-4"
                showsHorizontalScrollIndicator={false}
              >
                {messages.map((message, index) => {
                  if (message.role == "assisstant") {
                    if (message.content.includes("https")) {
                      // it is an image
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                            <Image
                              source={{ uri: message.content }}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{ height: wp(60), width: wp(60) }}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      //text response
                      return (
                        <View
                          key={index}
                          style={{ width: wp(70) }}
                          className="bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                        >
                          <Text>{message.content}</Text>
                        </View>
                      );
                    }
                  } else {
                    // user input
                    return (
                      <View key={index} className="justify-end flex-row">
                        <View
                          style={{ width: wp(70) }}
                          className="bg-white rounded-xl p-2 rounded-tr-none"
                        >
                          <Text>{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}
        {/* recording , clear , stop  */}
        <View className="flex justify-center items-center">
          {recording ? (
            <TouchableOpacity onPress={stopRecording}>
              <Image
                className="rounded-full mt-2 "
                source={require("../../assets/images/Ripple.gif")}
                style={{ width: hp(10), height: hp(10) }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                className="rounded-full mt-2 "
                source={require("../../assets/images/voice.png")}
                // style={{ width: hp(10), height: hp(10) }}
              />
            </TouchableOpacity>
          )}
          {messages.length > 0 && (
            <TouchableOpacity
              onPress={clear}
              className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
            >
              <Text className="text-white font-semibold">Clear</Text>
            </TouchableOpacity>
          )}
          {speaking && (
            <TouchableOpacity
              onPress={stopSpeaking}
              className="bg-red-400 rounded-3xl p-2 absolute left-10"
            >
              <Text className="text-white font-semibold">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
