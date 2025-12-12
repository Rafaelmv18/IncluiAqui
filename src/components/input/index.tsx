import React, { useState } from "react";
import { View, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { theme } from "@/src/themes";

type Props = TextInputProps & {
  icon?: keyof typeof Feather.glyphMap;
  inputStyle?: object; 
  iconStyle?: object;
  isPassword?: boolean; 
};

export function Input({ icon, inputStyle, iconStyle, isPassword, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);

  return (
    <View 
      style={[
        styles.container, 
        // Aqui ele usa o estilo que estava faltando antes
        isFocused && styles.containerFocused,
        inputStyle
      ]}
    >
      {icon && (
        <Feather  
          name={icon}
          size={20}
          color={isFocused ? theme.colors.primary : theme.colors.textLight}
          style={[styles.icon, iconStyle]}
        />
      )}

      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.textLight}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={isPassword && !isPasswordVisible}
        {...rest}
      /> 

      {isPassword && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Feather 
            name={isPasswordVisible ? "eye" : "eye-off"} 
            size={20} 
            color={theme.colors.textLight} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}