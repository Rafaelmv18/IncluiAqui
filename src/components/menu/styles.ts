import { StyleSheet } from "react-native";
import { theme } from "@/src/themes";

export const styles = StyleSheet.create({
    menu:{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 80, // Um pouco mais alto para acomodar safe area
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: theme.colors.surface,

        paddingBottom: 10, // Espaço extra para barra do iPhone
        
        // Sombra para destacar do conteúdo (especialmente no mapa)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 }, // Sombra para cima
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10,
    },
    menuButton:{
        // Seus estilos de botão (caso use View customizada)
        alignItems: "center",
        justifyContent: "center",
    },
});