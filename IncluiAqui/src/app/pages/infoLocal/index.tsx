import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { router } from "expo-router";

export default function InfoLocal() {
    const [selectedTab, setSelectedTab] = useState<"info" | "comments">("info");
    function handleNext(pages: string){
        router.navigate(`../pages/${pages}`)
    }

  return (
    <ScrollView style={styles.container}>

        <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="#DB6300" />
            <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
        </View>
      {/* HEADER COM FOTO E NOME */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.title}>Nome Lugar</Text>
          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Feather key={i} name="star" size={18} color="#ccc" />
            ))}
          </View>
          <View style={styles.distanceRow}>
            <Feather name="map-pin" size={14} color="#333" />
            <Text style={styles.distance}>5.0 Km</Text>
          </View>
        </View>

        {/* ÍCONE EXTRA À DIREITA */}
        <Feather name="coffee" size={24} color="#DB6300" style={styles.extraIcon} />
      </View>

      {/* BOTÃO DE ROTAS */}
      <TouchableOpacity 
        style={styles.routeButton}
        onPress={() => handleNext("map")}
       >
        <Feather name="navigation" size={16} color="#fff" />
        <Text style={styles.routeText}>Rotas</Text>
      </TouchableOpacity>

      {/* INFO DE CONTATO */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Feather name="phone" size={16} color="#333" />
          <Text style={styles.detailText}>(00) 00000-0000</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="map-pin" size={16} color="#333" />
          <Text style={styles.detailText}>Endereço</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="calendar" size={16} color="#333" />
          <Text style={styles.detailText}>Seg-Sex: 08:00-18:00</Text>
        </View>
      </View>

      {/* ACESSIBILIDADES */}
      <Text style={styles.accessTitle}>Acessibilidades disponíveis:</Text>
      <View style={styles.accessRow}>
        <View style={[styles.accessBadge, { backgroundColor: "#5CB3FF" }]}>
          <Text style={styles.accessText}>👁 Visual</Text>
        </View>
        <View style={[styles.accessBadge, { backgroundColor: "#FF6B6B" }]}>
          <Text style={styles.accessText}>🧠 Mentais</Text>
        </View>
        <View style={[styles.accessBadge, { backgroundColor: "#4CAF50" }]}>
          <Text style={styles.accessText}>♿ Física</Text>
        </View>
      </View>

      {/* ABAS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "info" && styles.tabSelected]}
          onPress={() => setSelectedTab("info")}
        >
          <Text style={[styles.tabText, selectedTab === "info" && styles.tabTextSelected]}>
            Informações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "comments" && styles.tabSelected]}
          onPress={() => setSelectedTab("comments")}
        >
          <Text style={[styles.tabText, selectedTab === "comments" && styles.tabTextSelected]}>
            Comentários
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO DAS ABAS */}
      {selectedTab === "info" ? (
        <View style={styles.infoContent}>
          <Text>📍 Detalhes adicionais sobre o local vão aqui.</Text>
        </View>
      ) : (
        <View style={styles.commentsContent}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <View key={i} style={styles.commentCard}>
              <Feather name="user" size={24} color="#666" />
              <View style={styles.commentInfo}>
                <Text style={styles.commentAuthor}>Maria Silva</Text>
                <Text style={styles.commentText}>
                  Excelente acessibilidade! Rampas bem construídas e funcionários atenciosos.
                </Text>
                <Text style={styles.commentDate}>2 dias atrás</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
