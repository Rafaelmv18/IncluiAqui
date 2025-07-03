// src/components/BottomMenu.tsx
import { View } from "react-native";
import { IconButton } from "../iconButton";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./styles";
import { useState } from "react";
import { ConfigPanel } from "../../components/configPainel"; 

export function Menu() {
  const router = useRouter();
  const pathname = usePathname(); // pega a rota atual
  const [showConfig, setShowConfig] = useState(false); 


  function handleNavigate(page: string) {
    router.navigate(`../pages/${page}`);
  }
  function toggleConfig() {
    setShowConfig(!showConfig);
  }

  return (
    <>
      <View style={styles.menu}>
        <IconButton icon="home" onPress={() => handleNavigate("home")} isSelected={pathname.includes("home")} />
        <IconButton icon="map" onPress={() => handleNavigate("map")} isSelected={pathname.includes("map")} />
        <IconButton icon="user" onPress={toggleConfig} isSelected={showConfig} /> {/* <-- novo comportamento */}
      </View>

      {showConfig && <ConfigPanel />} {/* <-- renderiza o painel */}
    </>
  );
}
