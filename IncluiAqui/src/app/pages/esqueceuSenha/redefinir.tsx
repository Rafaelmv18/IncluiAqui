import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { Feather } from "@expo/vector-icons";

export default function Index() {
  const [password, setPassword] = useState("");
  const pages = useState("");;

  function handleNext(pages: string){
        router.navigate(`../pages/${pages}`)
    }

  return (
    <View style={styles.container}>
      {/* Tem que alinhar o card no centro da tela */}
      <View style={styles.card}>
        <Text style={styles.title}>Redefinir Senha</Text>
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          icon="lock"
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          icon="lock"
        />

        <View style={styles.buttonRow}>
          <Button
            title="Continuar"
            style={styles.buttonFilled}
            
            onPress={() => handleNext("cadastrar")}
          />
        </View>
      </View>
    </View>

  );
}