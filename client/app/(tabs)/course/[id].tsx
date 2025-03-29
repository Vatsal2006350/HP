import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CourseHeader from '../../../components/CourseHeader';
import { MaterialIcons } from '@expo/vector-icons';

// This would typically come from an API or database
const getCourseData = (id: string) => {
  const courses = {
    '1': {
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming with this comprehensive course',
      progress: 30,
      gradient: 'bg-gradient-to-br from-violet-500 to-violet-900',
    },
    '2': {
      title: 'Problem Solving',
      description: 'Master the art of problem solving and algorithmic thinking',
      progress: 0,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-900',
    },
    '3': {
      title: 'Creative Thinking',
      description: 'Develop your creative thinking and innovation skills',
      progress: 15,
      gradient: 'bg-gradient-to-br from-green-500 to-green-900',
    },
  };
  return courses[id as keyof typeof courses];
};

export default function CourseScreen() {
  const { id } = useLocalSearchParams();
  const course = getCourseData(id as string);

  return (
    <View style={styles.container}>
      <CourseHeader
        title={course.title}
        description={course.description}
        progress={course.progress}
        gradient={course.gradient}
        icon={<MaterialIcons name="book" size={32} color="white" />}
      />
      {/* Add course content, lessons list, etc. here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 