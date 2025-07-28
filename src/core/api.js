
const API_URL = 'http://192.168.0.4:4444';

export async function searchNearbyPlaces({ latitude, longitude, radius, keyword, type }) {
  // Construir os parâmetros de query
  const params = new URLSearchParams({
    lat: latitude.toString(),
    lng: longitude.toString(),
    radius: radius.toString(),
    keyword: keyword || '',
    ...(type && { type })
  });

  try {
    const response = await fetch(`${API_URL}/api/places/search-nearby?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });


    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error:", errorData);
      throw new Error(`Erro ${response.status}: ${errorData || 'Erro ao buscar estabelecimentos próximos'}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);

    // Se for erro de rede, retornar array vazio em vez de quebrar
    if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
      console.warn("Erro de rede - retornando dados mockados");
      return [];
    }

    throw error;
  }
}

// Função auxiliar para obter URL de foto do Google Places
// export function getGooglePlacePhotoUrl(photoReference, maxWidth = 100) {
//   const API_KEY = 'AIzaSyAIyX_fXuGgz1eOqebPM1O7msgqe5_ktkQ'; // Em produção, mover para variável de ambiente
//   return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${API_KEY}`;
// }

export async function getGooglePlacePhotoUrl(photoReference, maxWidth = 100) {
  const params = new URLSearchParams({
    photoReference: photoReference,
    maxWidth: maxWidth.toString()
  });
  const response = await fetch(`${API_URL}/api/places/picture?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data.url;
}


export async function getPlaceDetails(placeId) {
  try {
    const response = await fetch(`${API_URL}/api/places/details/${placeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error:", errorData);
      throw new Error(`Erro ${response.status}: ${errorData || 'Erro ao buscar detalhes do estabelecimento'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}