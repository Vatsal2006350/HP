import React from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AchievementItem } from "@/components/AchievementItem";
import { achievementStyles } from "@/styles/achievements";

export default function AchievementsScreen() {
  // placeholder icon
  const placeholderIcon = require("@/assets/images/icon.png");

  return (
    <SafeAreaView style={achievementStyles.container} edges={["top"]}>
      <View style={achievementStyles.header}>
        <Text style={achievementStyles.headerTitle}>Achievements</Text>
      </View>

      <ScrollView
        style={achievementStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* personal records - use dummy data for now */}
        <View style={achievementStyles.section}>
          <Text style={achievementStyles.sectionTitle}>Personal Records</Text>
          <View style={achievementStyles.achievementsGrid}>
            <AchievementItem
              icon={placeholderIcon}
              value="360"
              title="Hottest Streak"
              subtitle="Feb 2, 2023"
            />
            <AchievementItem
              icon={placeholderIcon}
              value="25"
              title="Perfect Lessons"
              subtitle="Dec 10, 2022"
            />
            <AchievementItem
              icon={placeholderIcon}
              value="15"
              title="New Record"
              subtitle="Jan 15, 2023"
            />
          </View>
        </View>

        {/* awards - use dummy data for now */}
        <View style={achievementStyles.section}>
          <Text style={achievementStyles.sectionTitle}>Awards</Text>
          <View style={achievementStyles.achievementsGrid}>
            <AchievementItem
              icon={placeholderIcon}
              value="50"
              title="Quest Explorer"
              subtitle="2 of 10"
            />
            <AchievementItem
              icon={placeholderIcon}
              value="10"
              title="Cheerleader"
              subtitle="2 of 10"
            />
            <AchievementItem
              icon={placeholderIcon}
              value="10"
              title="Mistake Mechanic"
              subtitle="2 of 10"
            />
            <AchievementItem
              icon={placeholderIcon}
              value="20"
              title="Quest Explorer"
            />
            <AchievementItem
              icon={placeholderIcon}
              value="10"
              title="Quest Explorer"
            />
            <AchievementItem
              icon={placeholderIcon}
              value="10"
              title="Quest Explorer"
            />
          </View>
        </View>

        <View style={achievementStyles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}
