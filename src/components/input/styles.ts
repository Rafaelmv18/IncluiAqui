import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    input: {
        width: 266,
        height: 48,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#121214',
        padding: 10,
        fontSize: 16,
        color: '#333',
        paddingLeft: 30,
        paddingTop: 12,
    },
    icon: {
        position: 'absolute', // Posiciona o ícone de forma absoluta dentro do container
        left: 5, // Alinha o ícone à esquerda dentro do padding do container
        top: 11,
        color: '#E57A00'
    },

    // error: {
    //     fontSize: 12,
    //     color: "#DC1637",
    //     marginLeft: 10,
        
    // }
})