import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "@/src/themes";

type Props = {
  title: string;
  subtitle: string;
};

export function AuthHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Se tiver a logo, pode usar aqui. Por enquanto, o título */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {/* Elemento decorativo circular no fundo */}
      <View style={styles.circle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250, // Altura do cabeçalho
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 40, // Curva moderna
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    overflow: "hidden", // Para cortar o círculo decorativo
    elevation: 5,
  },
  content: {
    alignItems: "center",
    zIndex: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.textInverse,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  // Círculo decorativo sutil para dar textura
  circle: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.1)",
  }
});