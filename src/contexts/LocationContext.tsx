import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, Platform } from 'react-native';
import * as Location from 'expo-location';

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
        // Usar API Web Geolocation para web com alta precisão
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
            console.log('Localização obtida (Web) - Precisão:', newLocation.coords.accuracy + 'm', newLocation);
            setIsLoading(false);
          },
          (error) => {
            console.error('Erro ao obter localização (Web):', error);
            
            // Fallback para precisão menor se alta precisão falhar
            if (error.code === error.TIMEOUT || error.code === error.PERMISSION_DENIED) {
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
                  console.log('Localização obtida (Web - Fallback):', newLocation);
                  setIsLoading(false);
                },
                (fallbackError) => {
                  console.error('Erro no fallback:', fallbackError);
                  setErrorMsg('Erro ao obter localização: ' + fallbackError.message);
                  setIsLoading(false);
                },
                {
                  enableHighAccuracy: false,
                  timeout: 5000,
                  maximumAge: 60000, // 1 minuto
                }
              );
            } else {
              setErrorMsg('Erro ao obter localização: ' + error.message);
              setIsLoading(false);
            }
          },
          {
            enableHighAccuracy: true,  // Ativar alta precisão
            timeout: 15000,           // Timeout maior para permitir GPS
            maximumAge: 30000,        // Cache por apenas 30 segundos
          }
        );
      } else {
        // Para mobile, usar expo-location com alta precisão
        console.log('Iniciando localização mobile com expo-location...');
        
        // Verificar permissões
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permissão de localização negada');
          Alert.alert('Permissão necessária', 'Por favor, permita o acesso à localização para funcionar corretamente.');
          setIsLoading(false);
          return;
        }

        // Obter localização com alta precisão
        const expoLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation, // Máxima precisão
          timeInterval: 1000,      // Atualizar a cada 1 segundo
          distanceInterval: 1,     // Atualizar a cada 1 metro
        });

        const newLocation: SimpleLocation = {
          coords: {
            latitude: expoLocation.coords.latitude,
            longitude: expoLocation.coords.longitude,
            accuracy: expoLocation.coords.accuracy,
          },
          timestamp: expoLocation.timestamp,
        };
        
        setLocation(newLocation);
        console.log('📍 Localização obtida (Mobile expo-location) - Precisão:', newLocation.coords.accuracy + 'm', newLocation);
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
    setIsLoading(true);
    
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
              console.log('Nova localização obtida - Precisão:', newLocation.coords.accuracy + 'm');
              setIsLoading(false);
              resolve(newLocation);
            },
            (error) => {
              console.error('Erro ao obter posição atual:', error);
              
              // Fallback para precisão menor
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
                  console.log('Localização obtida (Fallback):', newLocation);
                  setIsLoading(false);
                  resolve(newLocation);
                },
                (fallbackError) => {
                  console.error('Erro no fallback getCurrentPosition:', fallbackError);
                  setErrorMsg('Erro ao obter localização');
                  setIsLoading(false);
                  reject(fallbackError);
                },
                {
                  enableHighAccuracy: false,
                  timeout: 5000,
                  maximumAge: 60000,
                }
              );
            },
            {
              enableHighAccuracy: true,  // Sempre tentar alta precisão primeiro
              timeout: 15000,
              maximumAge: 10000,         // Cache muito curto para posição atual
            }
          );
        });
      } else {
        // Para mobile, usar expo-location com alta precisão
        console.log('Obtendo posição atual (Mobile)...');
        
        // Verificar permissões
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permissão de localização negada');
          setIsLoading(false);
          throw new Error('Permissão de localização negada');
        }

        // Obter localização atual com máxima precisão
        const expoLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 500,       // Mais rápido para getCurrentPosition
          distanceInterval: 1,
        });

        const newLocation: SimpleLocation = {
          coords: {
            latitude: expoLocation.coords.latitude,
            longitude: expoLocation.coords.longitude,
            accuracy: expoLocation.coords.accuracy,
          },
          timestamp: expoLocation.timestamp,
        };
        
        setLocation(newLocation);
        console.log('📍 Nova posição obtida (Mobile) - Precisão:', newLocation.coords.accuracy + 'm');
        setIsLoading(false);
        return newLocation;
      }
    } catch (error) {
      console.error('Erro ao obter posição atual:', error);
      setErrorMsg('Erro ao obter localização');
      setIsLoading(false);
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
