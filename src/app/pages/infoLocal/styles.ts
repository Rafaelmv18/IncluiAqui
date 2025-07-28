import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1
  },

  /* ✅ NOVOS ESTILOS PARA O BOTÃO VOLTAR */
  topBar: {
    marginBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#DB6300",
    marginLeft: 6,
    fontWeight: "bold",
    fontSize: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#ccc",
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  stars: {
    flexDirection: "row",
    marginVertical: 4,
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    marginLeft: 4,
    fontSize: 14,
    color: "#555",
  },
  extraIcon: {
    marginLeft: 8,
  },
  routeButton: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginTop: 12,
    alignItems: "center",
  },
  routeText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
  details: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detailText: {
    marginLeft: 8,
    color: "#333",
  },
  accessTitle: {
    marginTop: 16,
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  accessRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  accessBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  accessText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* TABS */
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderColor: "#DB6300",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
  tabTextSelected: {
    color: "#DB6300",
    fontWeight: "bold",
  },

  /* CONTEÚDO ABA */
  infoContent: {
    padding: 10,
    marginTop: 10,
  },
  commentsContent: {
    padding: 10,
    marginTop: 10,
  },
  commentCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "flex-start"
  },
  commentInfo: {
    marginLeft: 10,
    flex: 1
  },
  commentAuthor: {
    fontWeight: "bold",
    color: "#333"
  },
  commentText: {
    marginVertical: 4,
    color: "#555"
  },
  commentDate: {
    fontSize: 12,
    color: "#999"
  },

  /* NOVOS ESTILOS PARA DADOS DINÂMICOS */
  infoDescription: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 10
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4
  },
  ratingNumber: {
    fontSize: 12,
    color: "#666",
    marginLeft: 6
  },
  commentTitle: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 14,
    marginVertical: 2
  },
  noCommentsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginTop: 10
  },
  noCommentsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 12,
    fontWeight: "500"
  },
  noCommentsSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 4
  }
});
