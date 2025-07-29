import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { styles } from "./styles";
import { Menu } from "@/src/components/menu"
import { Input } from "@/src/components/input";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import React from "react";
import { useLocation } from "@/src/contexts/LocationContext";
import { getRouteCoordinates } from "@/src/core/api";

export default function Index() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const { location } = useLocation();
  const params = useLocalSearchParams();

  // Receber dados da navegação
  const latitude = params?.latitude
    ? parseFloat(
        Array.isArray(params.latitude)
          ? params.latitude[0]
          : params.latitude ?? "0"
      )
    : 0;
  const longitude = params?.longitude
    ? parseFloat(
        Array.isArray(params.longitude) ? params.longitude[0] : params.longitude
      )
    : 0;
  const name = params?.name
    ? Array.isArray(params.name)
      ? params.name[0]
      : params.name
    : "Local";
  const address = params?.address
    ? Array.isArray(params.address)
      ? params.address[0]
      : params.address
    : "";

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (location?.coords && latitude && longitude) {
        const origin = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        const destination = { latitude, longitude };

        try {
          // console.log("Buscando rota de", origin, "para", destination);
          const coords = await getRouteCoordinates(origin, destination);
          // console.log("Coordenadas da rota:", coords);
          setRouteCoordinates(coords.coordinates);
        } catch (err) {
          console.error("Erro ao buscar rota:", err);
        }
      }
    };
    fetchRoute();
  }, [location, latitude, longitude]);

  function handleNext(pages: string) {
    router.navigate(`../${pages}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={name}
          description={address}
        />
        {location?.coords.latitude && location?.coords.longitude && (
          <>
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Você está aqui"
              pinColor="#007BFF"
            />
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#DB6300"
                strokeWidth={4}
              />
            )}
          </>
        )}
      </MapView>

      {/* Input sobreposto ao mapa */}
      <View style={styles?.searchContainer}>
        <Input
          placeholder="Buscar local"
          icon="map-pin"
          inputStyle={styles.input}
          iconStyle={styles.icon}
        />
      </View>
     
    </SafeAreaView>
    
  );
}
