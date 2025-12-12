import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { AuthHeader } from "@/src/components/authHeader";
import { theme } from "@/src/themes";

export default function Cadastrar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleNext(page: string){
    router.navigate(`../pages/${page}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header substitui o avatar antigo */}
          <AuthHeader 
            title="Criar Conta" 
            subtitle="Preencha seus dados para começar" 
          />

          <View style={styles.container}>
            <View style={{ width: "85%", alignItems: "center" }}>
              <Input
                placeholder="Nome Completo"
                value={name}
                onChangeText={setName}
                icon="user"
              />
              <Input
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                icon="mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon="lock"
                isPassword={true}
              />
              
              <View style={styles.buttonRow}>
                <Button
                  title="Cadastrar"
                  style={{ width: "100%", marginBottom: 16 }}
                  onPress={() => handleNext("login")}
                />
                
                {/* Botão Voltar opcional, estilo outline */}
                <Button
                  title="Já tenho conta"
                  style={{ 
                    backgroundColor: "transparent", 
                    borderWidth: 1, 
                    borderColor: theme.colors.primary,
                    elevation: 0,
                    shadowColor: "transparent"
                  }}
                  titleStyle={{ color: theme.colors.primary }}
                  onPress={() => router.back()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}