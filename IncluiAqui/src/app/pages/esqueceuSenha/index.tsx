import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { Feather } from "@expo/vector-icons";

export default function Index() {
  const [email, setEmail] = useState("");
  const pages = useState("");;

  function handleNext(pages: string){
        router.navigate(`./${pages}`)
    }

  return (
    <View style={styles.container}>
      {/* Tem que alinhar o card no centro da tela */}
      <View style={styles.card}>
        <Text style={styles.title}>Redefinir Senha</Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          icon="mail"
        />

        <View style={styles.buttonRow}>
          <Button
            title="Continuar"
            style={styles.buttonFilled}
            
            onPress={() => handleNext("redefinir")}
          />
        </View>
      </View>
    </View>


  );
}