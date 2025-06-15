import { TouchableOpacity, Text, ViewStyle, TextStyle, TouchableOpacityProps } from "react-native";
import { styles } from "./styles"; // Supondo que os estilos estejam em styles.js
import { Feather } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  icon?: keyof typeof Feather.glyphMap;
  title?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  pages?: string;
  iconStyle?: object; 
};

export function Button({ title, style, titleStyle, pages, iconStyle, icon, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.button, style]} {...rest}>
      {/* PONTO CRÍTICO: titleStyle DEVE VIR POR ÚLTIMO */}
      <Feather  
        name={icon}
        size={24}
        color={"#DB6300"}
        style={iconStyle}
      />
      <Text style={[styles.title, titleStyle]}>{title}</Text> 
      
    </TouchableOpacity>
  );
}