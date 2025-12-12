import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getGooglePlacePhotoUrl } from '@/src/core/api';
import { styles } from './styles'; // Importando estilos próprios
import { theme } from '@/src/themes';

// Interfaces (mantidas)
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

interface PlaceCardProps {
  place: Place;
  userLatitude: number;
  userLongitude: number;
  onPress: () => void;
  // Removemos a prop 'styles' daqui pois agora ele tem o seu próprio
}

export function PlaceCard({ place, userLatitude, userLongitude, onPress }: PlaceCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(place.imageUrl || null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  }

  useEffect(() => {
    const loadImage = async () => {
      if (!place.photos || place.photos.length === 0 || imageUrl) return;
      setIsLoadingImage(true);
      try {
        // Aumentei maxWidth para 400 para ter melhor qualidade no card grande
        const url = await getGooglePlacePhotoUrl(place.photos[0].photoReference, 400);
        setImageUrl(url);
      } catch (error) {
        console.error('Erro ao carregar imagem:', error);
      } finally {
        setIsLoadingImage(false);
      }
    };
    loadImage();
  }, [place.photos, imageUrl]);

  const distance = calculateDistance(userLatitude, userLongitude, place.location.lat, place.location.lng);
  const rating = place.rating || 0;

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.9} 
      onPress={onPress}
    >
      {/* Imagem de Destaque (Cover) */}
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }}
            style={styles.placeImage}
          />
        ) : (
          <Feather name="map-pin" size={40} color={theme.colors.textLight} />
        )}
      </View>

      {/* Informações */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{place.name}</Text>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{distance}</Text>
          </View>
        </View>

        <Text style={styles.address} numberOfLines={2}>{place.address}</Text>

        <View style={styles.footerRow}>
          {/* Avaliação */}
          <View style={styles.ratingContainer}>
            <Feather name="star" size={14} color="#F5A623" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            <Text style={styles.reviewsText}>({place.userRatingsTotal || 0})</Text>
          </View>

          {/* Badge Visual de Acessibilidade (Simulado por enquanto) */}
          <View style={styles.accessBadge}>
            <Feather name="check-circle" size={14} color={theme.colors.success} />
            <Text style={styles.accessText}>Acessível</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}