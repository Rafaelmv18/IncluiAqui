import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        margin: 10
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
        margin: 10
    },

    buttonFilled: {
        flex: 1,
        backgroundColor: "#DB6300",
    },


});