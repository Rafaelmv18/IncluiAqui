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
    categoryButtonSelected: {
        backgroundColor: "#db6300",
    },
    categoryText: {
        marginTop: 4,
        fontSize: 12,
        color: "#000",
    },
    categoryTextSelected: {
        color: "#fff",
    },
    loadingContainer: {
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: "#666",
    },
    emptyContainer: {
        paddingVertical: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
        fontWeight: "bold",
    },
    emptySubtext: {
        fontSize: 14,
        color: "#999",
        marginTop: 5,
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
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    placeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    info: {
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 2,
    },
    address: {
        fontSize: 12,
        color: "#666",
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
    },
    stars: {
        flexDirection: "row",
        marginRight: 8,
    },
    ratingText: {
        fontSize: 12,
        color: "#666",
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