import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, Platform } from 'react-native';

// Tipo simplificado para localização
interface SimpleLocation {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number | null;
  };
  timestamp: number;
}

interface LocationContextType {
  location: SimpleLocation | null;
  errorMsg: string | null;
  isLoading: boolean;
  requestLocation: () => Promise<void>;
  getCurrentPosition: () => Promise<SimpleLocation | null>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [location, setLocation] = useState<SimpleLocation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestLocation = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (Platform.OS === 'web') {
        // Usar API Web Geolocation para web
        if (!navigator.geolocation) {
          throw new Error('Geolocalização não é suportada neste navegador');
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation: SimpleLocation = {
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
              },
              timestamp: position.timestamp,
            };
            setLocation(newLocation);
            console.log('Localização obtida (Web):', newLocation);
            setIsLoading(false);
          },
          (error) => {
            console.error('Erro ao obter localização (Web):', error);
            setErrorMsg('Erro ao obter localização: ' + error.message);
            setIsLoading(false);
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000, // 5 minutos
          }
        );
      } else {
        // Para mobile, usar uma localização padrão temporariamente
        // Isso pode ser substituído por expo-location quando o problema for resolvido
        const defaultLocation: SimpleLocation = {
          coords: {
            latitude: -23.5505, // São Paulo
            longitude: -46.6333,
            accuracy: null,
          },
          timestamp: Date.now(),
        };
        
        setLocation(defaultLocation);
        console.log('Usando localização padrão (Mobile):', defaultLocation);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      setErrorMsg('Erro ao obter localização');
      Alert.alert('Erro', 'Não foi possível obter sua localização atual.');
      setIsLoading(false);
    }
  };

  const getCurrentPosition = async (): Promise<SimpleLocation | null> => {
    try {
      if (Platform.OS === 'web' && navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const newLocation: SimpleLocation = {
                coords: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  accuracy: position.coords.accuracy,
                },
                timestamp: position.timestamp,
              };
              setLocation(newLocation);
              resolve(newLocation);
            },
            (error) => {
              console.error('Erro ao obter posição atual:', error);
              setErrorMsg('Erro ao obter localização');
              reject(error);
            },
            {
              enableHighAccuracy: false,
              timeout: 10000,
              maximumAge: 300000,
            }
          );
        });
      } else {
        // Retornar localização padrão para mobile temporariamente
        const defaultLocation: SimpleLocation = {
          coords: {
            latitude: -23.5505, // São Paulo
            longitude: -46.6333,
            accuracy: null,
          },
          timestamp: Date.now(),
        };
        
        setLocation(defaultLocation);
        return defaultLocation;
      }
    } catch (error) {
      console.error('Erro ao obter posição atual:', error);
      setErrorMsg('Erro ao obter localização');
      return null;
    }
  };

  const value: LocationContextType = {
    location,
    errorMsg,
    isLoading,
    requestLocation,
    getCurrentPosition,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation deve ser usado dentro de um LocationProvider');
  }
  return context;
}
