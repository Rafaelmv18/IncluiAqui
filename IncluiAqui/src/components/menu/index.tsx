// src/components/BottomMenu.tsx
import { View } from "react-native";
import { IconButton } from "../iconButton";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./styles"; // estilo do menu

export function Menu() {
  const router = useRouter();
  const pathname = usePathname(); // pega a rota atual

  function handleNavigate(page: string) {
    router.navigate(`../pages/${page}`);
  }

  return (
    <View style={styles.menu}>
      <IconButton
        icon="home"
        onPress={() => handleNavigate("home")}
        isSelected={pathname.includes("home")}
      />
      <IconButton
        icon="map"
        onPress={() => handleNavigate("map")}
        isSelected={pathname.includes("map")}
      />
      <IconButton
        icon="user"
        onPress={() => handleNavigate("user")}
        isSelected={pathname.includes("user")}
      />
    </View>
  );
}
