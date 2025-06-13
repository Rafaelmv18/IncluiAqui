import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-screens";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    map: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ccc', // cor de fundo temporária
        borderRadius: 0, // opcional
    },

    input:{
        width: width * 0.9,
    },

})