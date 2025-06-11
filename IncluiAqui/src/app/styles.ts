import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    },
    card: {
        width: "80%",
        padding: 24,
        borderRadius: 15,
        backgroundColor: "#fff",
        gap: 16, 

        // sombra iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        // sombra Android
        elevation: 8,
        
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12, // ou paddingHorizontal
    },

    buttonFilled: {
        flex: 1,
        backgroundColor: "#E57A00",
    },

    buttonOutline: {
        flex: 1,
        backgroundColor: "#fff",
        borderColor: "#E57A00",
        borderWidth: 1,
    },

    titleOutline: {
        color: "#E57A00",
        fontWeight: "bold",
    },
});