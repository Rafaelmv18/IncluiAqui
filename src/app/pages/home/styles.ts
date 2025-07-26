import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-screens";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    input:{
        width: width * 0.9,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 10,
    },
    icon: {
        color: "#000",
    },
    grid: {
        width: width * 0.9,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 12,
    },
    categoryButton: {
        width: "30%",
        aspectRatio: 1.5, // mantém altura proporcional
        backgroundColor: "#f5a623",
        marginBottom: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    categoryText: {
        marginTop: 4,
        fontSize: 12,
        color: "#000",
    },
    lista: {
        paddingBottom: 80,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 10,
        padding: 12,
        marginVertical: 6,
        alignItems: "center",
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#db6300",
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
    },
    stars: {
        flexDirection: "row",
        marginVertical: 2,
    },
    desc: {
        fontSize: 12,
        color: "#666",
    },
    km: {
        fontSize: 12,
        color: "#333",
    },
});