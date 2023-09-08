const CoursesData = {
    course: {
        id: 1,
        title: "React Course",
        description: "Learn React from scratch",
        sections: [
          {
            id: 101,
            title: "Getting Started",
            units: [
              {
                id: 1001,
                type: "video",
                title: "Introduction to React",
                url: "https://example.com/react-intro.mp4",
              },
              {
                id: 1002,
                type: "ppt",
                title: "React Basics",
                url: "https://example.com/react-basics.pptx",
              },
            ],
          },
          {
            id: 102,
            title: "State Management",
            units: [
              {
                id: 1003,
                type: "video",
                title: "Redux Fundamentals",
                url: "https://example.com/redux-fundamentals.mp4",
              },
              {
                id: 1004,
                type: "ppt",
                title: "Redux in Practice",
                url: "https://example.com/redux-in-practice.pptx",
              },
            ],
          },
        ],
      },
    
    // Add more courses as needed
    };
  
  export default CoursesData;
  