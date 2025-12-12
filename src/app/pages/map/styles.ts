import { StyleSheet, Dimensions, Platform } from "react-native";
import { theme } from "@/src/themes";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    map: {
        ...StyleSheet.absoluteFillObject, // Preenche a tela toda
    },
    
    // --- BARRA DE BUSCA FLUTUANTE ---
    searchContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 50, // Ajuste para StatusBar
        width: width * 0.9, // 90% da largura
        alignSelf: "center",
        zIndex: 10, // Garante que fique acima do mapa
    },
    // Estilo específico para o Input ficar bonito sobre o mapa
    inputOverride: {
        backgroundColor: theme.colors.surface,
        borderWidth: 0,
        height: 50,
        ...theme.shadows.medium, // Sombra para destacar do mapa
    },

    // --- MARCADOR PERSONALIZADO ---
    markerContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: theme.colors.surface,
        borderWidth: 3,
        borderColor: theme.colors.primary,
        ...theme.shadows.soft,
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    
    // --- BALÃO DE INFORMAÇÃO (CALLOUT) ---
    calloutContainer: {
        width: 160,
        padding: 12,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.sm,
        alignItems: "center",
        justifyContent: "center",
    },
    calloutTitle: {
        fontWeight: "bold",
        fontSize: theme.fonts.size.sm,
        color: theme.colors.textPrimary,
        marginBottom: 4,
        textAlign: "center",
    },
    calloutText: {
        fontSize: theme.fonts.size.xs,
        color: theme.colors.textSecondary,
        textAlign: "center",
    },
});