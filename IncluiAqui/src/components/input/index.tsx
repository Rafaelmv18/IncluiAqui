import { TextInput, TextInputProps, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

type Props = TextInputProps & {
  icon?: keyof typeof Feather.glyphMap;
};

export function Input({ icon, ...rest }: Props) {
  return (
    <View>
      <Feather  
        name={icon}
        size={24}
        color="#666"
        style={styles.icon}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="#666"
        {...rest}
        
      /> 
    </View>
  );
}