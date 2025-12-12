import { StyleSheet } from "react-native";
import { theme } from "@/src/themes";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 56,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    containerFocused: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.surface,
    },
    input: {
        flex: 1,
        fontSize: theme.fonts.size.md,
        color: theme.colors.textPrimary,
        height: "100%",
        marginLeft: 12,
    },
    icon: {
        // Mantemos vazio ou adicionamos ajustes se necessário
    }
});