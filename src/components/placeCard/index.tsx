import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getGooglePlacePhotoUrl } from '@/src/core/api';

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
  styles: any;
}

export function PlaceCard({ place, userLatitude, userLongitude, onPress, styles }: PlaceCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(place.imageUrl || null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

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

  // Carrega a imagem quando o componente é montado
  useEffect(() => {
    const loadImage = async () => {
      if (!place.photos || place.photos.length === 0 || imageUrl) {
        return;
      }

      setIsLoadingImage(true);
      try {
        const url = await getGooglePlacePhotoUrl(place.photos[0].photoReference, 100);
        setImageUrl(url);
      } catch (error) {
        console.error('Erro ao carregar imagem:', error);
      } finally {
        setIsLoadingImage(false);
      }
    };

    loadImage();
  }, [place.photos, imageUrl]);

  const distance = calculateDistance(
    userLatitude, 
    userLongitude, 
    place.location.lat, 
    place.location.lng
  );

  const stars = place.rating ? Math.round(place.rating) : 0;

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8} 
      onPress={onPress}
    >
      <View style={styles.circle}>
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }}
            style={styles.placeImage}
            defaultSource={{ uri: 'https://via.placeholder.com/50x50?text=?' }}
          />
        ) : isLoadingImage ? (
          <Feather name="loader" size={24} color="#fff" />
        ) : (
          <Feather name="map-pin" size={24} color="#fff" />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {place.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {place.address}
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
          {place.rating && (
            <Text style={styles.ratingText}>
              {place.rating.toFixed(1)} ({place.userRatingsTotal || 0})
            </Text>
          )}
        </View>
        <Text style={styles.desc}>Distância:</Text>
        <Text style={styles.km}>{distance}</Text>
      </View>
    </TouchableOpacity>
  );
}
