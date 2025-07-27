import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { router } from "expo-router";
import { useLocation } from "@/src/contexts/LocationContext";

export default function Splash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
  const { requestLocation } = useLocation();

  function handleNext(pages: string) {
    router.navigate(`../pages/${pages}`);
  }

  useEffect(() => {
    // Animações da splash screen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Solicitar permissão de localização
    requestLocation();

    // Timer para navegar para a próxima tela
    const timer = setTimeout(() => {
      handleNext("login");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#db6300",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
});
