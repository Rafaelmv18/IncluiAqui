import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";
import { Input } from "@/src/components/input";
import { Menu } from "@/src/components/menu"; // Menu importado
import { useLocation } from "@/src/contexts/LocationContext";
import { getRouteCoordinates } from "@/src/core/api";
import { theme } from "@/src/themes";

export default function MapPage() {
  const { location } = useLocation();
  const params = useLocalSearchParams();

  // Tratamento seguro dos parâmetros
  const latitude = params?.latitude ? parseFloat(String(Array.isArray(params.latitude) ? params.latitude[0] : params.latitude)) : 0;
  const longitude = params?.longitude ? parseFloat(String(Array.isArray(params.longitude) ? params.longitude[0] : params.longitude)) : 0;
  const name = params?.name ? String(params.name) : "Local Selecionado";
  const address = params?.address ? String(params.address) : "";

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Região inicial focada no usuário ou no destino
  const initialRegion = {
    latitude: latitude || location?.coords.latitude || -23.550520,
    longitude: longitude || location?.coords.longitude || -46.633308,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  };

  useEffect(() => {
    const fetchRoute = async () => {
      if (location?.coords && latitude && longitude) {
        const origin = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        const destination = { latitude, longitude };

        try {
          const coords = await getRouteCoordinates(origin, destination);
          if (coords && coords.coordinates) {
            setRouteCoordinates(coords.coordinates);
          }
        } catch (err) {
          console.log("Backend indisponível ou rota não encontrada. Mostrando apenas pontos.");
        }
      }
    };
    fetchRoute();
  }, [location, latitude, longitude]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true} // Mostra a bolinha azul do GPS nativo
        showsMyLocationButton={false} // Vamos criar nosso próprio botão se precisar
      >
        {/* Marcador de Destino (Se houver) */}
        {latitude !== 0 && longitude !== 0 && (
          <Marker coordinate={{ latitude, longitude }}>
            <View style={styles.markerContainer}>
              <Feather name="map-pin" size={24} color={theme.colors.primary} />
            </View>
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{name}</Text>
                <Text style={styles.calloutText}>{address}</Text>
              </View>
            </Callout>
          </Marker>
        )}

        {/* Linha da Rota */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={theme.colors.primary}
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* Barra de Busca Flutuante */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Para onde vamos?"
          icon="search"
          inputStyle={styles.inputOverride}
          // Aqui você pode reconectar a lógica de busca se quiser
        />
      </View>

      {/* Menu Inferior (Sobreposto ao mapa) */}
      <Menu />
    </View>
  );
}