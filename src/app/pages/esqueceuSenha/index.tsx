import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { AuthHeader } from "@/src/components/authHeader";
import { theme } from "@/src/themes";

export default function EsqueceuSenha() {
  const [email, setEmail] = useState("");

  function handleNext(page: string) {
    router.navigate(`./${page}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <AuthHeader 
            title="Recuperar Conta" 
            subtitle="Informe seu e-mail cadastrado" 
          />

          <View style={styles.container}>
            <View style={{ width: "85%", alignItems: "center" }}>
              <Input
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                icon="mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.buttonRow}>
                <Button
                  title="Continuar"
                  style={{ width: "100%" }} // Botão largura total
                  onPress={() => handleNext("esqueceuSenha/redefinir")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}