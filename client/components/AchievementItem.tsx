import React from "react";
import { View, Text, Image } from "react-native";
import { achievementItemStyles } from "@/styles/achievementItem";
import { achievementColors } from "@/styles/achievementColors";

interface AchievementItemProps {
  icon: any;
  value: string;
  title: string;
  subtitle?: string;
  color?: string;
}

export const AchievementItem = ({
  icon,
  value,
  title,
  subtitle,
}: AchievementItemProps) => {
  return (
    <View style={achievementItemStyles.achievementItem}>
      <View style={achievementItemStyles.iconContainer}>
        <Image source={icon} style={achievementItemStyles.icon} />
        {value && <Text style={achievementItemStyles.iconValue}>{value}</Text>}
      </View>
      <Text style={achievementItemStyles.itemTitle}>{title}</Text>
      {subtitle && (
        <Text style={achievementItemStyles.itemSubtitle}>{subtitle}</Text>
      )}
    </View>
  );
};
