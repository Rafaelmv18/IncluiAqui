// src/components/ConfigPanel.tsx
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export function ConfigPanel() {
  return (
    <View style={styles.panel}>
      <Item icon="user" title="Conta" subtitle="Informações pessoais e perfil" />
      <Item icon="settings" title="Configurações" subtitle="Preferências do aplicativo" />
      <Item icon="bell" title="Notificações" subtitle="Configurar notificações" />
      <Item icon="lock" title="Privacidade" subtitle="Segurança e dados pessoais" />
      <Item icon="help-circle" title="Ajuda e Suporte" subtitle="FAQ e contato" />
    </View>
  );
}

function Item({ icon, title, subtitle }) {
  return (
    <View style={styles.item}>
      <Feather name={icon} size={20} color="#666" />
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#ccc" />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 80, // acima do menu
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  texts: {
    flex: 1,
    marginLeft: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 14
  },
  subtitle: {
    color: "#888",
    fontSize: 12
  }
});
