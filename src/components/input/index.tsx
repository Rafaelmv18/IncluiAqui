import { SafeAreaView, TextInput, TextInputProps, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";
import React from "react";

type Props = TextInputProps & {
  // error: string
  icon?: keyof typeof Feather.glyphMap;
  inputStyle?: object; 
  iconStyle?: object; 
};
// error = ''
export function Input({ icon, inputStyle, iconStyle, ...rest }: Props) {
  return (
    <SafeAreaView>
      <Feather  
        name={icon}
        size={24}
        color="#666"
        style={[styles.icon, iconStyle]}
      />

      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor="#666"
        {...rest}
        
      /> 

      {/* {
        error.length > 0 &&
        <Text style={styles.error}>
        {error}
      </Text>
      } */}
    </SafeAreaView>
  );
}