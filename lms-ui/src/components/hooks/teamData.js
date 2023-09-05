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
        Users: [
          {
              "id": 1,
              "username": null,
              "email": "mohammad.humza@xloopdigital.com",
              "first_name": "M",
              "last_name": "Humza",
              "gender": "M",
              "city": "Karachi",
              "country": "Pakistan",
              "phone_number": "30302313456",
              "profile_picture": null,
              "is_active": true,
              "created_at": "2023-08-17T10:04:24.030102Z",
              "updated_at": "2023-08-17T10:04:24.030102Z",
              "role": "admin"
          },
          {
              "id": 2,
              "username": null,
              "email": "samraalmas@xloopdigital.com",
              "first_name": "Samra",
              "last_name": "Almas",
              "gender": "F",
              "city": "Karachi",
              "country": "Pakistan",
              "phone_number": "30301993456",
              "profile_picture": null,
              "is_active": true,
              "created_at": "2023-08-17T10:04:57.402445Z",
              "updated_at": "2023-08-17T10:04:57.402445Z",
              "role": "admin"
          },
          {
              "id": 4,
              "username": null,
              "email": "hammaduser@xloopdigital.com",
              "first_name": "Mohaammad",
              "last_name": "Hammad",
              "gender": "M",
              "city": "Karachi",
              "country": "Pakistan",
              "phone_number": "31231993456",
              "profile_picture": null,
              "is_active": true,
              "created_at": "2023-08-17T10:05:59.541319Z",
              "updated_at": "2023-08-17T10:05:59.541319Z",
              "role": "learner"
          },
          {
              "id": 5,
              "username": null,
              "email": "samrauser@xloopdigital.com",
              "first_name": "Samra",
              "last_name": "Almas",
              "gender": "F",
              "city": "Karachi",
              "country": "Pakistan",
              "phone_number": "30301993456",
              "profile_picture": null,
              "is_active": true,
              "created_at": "2023-08-17T10:06:33.426497Z",
              "updated_at": "2023-08-17T10:06:33.426497Z",
              "role": null
          },
         
          {
              "id": 11,
              "username": null,
              "email": "mohsen.ali@xloopdigital.com",
              "first_name": "Mohsen",
              "last_name": "Ali",
              "gender": "M",
              "city": "Turbat",
              "country": "Pakistan",
              "phone_number": "03162477395",
              "profile_picture": null,
              "is_active": true,
              "created_at": "2023-08-25T11:13:05.543614Z",
              "updated_at": "2023-08-25T11:13:05.543614Z",
              "role": null
          },
          {
              "id": 12,
              "username": null,
              "email": "mohsen.ali@xlooupdigital.com",
              "first_name": "Mohsen",
              "last_name": "Ali",
              "gender": "M",
              "city": "Turbat",
              "country": "Afghanistan",
              "phone_number": "031624",
              "profile_picture": null,
              "is_active": false,
              "created_at": "2023-08-27T13:05:18.292030Z",
              "updated_at": "2023-08-27T13:05:18.292030Z",
              "role": null
          },
          {
              "id": 13,
              "username": null,
              "email": "gulbuledai@gmail.com",
              "first_name": "Mohsen",
              "last_name": "Ali",
              "gender": "M",
              "city": "hshsh",
              "country": "Afghanistan",
              "phone_number": "65536",
              "profile_picture": null,
              "is_active": false,
              "created_at": "2023-09-04T03:53:37.655620Z",
              "updated_at": "2023-09-04T03:53:37.655620Z",
              "role": null
          }
      ],
        },
             
        {
            id: 2,
            TeamName: "Team A",
            Users: [
              {
                "id": 6,
                "username": null,
                "email": "humzauser@xloopdigital.com",
                "first_name": "Muhammad",
                "last_name": "Humza",
                "gender": "M",
                "city": "Karachi",
                "country": "Pakistan",
                "phone_number": "30302313456",
                "profile_picture": null,
                "is_active": true,
                "created_at": "2023-08-17T10:06:53.123129Z",
                "updated_at": "2023-08-17T10:06:53.123129Z",
                "role": null
            },
            {
                "id": 7,
                "username": null,
                "email": "mohammad.hammad@xloopdigital.com",
                "first_name": "Mohaammad",
                "last_name": "Hammad",
                "gender": "M",
                "city": "Karachi",
                "country": "Pakistan",
                "phone_number": "31231993456",
                "profile_picture": null,
                "is_active": true,
                "created_at": "2023-08-17T10:56:58.736603Z",
                "updated_at": "2023-08-17T10:56:58.736603Z",
                "role": "instructor"
            },
            {
                "id": 8,
                "username": null,
                "email": "abeera.arshad@xloopdigital.com",
                "first_name": "Abeera",
                "last_name": "Arshad",
                "gender": "F",
                "city": "Karachi",
                "country": "Pakistan",
                "phone_number": "30302313456",
                "profile_picture": null,
                "is_active": true,
                "created_at": "2023-08-21T08:20:07.702759Z",
                "updated_at": "2023-08-21T08:20:07.702759Z",
                "role": null
            },
            {
                "id": 9,
                "username": null,
                "email": "mufaddal.mustafa@xloopdigital.com",
                "first_name": "Mufaddal",
                "last_name": "Mustafa",
                "gender": "M",
                "city": "Karachi",
                "country": "Pakistan",
                "phone_number": "03162478956",
                "profile_picture": null,
                "is_active": false,
                "created_at": "2023-08-21T14:44:30.478791Z",
                "updated_at": "2023-08-21T14:44:30.478791Z",
                "role": null
            },
            {
                "id": 10,
                "username": null,
                "email": "mohsenali3366@gmail.com",
                "first_name": "Test",
                "last_name": "User",
                "gender": "M",
                "city": "Turbat",
                "country": "Pakistan",
                "phone_number": "03162584958",
                "profile_picture": null,
                "is_active": true,
                "created_at": "2023-08-22T05:02:20.343534Z",
                "updated_at": "2023-08-22T05:02:20.343534Z",
                "role": null
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