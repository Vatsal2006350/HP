import { router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type IconName = 'code' | 'psychology' | 'lightbulb' | 'book';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  lessons: number;
  completed: number;
  gradient: string;
}

const CourseCard = ({
  id,
  title,
  description,
  icon,
  lessons,
  completed,
}: CourseCardProps) => {
  const completion = Math.round((completed / lessons) * 100);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: "/(tabs)/course/[id]",
        params: { id }
      })}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialIcons name={icon} size={24} color="white" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completed}/{lessons} lessons completed
          </Text>
          <Text style={styles.progressPercentage}>{completion}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${completion}%` }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#4c1d95', // violet-900
    marginBottom: 16,
  },
  content: {
    padding: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  progressText: {
    fontSize: 14,
    color: 'white',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
  },
});

export default CourseCard;
