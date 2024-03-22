import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function Features() {
  return (
    <View className="space-y-4">
      <Text
        style={{ fontSize: wp(6.5) }}
        className="font-semibold text-gray-700"
      >
        Features
      </Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/images/chatgpt-icon.png")}
            style={{ height: hp(4), width: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="text-gray-700 font-semibold"
          >
            Chat Gpt
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-gray-700 font-medium"
        >
          ChatGPT is an AI language model developed by OpenAI. It is based on
          the GPT (Generative Pre-trained Transformer) architecture,
          specifically GPT-3.5. As a language model,
        </Text>
      </View>
      <View className="bg-purple-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/images/Dall-E.png")}
            style={{ height: hp(4), width: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="text-gray-700 font-semibold"
          >
            DALL-E
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-gray-700 font-medium"
        >
          DALL-E is an AI model developed by OpenAI, known for its ability to
          generate images from textual descriptions. The name "DALL-E" is a
          combination of the artist Salvador Dalí and the character WALL-E.
        </Text>
      </View>
      <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/images/artificial-intelligence.png")}
            style={{ height: hp(4), width: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="text-gray-700 font-semibold"
          >
            Smart AI
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-gray-700 font-medium"
        >
          The term "smart AI" is not a specific technical classification but
          rather a general characterization of AI systems that demonstrate a
          high degree of cognitive abilities.
        </Text>
      </View>
    </View>
  );
}
