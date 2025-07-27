import { useLocation } from '@/src/contexts/LocationContext';
import { useEffect, useState } from 'react';
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
}

export function useCurrentLocation(): UseCurrentLocationReturn {
  const { location, getCurrentPosition, requestLocation, errorMsg, isLoading } = useLocation();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      if (Platform.OS === 'web') {
        // Para web, verificar se geolocalização está disponível
        setHasPermission(!!navigator.geolocation);
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

  return {
    location,
    isLoading,
    error: errorMsg,
    refreshLocation,
    hasPermission,
  };
}

interface UseLocationCoordinatesReturn {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  isLoading: boolean;
  error: string | null;
}

export function useLocationCoordinates(fallback = { latitude: -23.5505, longitude: -46.6333 }): UseLocationCoordinatesReturn {
  const { location, isLoading, error } = useCurrentLocation();

  return {
    latitude: location?.coords.latitude || fallback.latitude,
    longitude: location?.coords.longitude || fallback.longitude,
    accuracy: location?.coords.accuracy || null,
    isLoading,
    error,
  };
}
