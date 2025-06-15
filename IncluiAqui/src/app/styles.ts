import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-screens";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        position: "relative", // garante que footer absoluto funcione
    },
    map: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ccc', // cor de fundo temporária
        borderRadius: 0, // opcional
        alignItems: "center",
        paddingBottom: 80,        
    },
    input:{
        width: width * 0.9,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 10,
    },
    icon:{
        top: 20
    },
    footer:{
        position: "absolute",     // fixa na tela
        bottom: 0,                // encosta no rodapé
        width: "100%",
        height: 80,
        flexDirection: "row",     // alinha na horizontal
        justifyContent: "space-around", // espaça entre eles
        alignItems: "center",     // centraliza verticalmente
        backgroundColor: "#fff"
    },
    footerButton:{
        backgroundColor: "white",
        width: 40,
        height: 40,           // altura igual à largura para botão quadrado
        borderRadius: 20,     // deixa arredondado (opcional)
        alignItems: "center",
        justifyContent: "center",
    }
})