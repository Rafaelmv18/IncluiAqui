import { View, Text, StyleSheet } from "react-native"
import { router } from "expo-router"

import { styles } from "./styles";
import { Input } from "@/src/components/input"
import { Button } from "@/src/components/button";
import { Feather } from "@expo/vector-icons";

export default function Dashboard(){
    return(
      <View style={styles.container}>
        <View style={styles.map}>
          {/* Input posicionado sobre o mapa */}
          <Input
            placeholder="Buscar local"
            icon="map-pin"
            inputStyle={{ backgroundColor: '#fff', margin: 16 }}
          />
                    <Input
            placeholder="Buscar local"
            icon="map-pin"
            inputStyle={{ backgroundColor: '#fff', margin: 16 }}
          />
        </View>
      </View>

    )
}

