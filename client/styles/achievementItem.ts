import { StyleSheet } from "react-native";
import { achievementColors } from "./achievementColors";

export const achievementItemStyles = StyleSheet.create({
  achievementItem: {
    width: "33.33%",
    padding: 4,
    marginBottom: 16,
  },
  iconContainer: {
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginBottom: 8,
    overflow: "hidden",
    backgroundColor: achievementColors.background,
    borderWidth: 1,
    borderColor: achievementColors.border,
  },
  icon: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  iconValue: {
    position: "absolute",
    bottom: 8,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: achievementColors.text,
  },
  itemSubtitle: {
    fontSize: 12,
    color: achievementColors.subtitle,
    textAlign: "center",
  },
}); 