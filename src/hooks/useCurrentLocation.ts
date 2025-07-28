import { useLocation } from '@/src/contexts/LocationContext';
import { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';

// Tipo simplificado para localização
interface SimpleLocation {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number | null;
  };
  timestamp: number;
}

interface UseCurrentLocationReturn {
  location: SimpleLocation | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
  hasPermission: boolean;
  accuracy: number | null;
  lastUpdated: Date | null;
  isHighAccuracy: boolean;
}

export function useCurrentLocation(): UseCurrentLocationReturn {
  const { location, getCurrentPosition, requestLocation, errorMsg, isLoading } = useLocation();
  const [hasPermission, setHasPermission] = useState(false);
  const [isHighAccuracy, setIsHighAccuracy] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    checkPermission();
    return () => {
      // Limpar watch quando componente desmontar
      if (watchIdRef.current !== null && Platform.OS === 'web') {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Verificar se a precisão é boa (menos de 100m é considerado bom)
    if (location?.coords.accuracy) {
      setIsHighAccuracy(location.coords.accuracy < 100);
    }
  }, [location]);

  const checkPermission = async () => {
    try {
      if (Platform.OS === 'web') {
        // Para web, verificar se geolocalização está disponível
        setHasPermission(!!navigator.geolocation);
        
        // Verificar permissões específicas se disponível
        if ('permissions' in navigator) {
          try {
            const result = await navigator.permissions.query({ name: 'geolocation' });
            setHasPermission(result.state === 'granted' || result.state === 'prompt');
          } catch (error) {
            setHasPermission(!!navigator.geolocation);
          }
        }
      } else {
        // Para mobile, assumir que temos permissão por enquanto
        setHasPermission(true);
      }
    } catch (error) {
      console.error('Erro ao verificar permissão:', error);
      setHasPermission(false);
    }
  };

  const refreshLocation = async () => {
    
    if (!hasPermission) {
      await requestLocation();
      await checkPermission();
    } else {
      await getCurrentPosition();
    }
  };

  // Função para iniciar monitoramento contínuo da posição (útil para navegação)
  const startWatchingPosition = () => {
    if (Platform.OS === 'web' && navigator.geolocation && hasPermission) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation: SimpleLocation = {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            },
            timestamp: position.timestamp,
          };
          // Atualizar localização no contexto
          if (location) {
            location.coords = newLocation.coords;
            location.timestamp = newLocation.timestamp;
          }
        },
        (error) => {
          console.error('Erro no watch position:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000, // Atualizar a cada 5 segundos
        }
      );
    }
  };

  const stopWatchingPosition = () => {
    if (watchIdRef.current !== null && Platform.OS === 'web') {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  return {
    location,
    isLoading,
    error: errorMsg,
    refreshLocation,
    hasPermission,
    accuracy: location?.coords.accuracy || null,
    lastUpdated: location ? new Date(location.timestamp) : null,
    isHighAccuracy,
  };
}

interface UseLocationCoordinatesReturn {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
  lastUpdated: Date | null;
  isHighAccuracy: boolean;
  distanceFromFallback: number | null;
}

export function useLocationCoordinates(fallback = { latitude: -23.5505, longitude: -46.6333 }): UseLocationCoordinatesReturn {
  const { location, isLoading, error, refreshLocation, accuracy, lastUpdated, isHighAccuracy } = useCurrentLocation();

  // Calcular distância do fallback para detectar se está usando coordenadas padrão
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const currentLat = location?.coords.latitude || fallback.latitude;
  const currentLng = location?.coords.longitude || fallback.longitude;
  
  const distanceFromFallback = location ? 
    calculateDistance(currentLat, currentLng, fallback.latitude, fallback.longitude) : 
    null;

  return {
    latitude: currentLat,
    longitude: currentLng,
    accuracy,
    isLoading,
    error,
    refreshLocation,
    lastUpdated,
    isHighAccuracy,
    distanceFromFallback,
  };
}
