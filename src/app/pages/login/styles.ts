import { StyleSheet } from "react-native";
import { theme } from "@/src/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Mudamos de 'center' para 'flex-start' para subir os inputs
        justifyContent: "flex-start", 
        alignItems: "center",
        backgroundColor: theme.colors.background,
        // Adicionamos um padding superior para não colar no Header
        paddingTop: 32, 
        paddingBottom: 40, // Espaço extra no final para scroll
    },
    // ... Mantenha os outros estilos (esqueceu, esqueceuText, etc) iguais ao passo anterior ...
    esqueceu: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 24, // Aumentei um pouco o espaço antes dos botões
    },
    esqueceuText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fonts.size.sm,
    },
    buttonRow: {
        width: "100%",
    },
    // Caso tenha sobrado algum estilo antigo não utilizado, pode remover
});