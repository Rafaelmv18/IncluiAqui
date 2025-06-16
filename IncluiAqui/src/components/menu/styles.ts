import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    menu:{
        position: "absolute",     // fixa na tela
        bottom: 0,                // encosta no rodapé
        width: "100%",
        height: 80,
        flexDirection: "row",     // alinha na horizontal
        justifyContent: "space-around", // espaça entre eles
        alignItems: "center",     // centraliza verticalmente
        backgroundColor: "#fff",
        
    },
    menuButton:{
        backgroundColor: "white",
        width: 40,
        height: 40,           // altura igual à largura para botão quadrado
        borderRadius: 20,     // deixa arredondado (opcional)
        alignItems: "center",
        justifyContent: "center",
        
    },
})