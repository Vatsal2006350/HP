"use client";

import React, { useState } from "react";
// removed framer-motion - was causing issues
// import { motion } from "framer-motion";

// import styles
import {
  container,
  title,
  coursesContainer,
  coursePathContainer,
  pathLine,
  courseNode,
  courseTitle,
  sectionTitle,
  lessonsGrid,
  lessonCard,
  lessonHeader,
  lessonTitle,
  lessonDescription,
  lessonFooter,
  duration,
  actionButton,
  emptyState,
  getCourseButtonStyle,
  getStatusBadgeStyle
} from "../styles/dashboard.styles";

// data types
interface Course {
  id: string;
  title: string;
}

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

// sample data - replace with real data later
const sampleCourses: Course[] = [
  { id: "c1", title: "Introduction" },
  { id: "c2", title: "Fundamentals" },
  { id: "c3", title: "Intermediate" },
  { id: "c4", title: "Advanced" },
  { id: "c5", title: "Mastery" },
];

const sampleLessons: Lesson[] = [
  {
    id: "l1",
    courseId: "c1",
    title: "Getting Started",
    description: "Learn the basics",
    duration: "15 min",
    completed: true,
  },
  {
    id: "l2",
    courseId: "c1",
    title: "Core Concepts",
    description: "Understanding the foundation",
    duration: "20 min",
    completed: true,
  },
  {
    id: "l3",
    courseId: "c2",
    title: "Key Principles",
    description: "Building blocks of knowledge",
    duration: "25 min",
    completed: false,
  },
  {
    id: "l4",
    courseId: "c2",
    title: "Practical Applications",
    description: "Applying what you learned",
    duration: "30 min",
    completed: false,
  },
  {
    id: "l5",
    courseId: "c3",
    title: "Advanced Techniques",
    description: "Taking it to the next level",
    duration: "35 min",
    completed: false,
  },
];

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState<string>(
    sampleCourses[0].id
  );

  // filter lessons for selected course
  const filteredLessons = sampleLessons.filter(
    (lesson) => lesson.courseId === selectedCourse
  );

  return (
    <div style={container}>
      <h1 style={title}>Learning Dashboard</h1>

      {/* course path visualization */}
      <div style={coursesContainer}>
        <div style={coursePathContainer}>
          {/* horizontal connecting line */}
          <div style={pathLine} />

          {/* course nodes */}
          {sampleCourses.map((course, index) => (
            <div key={course.id} style={courseNode}>
              <button
                onClick={() => setSelectedCourse(course.id)}
                style={getCourseButtonStyle(
                  selectedCourse === course.id,
                  course.id === sampleCourses[0].id
                )}
              >
                {index + 1}
              </button>
              <span style={courseTitle}>{course.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* lessons section */}
      <div>
        <h2 style={sectionTitle}>
          {sampleCourses.find((c) => c.id === selectedCourse)?.title} Lessons
        </h2>

        <div style={lessonsGrid}>
          {filteredLessons.map((lesson) => (
            <div key={lesson.id} style={lessonCard}>
              <div style={lessonHeader}>
                <h3 style={lessonTitle}>{lesson.title}</h3>
                <span style={getStatusBadgeStyle(lesson.completed)}>
                  {lesson.completed ? "Completed" : "In Progress"}
                </span>
              </div>
              <p style={lessonDescription}>{lesson.description}</p>
              <div style={lessonFooter}>
                <span style={duration}>{lesson.duration}</span>
                <button style={actionButton}>
                  {lesson.completed ? "Review" : "Start"}
                </button>
              </div>
            </div>
          ))}

          {filteredLessons.length === 0 && (
            <div style={emptyState}>
              No lessons available for this course yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
