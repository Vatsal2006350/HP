import { CSSProperties } from "react";

// basic layout styles
export const container: CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "1.5rem 1rem",
};

export const title: CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "2rem",
};

// course path styles
export const coursesContainer: CSSProperties = {
  marginBottom: "3rem",
};

export const coursePathContainer: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  position: "relative",
  marginBottom: "1rem",
  width: "100%",
  padding: "0 10px",
};

export const pathLine: CSSProperties = {
  position: "absolute",
  height: "2px",
  backgroundColor: "#e0e0e0",
  left: "8%",
  right: "8%",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 0,
};

export const courseNode: CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const courseTitle: CSSProperties = {
  marginTop: "0.5rem",
  fontSize: "0.875rem",
  fontWeight: 500,
};

export const sectionTitle: CSSProperties = {
  fontSize: "1.25rem",
  fontWeight: 600,
  marginBottom: "1rem",
};

// lesson styles
export const lessonsGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
};

export const lessonCard: CSSProperties = {
  backgroundColor: "white",
  borderRadius: "0.5rem",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  padding: "1.25rem",
  border: "1px solid #f0f0f0",
  transition: "transform 0.2s, box-shadow 0.2s",
};

export const lessonHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

export const lessonTitle: CSSProperties = {
  fontWeight: 600,
  fontSize: "1.125rem",
};

export const lessonDescription: CSSProperties = {
  color: "#666",
  marginTop: "0.5rem",
};

export const lessonFooter: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1rem",
};

export const duration: CSSProperties = {
  fontSize: "0.875rem",
  color: "#666",
};

export const actionButton: CSSProperties = {
  padding: "0.5rem 1rem",
  backgroundColor: "#3b82f6",
  color: "white",
  borderRadius: "0.25rem",
  fontSize: "0.875rem",
  cursor: "pointer",
  border: "none",
};

export const emptyState: CSSProperties = {
  gridColumn: "1 / -1",
  textAlign: "center",
  padding: "2.5rem 0",
  color: "#666",
};

// helper functions
export const getCourseButtonStyle = (
  isSelected: boolean,
  isFirst: boolean
): CSSProperties => ({
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: isSelected ? "white" : "#666",
  backgroundColor: isFirst ? "#22c55e" : isSelected ? "#3b82f6" : "white",
  border: isFirst
    ? "2px solid #22c55e"
    : isSelected
    ? "none"
    : "2px solid #e0e0e0",
  fontWeight: "bold",
  fontSize: "1rem",
});

export const getStatusBadgeStyle = (completed: boolean): CSSProperties => ({
  padding: "0.25rem 0.75rem",
  borderRadius: "999px",
  fontSize: "0.75rem",
  backgroundColor: completed ? "#dcfce7" : "#fef9c3",
  color: completed ? "#166534" : "#854d0e",
});
