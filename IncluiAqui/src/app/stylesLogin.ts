import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    },
    avatar:{
        width: 80,
        height: 80,
        borderRadius: "50%",
        backgroundColor: "#DB6300",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        elevation: 8,

        // sombra iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    card: {
        alignItems: "center",
        width: 300,
        padding: 24,
        borderRadius: 15,
        backgroundColor: "#fff", 
        gap: 10,

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
        backgroundColor: "#DB6300",
    },

    buttonOutline: {
        flex: 1,
        backgroundColor: "#fff",
        borderColor: "#DB6300",
        borderWidth: 1,
    },

    titleOutline: {
        color: "#DB6300",
        fontWeight: "bold",
    },

   esqueceu: {
    width: "100%",
        alignItems: "flex-end",
        textAlign: "right",
    }

});