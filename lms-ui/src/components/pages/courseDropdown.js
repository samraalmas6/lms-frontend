import React from 'react';
import styles from "../../components/styles/Quiz.module.css";

const courseDropdown = ({ selectedCourse, onCourseChange }) => {
  const courses = ['Course A', 'Course B', 'Course C']; // Add your course names here

  return (
    <div className={styles.quized}>
    <select className={styles.drop} value={selectedCourse} onChange={(e) => onCourseChange(e.target.value)}>
      <option value="">All Courses</option>
      {courses.map((course, index) => (
        <option key={index} value={course}>
          {course}
        </option>
      ))}
    </select>
    </div>
  );
};

export default courseDropdown;
