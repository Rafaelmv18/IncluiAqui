import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { Menu } from "@/src/components/menu";
import { PlaceCard } from "@/src/components/placeCard";
import { Input } from "@/src/components/input";
import { useLocationCoordinates } from "@/src/hooks/useCurrentLocation";
import { searchNearbyPlaces } from "@/src/core/api";
import { styles } from "./styles";
import { theme } from "@/src/themes";

// Definições de Tipos (Place, PlacePhoto, etc.)
// ... (mantenha suas interfaces aqui como antes) ...
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
  imageUrl?: string | null;
}

// Reduzi levemente a lista para focar nos principais para acessibilidade
const categorias = [
  { nome: "Restaurantes", icon: "coffee" },
  { nome: "Salão", icon: "scissors" },
  { nome: "Supermercados", icon: "shopping-cart" },
  { nome: "Parques", icon: "feather" },          
  { nome: "Estações", icon: "map-pin" },     
  { nome: "Cinemas", icon: "film" },
  { nome: "Hotéis", icon: "home" },
  { nome: "Academias", icon: "activity" },
  { nome: "Hospitais", icon: "plus-square" },
  { nome: "Aeroportos", icon: "send" },     
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  
  const { latitude, longitude, isLoading: locationLoading } = useLocationCoordinates();

  function handleNext(page: string, params?: any) {
    if (params) {
      router.push({ pathname: `./${page}`, params: params });
    } else {
      router.push(`./${page}`);
    }
  }

  const searchByCategory = async (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    
    if (!newCategory) {
        setSearchText(""); 
        return; 
    }

    setIsLoadingPlaces(true);
    try {
      const categoryKeywords: { [key: string]: string } = {
        "Restaurantes": "restaurant",
        "Supermercados": "supermarket",
        "Farmácias": "pharmacy",
        "Hospitais": "hospital",
        "Parques": "park",
        "Transporte": "transit_station",
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
      if (locationLoading || selectedCategory) return;
      
      setIsLoadingPlaces(true);
      try {
        const response = await searchNearbyPlaces({ 
          latitude,
          longitude,
          radius: 5000, 
          keyword: searchText || "estabelecimento",
          type: "establishment"
        });
        setPlaces(response || []);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoadingPlaces(false);
      }
    };

    const timeout = setTimeout(() => {
        if (!selectedCategory) fetchPlaces();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText, latitude, longitude, locationLoading, selectedCategory]);
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, bem-vindo(a)!</Text>
        <Text style={styles.title}>Onde deseja ir?</Text>
      </View>

      <FlatList
        data={places}
        keyExtractor={(item) => item.placeId}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.searchContainer}>
                <Input
                    placeholder="Buscar local específico..."
                    icon="search"
                    inputStyle={styles.inputOverride}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <Text style={styles.sectionTitle}>Categorias</Text>

            {/* GRID DE CATEGORIAS (Mais acessível e visível) */}
            <View style={styles.categoriesGrid}>
                {categorias.map((item) => (
                    <TouchableOpacity
                        key={item.nome}
                        style={[
                            styles.categoryButton,
                            selectedCategory === item.nome && styles.categoryButtonSelected
                        ]}
                        activeOpacity={0.7}
                        onPress={() => searchByCategory(item.nome)}
                    >
                        <Feather 
                            name={item.icon as any} 
                            size={24} // Ícone maior
                            color={selectedCategory === item.nome ? "#fff" : theme.colors.primary} 
                        />
                        <Text style={[
                            styles.categoryText,
                            selectedCategory === item.nome && styles.categoryTextSelected
                        ]}>
                            {item.nome}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>
                {selectedCategory ? `Resultados: ${selectedCategory}` : "Locais Próximos"}
            </Text>

            {isLoadingPlaces && (
              <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={{ marginTop: 10, color: theme.colors.textSecondary }}>Buscando locais acessíveis...</Text>
              </View>
            )}

            {!isLoadingPlaces && places.length === 0 && (
              <View style={styles.centerContainer}>
                <Feather name="map-pin" size={48} color={theme.colors.textLight} />
                <Text style={styles.emptyText}>Nenhum local encontrado</Text>
              </View>
            )}
          </>
        }
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
          />
        )}
      />

      <Menu />
    </View>
  );
}