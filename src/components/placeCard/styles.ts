import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/src/themes";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        width: width * 0.9, // Ocupa 90% da tela
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        marginBottom: 20,
        alignSelf: "center", // Centraliza na lista
        overflow: "hidden", // Para a imagem não sair das bordas arredondadas
        ...theme.shadows.soft,
    },
    imageContainer: {
        width: "100%",
        height: 150, // Imagem de destaque maior
        backgroundColor: "#E1E1E1",
        justifyContent: "center",
        alignItems: "center",
    },
    placeImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    infoContainer: {
        padding: 16,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 4,
    },
    title: {
        fontSize: theme.fonts.size.lg,
        fontWeight: "bold",
        color: theme.colors.textPrimary,
        flex: 1,
        marginRight: 8,
    },
    distanceBadge: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
    },
    distanceText: {
        fontSize: theme.fonts.size.xs,
        fontWeight: "bold",
        color: theme.colors.textSecondary,
    },
    address: {
        fontSize: theme.fonts.size.sm,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    footerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF8E1", // Fundo amarelinho suave
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
    },
    ratingText: {
        fontSize: theme.fonts.size.sm,
        fontWeight: "bold",
        color: "#F5A623",
        marginLeft: 4,
    },
    reviewsText: {
        fontSize: theme.fonts.size.xs,
        color: theme.colors.textLight,
        marginLeft: 4,
    },
    // Badge de acessibilidade (exemplo)
    accessBadge: {
        flexDirection: "row",
        alignItems: "center",
    },
    accessText: {
        fontSize: theme.fonts.size.xs,
        color: theme.colors.success,
        fontWeight: "bold",
        marginLeft: 4,
    }
});