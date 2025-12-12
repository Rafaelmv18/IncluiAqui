import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router } from "expo-router";

import { styles } from "../styles"; // Reusa os estilos da pasta pai
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { AuthHeader } from "@/src/components/authHeader";
import { theme } from "@/src/themes";

export default function RedefinirSenha() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleNext(page: string){
    router.navigate(`../${page}`);
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
          <AuthHeader 
            title="Nova Senha" 
            subtitle="Crie sua nova senha de acesso" 
          />

          <View style={styles.container}>
            <View style={{ width: "85%", alignItems: "center" }}>
              <Input
                placeholder="Nova Senha"
                value={password}
                onChangeText={setPassword}
                icon="lock"
                isPassword={true}
              />
              <Input
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                icon="lock"
                isPassword={true}
              />

              <View style={styles.buttonRow}>
                <Button
                  title="Redefinir"
                  style={{ width: "100%" }}
                  onPress={() => handleNext("login")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}