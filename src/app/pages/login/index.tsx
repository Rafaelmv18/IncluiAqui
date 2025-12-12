import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { AuthHeader } from "@/src/components/authHeader";
import { theme } from "@/src/themes";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleNext(page: string) {
    router.navigate(`../pages/${page}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* KeyboardAvoidingView empurra o conteúdo para cima quando o teclado abre */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Ajuste fino
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false} // Evita aquele efeito elástico que pode mostrar fundo branco
        >
          
          <AuthHeader 
            title="Bem-vindo" 
            subtitle="Faça login para continuar" 
          />

          <View style={styles.container}>
            <View style={{ width: "85%", alignItems: "center" }}>
              
              <Input
                placeholder="Usuário ou Email"
                value={name}
                onChangeText={setName}
                icon="user"
              />
              
              <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                isPassword={true}
                icon="lock"
              />
              
              <TouchableOpacity 
                style={styles.esqueceu} 
                onPress={() => handleNext("esqueceuSenha")}
              >
                <Text style={styles.esqueceuText}>Esqueceu a senha?</Text>
              </TouchableOpacity>

              <View style={styles.buttonRow}>
                <Button
                  title="Entrar"
                  onPress={() => handleNext("home")}
                  style={{ marginBottom: 16 }}
                />
                
                <Button
                  title="Criar Conta"
                  style={{ 
                    backgroundColor: "transparent", 
                    borderWidth: 1, 
                    borderColor: theme.colors.primary,
                    elevation: 0,
                    // Garante que não tenha sombra no iOS para o botão transparente
                    shadowColor: "transparent", 
                  }}
                  titleStyle={{ color: theme.colors.primary }}
                  onPress={() => handleNext("cadastrar")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}