// src/components/IconButton.tsx
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles"; // certifique-se de que o styles.ts esteja no mesmo local

type Props = TouchableOpacityProps & {
  icon: keyof typeof Feather.glyphMap;
  iconColor?: string;
  iconSize?: number;
};

export function IconButton({ icon, iconColor = "#DB6300", iconSize = 30, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} {...rest}>
      <Feather name={icon} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}
