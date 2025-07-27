import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet,  FlatList, TouchableOpacity, Image} from "react-native"
import { router } from "expo-router"

import { Menu } from "@/src/components/menu"
import { useLocationCoordinates } from "@/src/hooks/useCurrentLocation";

import { styles } from "./styles";
import { Input } from "@/src/components/input"
import { Feather } from "@expo/vector-icons";
import {searchNearbyPlaces} from "../../../core/api";

const categorias = [
  { nome: "Restaurantes", icon: "coffee" },
  { nome: "Salão", icon: "scissors" },
  { nome: "Supermercados", icon: "shopping-cart" },
  { nome: "Parques", icon: "tree" },
  { nome: "Estações", icon: "navigation" },
  { nome: "Cinemas", icon: "film" },
  { nome: "Hotéis", icon: "home" },
  { nome: "Academias", icon: "activity" },
  { nome: "Hospitais", icon: "plus-square" },
  { nome: "Aeroportos", icon: "send" },
];

const lugares = [
  { nome: "Nome Lugar", distancia: "5.0 Km", acessibilidade: 3 },
  { nome: "Nome Lugar", distancia: "5.0 Km", acessibilidade: 4 },
  { nome: "Nome Lugar", distancia: "5.0 Km", acessibilidade: 5 },
];

export default function Index() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [places, setPlaces] = useState([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  
  const { latitude, longitude, isLoading: locationLoading, error: locationError } = useLocationCoordinates();

  function handleNext(page: string) {
    router.push(`./${page}`);
  }

  function handleOnPress(item: String, value?: string) {
   if (item === "search") {
      setSearchText(value || "");
    }
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      // Não busca se ainda está carregando a localização
      if (locationLoading) return;
      
      setIsLoadingPlaces(true);
      
      try {
        const response = await searchNearbyPlaces({ 
          latitude,
          longitude,
          radius: 5000, // 5km radius
          keyword: searchText || "estabelecimento",
          type: "establishment" // Default type
        });
        console.log("Search Results:", response);
        console.log("Using coordinates:", { latitude, longitude });
        setPlaces(response || []);
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlaces([]);
      } finally {
        setIsLoadingPlaces(false);
      }
    };

    fetchPlaces();
  }, [searchText]);
  

  return (
    <View style={styles.container}>
      {/* Conteúdo com rolagem */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* Campo de busca */}
            <Input
              placeholder="Buscar local"
              icon="map-pin"
              inputStyle={styles.input}
              iconStyle={styles.icon}
              onChangeText={(value) => handleOnPress("search", value)}
            />

            {/* Grid de categorias */}
            <View style={styles.grid}>
              {categorias.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryButton}
                  onPress={() => setSelectedButton(item.nome)}
                >
                  <Feather name={item.icon as any} size={20} color="#000" />
                  <Text style={styles.categoryText}>{item.nome}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        data={lugares}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
         <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.8} 
            onPress={() => handleNext("infoLocal")}
          >
            <View style={styles.circle} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.nome}</Text>
              <View style={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Feather
                    key={i}
                    name="star"
                    size={16}
                    color={i < item.acessibilidade ? "#f5a623" : "#ccc"}
                  />
                ))}
              </View>
              <Text style={styles.desc}>Acessibilidade:</Text>
              <Text style={styles.km}>{item.distancia}</Text>
            </View>
          </TouchableOpacity>

        )}
      />

      {/* Menu fixo */}
      <Menu />
    </View>
  );
}
