import React from 'react';
import styles from "../styles/CourseTable.module.css"

import ModuleCard from './ModuleCard';

const coursesData = [
  {
    id: 1,
    title: 'Course 1',
    modules: [
      {
        id: 1,
        title: 'Module 1',
        lessons: [
          { id: 1, title: 'Lesson 1.1', videoId: 'your-youtube-video-id-1' },
          { id: 2, title: 'Lesson 1.2', videoId: 'your-youtube-video-id-2' },
        ],
      },
      {
        id: 2,
        title: 'Module 2',
        lessons: [
          { id: 3, title: 'Lesson 2.1', videoId: 'your-youtube-video-id-3' },
          { id: 4, title: 'Lesson 2.2', videoId: 'your-youtube-video-id-4' },
        ],
      },
    ],
  },
  // Add more courses and modules as needed
];

function CourseTable() {
  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <h1>Courses</h1>
      </header>
      <div className={styles.course_list}>
        {coursesData.map((course) => (
          <div key={course.id} className={styles.course_card}>
            <h2>{course.title}</h2>
            {course.modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseTable;


