import { StyleSheet } from "react-native";
import { theme } from "@/src/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start", // Alinha ao topo
        alignItems: "center",
        backgroundColor: theme.colors.background,
        paddingTop: 32,
        paddingBottom: 40,
    },
    buttonRow: {
        width: "100%",
        marginTop: 24, // Espaço maior antes do botão principal
    },
});