import { View, Text, StyleSheet } from "react-native"
import { router } from "expo-router"

import { styles } from "./styles";
import { Input } from "@/src/components/input"
import { Button } from "@/src/components/button";
import { Feather } from "@expo/vector-icons";

export default function Dashboard(){
    return(
        <View style={styles.container}>
            <Input
                placeholder="Buscar local"
                icon="map-pin"
            />
            <Text style={styles.title}>Dashboard</Text>
            <Button title="Voltar" onPress={() => router.back()}></Button>
        </View>
    )
}

