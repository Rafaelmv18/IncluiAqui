import { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";

import { Menu } from "@/src/components/menu";

import { styles } from "./styles";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { IconButton } from "@/src/components/iconButton";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React from "react";
import { useLocation } from "@/src/contexts/LocationContext";

export default function Index() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const { location } = useLocation();

  function handleNext(pages: string) {
    router.navigate(`../${pages}`);
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Mapa ocupando toda a tela */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject} // mapa em tela cheia
        initialRegion={{
          latitude: location?.coords.latitude ?? 0,
          longitude: location?.coords.longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
          }}
          title="Você está aqui"
          description="Sua localização atual"
        />
      </MapView>

      {/* Input sobreposto ao mapa */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Buscar local"
          icon="map-pin"
          inputStyle={styles.input}
          iconStyle={styles.icon}
        />
      </View>

      {/* Botão fixo na parte inferior */}
      {/* <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={() => router.back()} />
      </View> */}
    </SafeAreaView>
  );
}
