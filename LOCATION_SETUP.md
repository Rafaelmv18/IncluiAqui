# Soluções para Problemas de Localização - IncluiAqui

## Problema com expo-location

O projeto estava apresentando erro com o módulo `expo-location` devido a um arquivo ausente (`LocationSubscribers`). 

### Soluções Implementadas:

#### 1. Implementação Temporária sem expo-location

Foi criada uma implementação alternativa no `LocationContext.tsx` que:

- **Para Web**: Usa a API nativa `navigator.geolocation` do navegador
- **Para Mobile**: Usa coordenadas padrão de São Paulo como fallback

#### 2. Estrutura Criada:

- `src/contexts/LocationContext.tsx` - Contexto global para gerenciar localização
- `src/hooks/useCurrentLocation.ts` - Hook personalizado para facilitar o uso
- `src/hooks/useLocationCoordinates.ts` - Hook para obter apenas as coordenadas

### Como Usar:

```tsx
// Em qualquer componente
import { useLocationCoordinates } from '@/src/hooks/useCurrentLocation';

function MyComponent() {
  const { latitude, longitude, isLoading, error } = useLocationCoordinates();
  
  // Use latitude e longitude para fazer chamadas à API
  useEffect(() => {
    if (!isLoading) {
      fetchNearbyPlaces({ latitude, longitude });
    }
  }, [latitude, longitude, isLoading]);
}
```

### Coordenadas Padrão:

- **Latitude**: -23.5505 (São Paulo)
- **Longitude**: -46.6333 (São Paulo)

### Para Resolver Definitivamente:

1. **Atualizar expo-location**:
   ```bash
   npm uninstall expo-location
   npx expo install expo-location@latest
   ```

2. **Ou usar uma versão específica que funciona**:
   ```bash
   npx expo install expo-location@17.0.1
   ```

3. **Limpar cache sempre**:
   ```bash
   npx expo start --clear
   ```

### Funcionalidades Implementadas:

1. ✅ Detecção automática de plataforma (Web vs Mobile)
2. ✅ Fallback para coordenadas padrão
3. ✅ Contexto global para compartilhar localização
4. ✅ Hooks personalizados para facilitar o uso
5. ✅ Tratamento de erros
6. ✅ Estado de loading

### Próximos Passos:

1. Testar em dispositivos móveis reais
2. Implementar permissões adequadas para mobile
3. Adicionar configurações de precisão da localização
4. Implementar cache de localização no AsyncStorage

### API Backend:

O backend está configurado para receber as coordenadas e buscar estabelecimentos próximos usando a API do Google Places. A chamada corrigida no `api.js` agora constrói corretamente a URL com parâmetros de query.
