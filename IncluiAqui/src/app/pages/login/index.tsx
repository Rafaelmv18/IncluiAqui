import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { Feather } from "@expo/vector-icons";

export default function Index() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const pages = useState("");;

  function handleNext(pages: string){
        router.navigate(`../pages/${pages}`)
    }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Feather name="user" size={48} color="#fff" />
      </View>
      {/* Tem que alinhar o card no centro da tela */}
      <View style={styles.card}>
        <Input
          placeholder="Usuário"
          value={name}
          onChangeText={setName}
          icon="user"
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon="lock"
        />
        
        <TouchableOpacity style={styles.esqueceu} onPress={() => handleNext("esqueceuSenha")}>
          <Text>Esqueceu a senha?</Text>
        </TouchableOpacity>
        

        <View style={styles.buttonRow}>
          <Button
            title="Entrar"
            style={styles.buttonFilled}
            onPress={() => handleNext("home")}
          />
          <Button
            title="Cadastrar"
            style={styles.buttonOutline}
            titleStyle={styles.titleOutline}
            onPress={() => handleNext("cadastrar")}
          />
        </View>
      </View>
    </View>


  );
}