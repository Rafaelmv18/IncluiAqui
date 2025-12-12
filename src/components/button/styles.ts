import { StyleSheet } from "react-native";
import { theme } from "@/src/themes"; // Importe o tema criado

export const styles = StyleSheet.create({
    button: {
        height: 48, // Aumentei um pouco para melhor toque (era 40)
        width: "100%", // Deixar o componente pai decidir a largura é mais flexível
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.lg,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        // Adicionando sombra sutil para dar "profundidade"
        ...theme.shadows.soft, 
    },
    title:{
        fontSize: theme.fonts.size.md,
        fontWeight: "bold",
        color: theme.colors.textInverse,
    },
});