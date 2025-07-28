// src/components/BottomMenu.tsx
import { SafeAreaView, View } from "react-native";
import { IconButton } from "../iconButton";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { useState } from "react";
import { ConfigPanel } from "../../components/configPainel"; 
import React from "react";

export function Menu() {
  const router = useRouter();

  // 🔥 controla qual aba está ativa
  const [activeTab, setActiveTab] = useState<"home" | "map" | "user" | null>("home");
  const [showConfig, setShowConfig] = useState(false);

  function handleNavigate(page: "home" | "map") {
    setActiveTab(page);        // deixa laranja o ícone certo
    setShowConfig(false);      // esconde o painel de config
    router.navigate(`../pages/${page}`);
  }

  function toggleConfig() {
    if (activeTab === "user") {
      // se já estiver no user, fecha o painel e limpa seleção
      setShowConfig(false);
      setActiveTab(null);
    } else {
      // ativa user e abre o painel
      setActiveTab("user");
      setShowConfig(true);
    }
  }

  return (
    <>
      <SafeAreaView style={styles.menu}>
        <IconButton 
          icon="home" 
          onPress={() => handleNavigate("home")} 
          isSelected={activeTab === "home"} 
        />
        
        <IconButton 
          icon="map" 
          onPress={() => handleNavigate("map")} 
          isSelected={activeTab === "map"} 
        />
        
        <IconButton 
          icon="user" 
          onPress={toggleConfig} 
          isSelected={activeTab === "user"} 
        />
      </SafeAreaView>

      {showConfig && <ConfigPanel />}
    </>
  );
}
