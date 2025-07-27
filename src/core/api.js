
const API_URL = 'http://localhost:4444';

export async function searchNearbyPlaces({ latitude, longitude, radius, keyword, type }) {
  // Construir os parâmetros de query
  const params = new URLSearchParams({
    lat: latitude.toString(),
    lng: longitude.toString(),
    radius: radius.toString(),
    keyword: keyword || '',
    ...(type && { type })
  });

  const response = await fetch(`${API_URL}/api/places/search-nearby?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log("API Response:", response);

  if (!response.ok) {
    const errorData = await response.text();
    console.error("API Error:", errorData);
    throw new Error('Erro ao buscar estabelecimentos próximos');
  }

  return response.json();
}