import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { router, useLocalSearchParams } from "expo-router";
import { getPlaceDetails } from "../../../core/api";

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
  imageUrl?: string | null;
}

interface Review {
  id: string;
  title: string;
  comment: string;
  rating: number;
  createdAt: string;
  owner: {
    id: string;
    name: string;
  };
}

interface EstablishmentData {
  id?: string;
  name: string;
  description?: string;
  phone?: string;
  category: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  accessibilityScore?: number;
  reviews?: Review[];
  _count?: {
    reviews: number;
  };
}

export default function InfoLocal() {
  const [selectedTab, setSelectedTab] = useState<"info" | "comments">("info");
  const [isLoading, setIsLoading] = useState(true);
  const [establishmentData, setEstablishmentData] =
    useState<EstablishmentData | null>(null);
  const [placeDetails, setPlaceDetails] = useState<any>(null);

  // Obter parâmetros da navegação
  const params = useLocalSearchParams();
  const { placeId, placeName, placeData } = params;

  useEffect(() => {
    loadEstablishmentData();
  }, [placeId]);

  const loadEstablishmentData = async () => {
    try {
      setIsLoading(true);

      // Se tivermos dados do place vindos da busca, usar eles primeiro
      if (placeData && typeof placeData === "string") {
        try {
          const parsedPlace: Place = JSON.parse(placeData);
          setPlaceDetails(parsedPlace);
        } catch (e) {
          console.warn("Erro ao fazer parse dos dados do place:", e);
        }
      }

      // Tentar buscar detalhes mais completos da API
      if (placeId) {
        try {
          // Primeiro, tentar buscar pelos estabelecimentos cadastrados
          // Se não encontrar, buscar detalhes do Google Places
          const details = await getPlaceDetails(placeId);
          setPlaceDetails(details);
          setEstablishmentData(details);
          if (details) {
            getReviews();
          }
        } catch (error) {
          console.warn("Erro ao buscar detalhes do place:", error);
          // Se falhar, usar dados locais se disponíveis
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do estabelecimento:", error);
      Alert.alert(
        "Erro",
        "Não foi possível carregar os dados do estabelecimento"
      );
    } finally {
      setIsLoading(false);
    }
  };

  function handleNext(pages: string) {
    router.navigate(`../pages/${pages}`);
  }

  // Funções auxiliares para formatar dados
  const getFormattedAddress = () => {
    if (establishmentData) {
      const parts = [
        establishmentData.street,
        establishmentData.number,
        establishmentData.neighborhood,
        establishmentData.city,
        establishmentData.state,
      ].filter(Boolean);
      return parts.join(", ") || "Endereço não disponível";
    }
    return placeDetails?.address || "Endereço não disponível";
  };

  const getPhoneNumber = () => {
    return establishmentData?.phone || placeDetails?.phone || "(00) 00000-0000";
  };

  const getName = () => {
    return (
      establishmentData?.name ||
      placeDetails?.name ||
      placeName ||
      "Nome não disponível"
    );
  };

  const getRating = () => {
    return establishmentData?.accessibilityScore || placeDetails?.rating || 0;
  };

  const getCategory = () => {
    const categoryMap: { [key: string]: string } = {
      RESTAURANT: "🍴",
      CAFE: "☕",
      STORE: "🏪",
      HOTEL: "🏨",
      SERVICE: "🔧",
      LEISURE: "🎯",
      HEALTH: "🏥",
      OTHER: "📍",
    };

    if (establishmentData?.category) {
      return categoryMap[establishmentData.category] || "📍";
    }

    // Tentar inferir categoria dos tipos do Google Places
    if (placeDetails?.types) {
      if (placeDetails.types.includes("restaurant")) return "🍴";
      if (placeDetails.types.includes("cafe")) return "☕";
      if (placeDetails.types.includes("store")) return "🏪";
      if (placeDetails.types.includes("lodging")) return "🏨";
      if (placeDetails.types.includes("hospital")) return "🏥";
    }

    return "📍";
  };

  const getAccessibilityFeatures = () => {
    const features = [
      // { name: "👁 Visual", color: "#5CB3FF" },
      // { name: "🧠 Mentais", color: "#FF6B6B" },
      // { name: "♿ Física", color: "#4CAF50" },
    ];

    const acc = placeDetails?.accessibility;
    if (acc) {
      features.push(
        {
          name: acc.entrance
            ? "✅ Entrada para cadeirantes"
            : "❌ Sem entrada acessível",
          color: acc.entrance ? "#4CAF50" : "#FF6B6B",
        },
        {
          name: acc.restroom
            ? "✅ Banheiro acessível"
            : "❌ Sem banheiro acessível",
          color: acc.restroom ? "#4CAF50" : "#FF6B6B",
        },
        {
          name: acc.seating
            ? "✅ Assentos acessíveis"
            : "❌ Sem assentos acessíveis",
          color: acc.seating ? "#4CAF50" : "#FF6B6B",
        },
        {
          name: acc.parking
            ? "✅ Estacionamento acessível"
            : "❌ Sem estacionamento acessível",
          color: acc.parking ? "#4CAF50" : "#FF6B6B",
        }
      );
    } else {
      features.push({ name: "ℹ️ Acessibilidade não informada", color: "#999" });
    }

    return features;
  };

  const getReviews = () => {
    return establishmentData?.reviews || placeDetails?.reviews || [];
  };

  const getOpeningHours = () => {
    if (!placeDetails?.openingHours) {
      return "Horário não informado";
    }

    // Se openingHours for uma string, retornar diretamente
    if (typeof placeDetails.openingHours === "string") {
      return placeDetails.openingHours;
    }

    // Se for um objeto com propriedades específicas
    if (typeof placeDetails.openingHours === "object") {
      const hours = placeDetails.openingHours;

      // Verificar se está aberto agora
      if (hours.openNow !== undefined) {
        const status = hours.openNow ? "Aberto agora" : "Fechado agora";

        // Se tiver horários da semana, mostrar o primeiro
        if (
          hours.weekdayText &&
          Array.isArray(hours.weekdayText) &&
          hours.weekdayText.length > 0
        ) {
          return `${status} • ${hours.weekdayText[0]}`;
        }

        return status;
      }

      // Se tiver apenas os horários da semana
      if (
        hours.weekdayText &&
        Array.isArray(hours.weekdayText) &&
        hours.weekdayText.length > 0
      ) {
        return hours.weekdayText[0]; // Mostrar apenas o primeiro horário
      }
    }

    return "Horário não informado";
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#DB6300" />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Carregando detalhes...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#DB6300" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
      {/* HEADER COM FOTO E NOME */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.title}>{getName()}</Text>
          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Feather
                key={i}
                name="star"
                size={18}
                color={i < Math.round(getRating()) ? "#f5a623" : "#ccc"}
              />
            ))}
          </View>
          <View style={styles.distanceRow}>
            <Feather  size={14} color="#333" />
            <Text style={styles.distance}>
              {getRating() > 0
                ? `${getRating().toFixed(1)} ⭐`
                : "Sem avaliações"}
            </Text>
          </View>
        </View>

        {/* ÍCONE EXTRA À DIREITA */}
        <Text style={[styles.extraIcon, { fontSize: 24 }]}>
          {getCategory()}
        </Text>
      </View>

      {/* BOTÃO DE ROTAS */}
      <TouchableOpacity
        style={styles.routeButton}
        onPress={() => {
          const latitude = establishmentData?.latitude || placeDetails?.location?.lat;
          const longitude = establishmentData?.longitude || placeDetails?.location?.lng;
          const name = getName();
          const address = getFormattedAddress();
          router.push({
            pathname: '../pages/map',
            params: {
              latitude: latitude?.toString() || '',
              longitude: longitude?.toString() || '',
              name,
              address,
            },
          });
        }}
      >
        <Feather name="navigation" size={16} color="#fff" />
        <Text style={styles.routeText}>Rotas</Text>
      </TouchableOpacity>

      {/* INFO DE CONTATO */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Feather name="phone" size={16} color="#333" />
          <Text style={styles.detailText}>{getPhoneNumber()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="map-pin" size={16} color="#333" />
          <Text style={styles.detailText}>{getFormattedAddress()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="calendar" size={16} color="#333" />
          <Text style={styles.detailText}>{getOpeningHours()}</Text>
        </View>
      </View>

      {/* ACESSIBILIDADES */}
      <Text style={styles.accessTitle}>Acessibilidades disponíveis:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.accessRow}
      >
        {getAccessibilityFeatures().map((feature, index) => (
          <View
            key={index}
            style={[styles.accessBadge, { backgroundColor: feature.color }]}
          >
            <Text style={styles.accessText}>{feature.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* ABAS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "info" && styles.tabSelected,
          ]}
          onPress={() => setSelectedTab("info")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "info" && styles.tabTextSelected,
            ]}
          >
            Informações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "comments" && styles.tabSelected,
          ]}
          onPress={() => setSelectedTab("comments")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "comments" && styles.tabTextSelected,
            ]}
          >
            Comentários
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO DAS ABAS */}
      {selectedTab === "info" ? (
        <View style={styles.infoContent}>
          <Text style={styles.infoDescription}>
            {establishmentData?.description ||
              placeDetails?.description ||
              "Detalhes adicionais sobre o local não estão disponíveis no momento."}
          </Text>

          {placeDetails?.website && (
            <View style={styles.detailRow}>
              <Feather name="globe" size={16} color="#333" />
              <Text style={styles.detailText}>{placeDetails.website}</Text>
            </View>
          )}

          {establishmentData?.category && (
            <View style={styles.detailRow}>
              <Feather name="tag" size={16} color="#333" />
              <Text style={styles.detailText}>
                Categoria:{" "}
                {establishmentData.category.replace("_", " ").toLowerCase()}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.commentsContent}>
          {getReviews().length > 0 ? (
            getReviews().map((review, index) => (
              <View key={review.id || index} style={styles.commentCard}>
                <Feather name="user" size={24} color="#666" />
                <View style={styles.commentInfo}>
                  <Text style={styles.commentAuthor}>
                    {review.owner?.name || "Usuário"}
                  </Text>
                  <View style={styles.ratingRow}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Feather
                        key={i}
                        name="star"
                        size={14}
                        color={i < review.rating ? "#f5a623" : "#ccc"}
                      />
                    ))}
                    <Text style={styles.ratingNumber}>({review.rating}/5)</Text>
                  </View>
                  {review.title && (
                    <Text style={styles.commentTitle}>{review.title}</Text>
                  )}
                  <Text style={styles.commentText}>
                    {review.comment || "Sem comentário adicional."}
                  </Text>
                  <Text style={styles.commentDate}>
                    {new Date(review.createdAt).toLocaleDateString("pt-BR")}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noCommentsContainer}>
              <Feather name="message-circle" size={48} color="#ccc" />
              <Text style={styles.noCommentsText}>
                Ainda não há comentários para este estabelecimento.
              </Text>
              <Text style={styles.noCommentsSubtext}>
                Seja o primeiro a avaliar!
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
