import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet,  FlatList, TouchableOpacity, Image, ActivityIndicator} from "react-native"
import { router } from "expo-router"

import { Menu } from "@/src/components/menu"
import { PlaceCard } from "@/src/components/placeCard"
import { useLocationCoordinates } from "@/src/hooks/useCurrentLocation";

import { styles } from "./styles";
import { Input } from "@/src/components/input"
import { Feather } from "@expo/vector-icons";
import {searchNearbyPlaces, getGooglePlacePhotoUrl} from "../../../core/api";

// Interfaces para tipagem
interface PlacePhoto {
  photoReference: string;
  width: number;
  height: number;
}

interface PlaceLocation {
  lat: number;
  lng: number;
}

interface Place {
  placeId: string;
  name: string;
  address: string;
  location: PlaceLocation;
  rating?: number;
  userRatingsTotal?: number;
  types?: string[];
  priceLevel?: number;
  photos?: PlacePhoto[];
  imageUrl?: string | null; // Aceitar null também
}

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

export default function Index() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  
  const { 
    latitude, 
    longitude, 
    isLoading: locationLoading, 
    error: locationError,
    refreshLocation,
    accuracy,
    isHighAccuracy,
    distanceFromFallback,
    lastUpdated
  } = useLocationCoordinates();

  function handleNext(page: string, params?: any) {
    if (params) {
      router.push({
        pathname: `./${page}`,
        params: params
      });
    } else {
      router.push(`./${page}`);
    }
  }

  function handleOnPress(item: String, value?: string) {
   if (item === "search") {
      setSearchText(value || "");
    }
  }

  // Função para buscar estabelecimentos por categoria
  const searchByCategory = async (category: string) => {
    setSelectedButton(category);
    setIsLoadingPlaces(true);
    
    try {
      const categoryKeywords: { [key: string]: string } = {
        "Restaurantes": "restaurant",
        "Salão": "beauty_salon",
        "Supermercados": "supermarket",
        "Parques": "park",
        "Estações": "transit_station",
        "Cinemas": "movie_theater",
        "Hotéis": "lodging",
        "Academias": "gym",
        "Hospitais": "hospital",
        "Aeroportos": "airport"
      };

      const response = await searchNearbyPlaces({ 
        latitude,
        longitude,
        radius: 5000,
        keyword: categoryKeywords[category] || category.toLowerCase(),
        type: categoryKeywords[category] || "establishment"
      });
      
      setPlaces(response || []);
    } catch (error) {
      console.error(`Erro ao buscar ${category}:`, error);
      setPlaces([]);
    } finally {
      setIsLoadingPlaces(false);
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      // Não busca se ainda está carregando a localização
      if (locationLoading) return;
      
      // Avisar se está usando localização imprecisa
      if (accuracy && accuracy > 1000) {
        console.warn(`⚠️ Localização imprecisa detectada: ${accuracy}m`);
      }
      
      // Avisar se está usando coordenadas padrão
      if (distanceFromFallback !== null && distanceFromFallback < 1) {
        console.warn('⚠️ Usando coordenadas padrão de São Paulo');
      }
      
      setIsLoadingPlaces(true);
      
      try {
        const response = await searchNearbyPlaces({ 
          latitude,
          longitude,
          radius: 5000, // 5km radius
          keyword: searchText || "estabelecimento",
          type: "establishment" // Default type
        });
        
        setPlaces(response || []);
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlaces([]);
      } finally {
        setIsLoadingPlaces(false);
      }
    };

    // Só busca se houver texto de busca ou se for a primeira carga
    if (searchText || places.length === 0) {
      fetchPlaces();
    }
  }, [searchText, latitude, longitude, locationLoading, accuracy, distanceFromFallback]);
  

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
                  style={[
                    styles.categoryButton,
                    selectedButton === item.nome && styles.categoryButtonSelected
                  ]}
                  onPress={() => searchByCategory(item.nome)}
                >
                  <Feather 
                    name={item.icon as any} 
                    size={20} 
                    color={selectedButton === item.nome ? "#fff" : "#000"} 
                  />
                  <Text style={[
                    styles.categoryText,
                    selectedButton === item.nome && styles.categoryTextSelected
                  ]}>
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Indicador de carregamento */}
            {isLoadingPlaces && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#db6300" />
                <Text style={styles.loadingText}>Buscando estabelecimentos...</Text>
              </View>
            )}

            {/* Mensagem quando não há resultados */}
            {!isLoadingPlaces && places.length === 0 && searchText && (
              <View style={styles.emptyContainer}>
                <Feather name="map-pin" size={48} color="#ccc" />
                <Text style={styles.emptyText}>Nenhum estabelecimento encontrado</Text>
                <Text style={styles.emptySubtext}>Tente uma busca diferente</Text>
              </View>
            )}
          </>
        }
        data={places}
        keyExtractor={(item, index) => item.placeId || index.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            userLatitude={latitude}
            userLongitude={longitude}
            onPress={() => handleNext("infoLocal", { 
              placeId: item.placeId, 
              placeName: item.name,
              placeData: JSON.stringify(item)
            })}
            styles={styles}
          />
        )}
      />

      {/* Menu fixo */}
      <Menu />
    </View>
  );
}
