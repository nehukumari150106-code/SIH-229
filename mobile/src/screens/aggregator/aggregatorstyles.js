import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8F6",
  },

  header: {
    backgroundColor: "#176B4D",
    padding: 20,
    paddingTop: 45,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#DCEFE7",
    marginTop: 5,
    fontSize: 14,
  },

  content: {
    padding: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#17352A",
    marginBottom: 8,
  },

  cardText: {
    color: "#66736D",
    fontSize: 14,
    marginBottom: 5,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  statTitle: {
    color: "#68756F",
    fontSize: 13,
  },

  statValue: {
    fontSize: 23,
    fontWeight: "700",
    color: "#176B4D",
    marginTop: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  material: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F332A",
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#E5F5EC",
    color: "#176B4D",
    fontSize: 12,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#176B4D",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#176B4D",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  secondaryButtonText: {
    color: "#176B4D",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7E0DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#34443D",
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#176B4D",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E5ECE8",
    borderRadius: 10,
    marginTop: 8,
    flex: 1,
    marginRight: 10,
  },

  progress: {
    height: 8,
    backgroundColor: "#176B4D",
    borderRadius: 10,
  },

  inventoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  inventoryWeight: {
    fontWeight: "700",
    color: "#17352A",
  },
});

export default styles;