import { View, Text, StyleSheet } from "react-native"
import { router } from "expo-router"

import { Button } from "@/src/components/button";

export default function Dashboard(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <Button title="Voltar" onPress={() => router.back()}></Button>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 42
    },
    title:{
        fontSize: 18,
        fontWeight: "bold",
    },
})