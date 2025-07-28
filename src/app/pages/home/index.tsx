import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet,  FlatList, TouchableOpacity, Image, ActivityIndicator} from "react-native"
import { router } from "expo-router"

import { Menu } from "@/src/components/menu"
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

  function handleNext(page: string) {
    router.push(`./${page}`);
  }

  function handleOnPress(item: String, value?: string) {
   if (item === "search") {
      setSearchText(value || "");
    }
  }

  // Função para obter URL da foto do Google Places
  const getPhotoUrl = (photoReference: string) => {
    return getGooglePlacePhotoUrl(photoReference, 100);
  };

  // Função para calcular distância usando a fórmula de Haversine
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
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
        console.log(`📍 Usando coordenadas: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (Precisão: ${accuracy ? accuracy.toFixed(0) + 'm' : 'N/A'})`);
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
        renderItem={({ item }) => {
          // Calcular distância do usuário até o estabelecimento
          const distance = calculateDistance(
            latitude, 
            longitude, 
            item.location.lat, 
            item.location.lng
          );

          // Calcular estrelas baseado no rating (convertendo de 0-5 para 0-5)
          const stars = item.rating ? Math.round(item.rating) : 0;

          return (
            <TouchableOpacity 
              style={styles.card} 
              activeOpacity={0.8} 
              onPress={() => handleNext("infoLocal")}
            >
              <View style={styles.circle}>
                {item.photos && item.photos.length > 0 ? (
                  <Image 
                    source={{ 
                      uri: getPhotoUrl(item.photos[0].photoReference)
                    }}
                    style={styles.placeImage}
                    defaultSource={{ uri: 'https://via.placeholder.com/50x50?text=?' }}
                  />
                ) : (
                  <Feather name="map-pin" size={24} color="#fff" />
                )}
              </View>
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.address} numberOfLines={1}>
                  {item.address}
                </Text>
                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Feather
                        key={i}
                        name="star"
                        size={16}
                        color={i < stars ? "#f5a623" : "#ccc"}
                      />
                    ))}
                  </View>
                  {item.rating && (
                    <Text style={styles.ratingText}>
                      {item.rating.toFixed(1)} ({item.userRatingsTotal || 0})
                    </Text>
                  )}
                </View>
                <Text style={styles.desc}>Distância:</Text>
                <Text style={styles.km}>{distance}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Menu fixo */}
      <Menu />
    </View>
  );
}
