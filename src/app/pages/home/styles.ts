import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/src/themes";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    // Header
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    greeting: {
        fontSize: theme.fonts.size.sm,
        color: theme.colors.textSecondary,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: theme.colors.textPrimary,
        marginTop: 4,
    },
    
    // Busca
    searchContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    inputOverride: {
        width: "100%",
        backgroundColor: theme.colors.surface,
        ...theme.shadows.soft,
        borderWidth: 0,
        height: 56, // Altura confortável
    },

    // --- NOVA ÁREA DE CATEGORIAS (GRID) ---
    categoriesGrid: {
        flexDirection: "row",
        flexWrap: "wrap", // Permite quebrar linha
        justifyContent: "space-between", // Espalha os itens
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    categoryButton: {
        width: "48%", // Quase metade da tela (2 colunas)
        height: 70,   // Altura generosa para acessibilidade
        backgroundColor: theme.colors.surface,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start", // Alinha à esquerda para leitura
        paddingHorizontal: 16,
        marginBottom: 12, // Espaço vertical entre linhas
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: "transparent", // Borda invisível por padrão
        ...theme.shadows.soft, // Sombra suave
    },
    categoryButtonSelected: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    categoryText: {
        fontSize: 13, // Texto maior
        fontWeight: "bold",
        color: theme.colors.textPrimary,
        marginLeft: 12, // Espaço entre ícone e texto
        flex: 1, // Permite que o texto quebre linha se necessário
    },
    categoryTextSelected: {
        color: theme.colors.textInverse,
    },
    // --------------------------------------

    sectionTitle: {
        fontSize: 20, // Título da seção maior
        fontWeight: "bold",
        color: theme.colors.textPrimary,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 16,
    },

    // Lista e Estados
    listContent: {
        paddingTop: 10,
        paddingBottom: 100,
    },
    centerContainer: {
        padding: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        marginTop: 16,
        fontWeight: "bold",
    },
});