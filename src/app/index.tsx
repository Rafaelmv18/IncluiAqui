import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated} from "react-native";
import { router } from "expo-router";

export default function Splash() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    function handleNext(pages: string){
        router.navigate(`../pages/${pages}`)
    }
    useEffect(() => {
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

        const timer = setTimeout(() => {
        handleNext("login");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
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
  logo: {
    width: 250,
    height: 250,
  },
});