const teamsData = [
    {
        id: 1,
        TeamName: "Team B",
        Courses: [
            {
                id: 1,
                course_title: 'Code with Hassan',
                duration: '15 days',
                author: "Muhammad Hassan",
                users_enrolled: 0,
                last_updated: '2 hours ago'
            },
            {
                id: 2,
                course_title: 'Python Crash Course',
                duration: '25 days',
                author: "Hammad",
                users_enrolled: 0,
                last_updated: '1 hours ago'
            },
            {
                id: 3,
                course_title: 'Cloud Native Development',
                duration: '19 days',
                author: "Muhammad Waqar",
                users_enrolled: 0,
                last_updated: '30 minutes ago'
            }
        ],
        Users:  [
            {
              id: 1,
              name: "Mohsen Ali",
              Role: "Learner",
              email: "abc@work.com",
              department: "CND",
              active: true,
              img: '~/lms-ui/public/user.png',
              designation: "Software Engineer"
            },
            {
              id: 2,
              name: "Humza",
              Role: "Learner",
              email: "abc@work.com",
              department: "CND",
              active: true,
              img: '~/lms-ui/public/user.png',
              designation: "Software Engineer"
            },
            {
              id: 3,
              name: "Samra",
              Role: "Learner",
              email: "abc@work.com",
              department: "CND",
              active: true,
              img: '~/lms-ui/public/user.png',
              designation: "Software Engineer"
            },
            {
              id: 4,
              name: "Abdullah",
              Role: "Instructor",
              email: "abc@work.com",
              department: "CND",
              active: false,
              img: '~/lms-ui/public/user.png',
              designation: "Software Engineer"
            },
            {
              id: 5,
              name: "Hammad",
              Role: "Instructor",
              email: "abc@work.com",
              department: "CND",
              active: false,
              img: '~/lms-ui/public/user.png',
              designation: "Software Engineer"
            },
            
            {
              id: 11,
              name: "Hammad",
              Role: "Learner",
              email: "abc@work.com",
              department: "CND",
              active: false,
              img: '~/lms-ui/public/user.png',
              designation: "Software Engineer"
            },
            {
              id: 12,
              name: "Abeera",
              Role: "Learner",
              email: "abc@work.com",
              department: "CND",
              active: false,
              img: '~/lms-ui/public/user.png',
              designation: "Software Engineer"
            },
            {
              id: 13,
              name: "Mohsen Ali",
              Role: "Instructor",
              email: "abc@work.com",
              department: "CND",
              active: true,
              img: '~/lms-ui/public/user.png',
              designation: "Software Engineer"
            }
          ],
        },
             
        {
            id: 2,
            TeamName: "Team A",
            Users: [
                {
                    id: 6,
                    name: "Abeera",
                    Role: "Admin",
                    email: "abc@work.com",
                    department: "CND",
                    active: false,
                    img: '~/lms-ui/public/user.png',
                    designation: "Software Engineer"
                  },
                  {
                    id: 7,
                    name: "Mohsen Ali",
                    Role: "Learner",
                    email: "abc@work.com",
                    department: "CND",
                    active: true,
                    img: '~/lms-ui/public/user.png',
                    designation: "Software Engineer"
                  },
                  {
                    id: 8,
                    name: "Humza",
                    Role: "Admin",
                    email: "abc@work.com",
                    department: "CND",
                    active: true,
                    img: '~/lms-ui/public/user.png',
                    designation: "Software Engineer"
                  },
                  {
                    id: 9,
                    name: "Samra",
                    Role: "Learner",
                    email: "abc@work.com",
                    department: "CND",
                    active: true,
                    img: '~/lms-ui/public/user.png',
                    designation: "Software Engineer"
                  },
                  {
                    id: 10,
                    name: "Abdullah",
                    Role: "Admin",
                    email: "abc@work.com",
                    department: "CND",
                    active: false,
                    img: '~/lms-ui/public/user.png',
                    designation: "Software Engineer"
                  },
            ],
            Courses: [ 
                 {
                id: 4,
                course_title: 'Java with Spring Boot',
                duration: '13 days',
                author: "Samra Almas",
                users_enrolled: 0,
                last_updated: '5 hours ago'
            },
            {
                id: 5,
                course_title: 'React with Redux',
                duration: '23 days',
                author: "Mohsen Ali",
                users_enrolled: 0,
                last_updated: '8 hours ago'
            }]
            
        }    
]

export default teamsData