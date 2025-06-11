import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";
import { Input } from "../components/input";
import { Button } from "../components/button";

export default function Index() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
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
        <View style={styles.buttonRow}>
            <Button 
                title="Entrar" 
                style={styles.buttonFilled}
                
            />
            <Button 
                title="Cadastrar" 
                style={styles.buttonOutline}
                titleStyle={styles.titleOutline} 
            />
        </View>

      </View>
    </View>
  );
}