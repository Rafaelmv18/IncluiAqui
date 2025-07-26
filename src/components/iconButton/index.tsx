// src/components/IconButton.tsx
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  icon: keyof typeof Feather.glyphMap;
  iconColor?: string;
  iconSize?: number;
  isSelected?: boolean;
  showConfig?: boolean; // <- aqui!
};

export function IconButton({
  icon,
  iconColor = "#2A2A2A",
  iconSize = 30,
  isSelected = false,
  showConfig = false, // <- aqui!
  ...rest
}: Props) {
  return (
    <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} {...rest}>
      <Feather
        name={icon}
        size={iconSize}
        color={(isSelected || showConfig) ? "#DB6300" : iconColor} // <- muda a cor se estiver selecionado
      />
    </TouchableOpacity>
  );
}
