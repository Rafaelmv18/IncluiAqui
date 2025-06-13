import { TouchableOpacity, Text, ViewStyle, TextStyle, TouchableOpacityProps } from "react-native";
import { styles } from "./styles"; // Supondo que os estilos estejam em styles.js

type Props = TouchableOpacityProps & {
  title: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  pages?: string;
};

export function Button({ title, style, titleStyle, pages, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.button, style]} {...rest}>
      {/* PONTO CRÍTICO: titleStyle DEVE VIR POR ÚLTIMO */}
      <Text style={[styles.title, titleStyle]}>{title}</Text> 
      
    </TouchableOpacity>
  );
}