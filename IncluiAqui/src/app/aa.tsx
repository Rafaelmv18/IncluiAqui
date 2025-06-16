import { useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import { router } from "expo-router"

import { Menu } from "@/src/components/menu"

import { styles } from "./styles";
import { Input } from "@/src/components/input"
import { Button } from "@/src/components/button";
import { IconButton } from "@/src/components/iconButton";
import { Feather } from "@expo/vector-icons";

export default function Dashboard(){
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  function handleNext(pages: string){
        router.navigate(`./${pages}`)
    }
    return(
      <View style={styles.container}>
        <View style={styles.map}>
          {/* Input posicionado sobre o mapa */}
          <Input
              placeholder="Buscar local"
              icon="map-pin"
              inputStyle={styles.input}
              iconStyle={styles.icon}
          />
          <Button
            title="Cadastrar"
            onPress={() => handleNext("login")}
          />
          <Menu/>
        </View>
      </View>

    )
}

