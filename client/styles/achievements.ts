import { StyleSheet } from "react-native";
import { achievementColors } from "./achievementColors";

export const achievementStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: achievementColors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: achievementColors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: achievementColors.text,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    marginLeft: 4,
    color: achievementColors.text,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  bottomPadding: {
    height: 80,
  },
}); 