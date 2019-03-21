Query for user
    {
        user(id: 1) {
         name
      }
    }

returns

    {
      "data": {
        "user": {
          "name": "jeremy"
        }
      }
    }

    {
        users {
          id
          name
          email
        }
    }

Query for all users

returns

    {
      "data": {
        "users": [
          {
            "id": 1,
            "name": "jeremy",
            "email": "jjeerr@gmail.com"
          },
          {
            "id": 2,
            "name": "jermm",
            "email": "jeremy@jeremy"
          },
          {
            "id": 4,
            "name": "jermm2",
            "email": "jeremy2@jeremy"
          },
          {
            "id": 5,
            "name": "jermm2",
            "email": "jeremy3@jeremy"
          },
          {
            "id": 6,
            "name": "jermm2",
            "email": "jeremy4@jeremy"
          },
          {
            "id": 8,
            "name": "jermm2",
            "email": "jeremy5@jeremy"
          }
        ]
      }
    }
    
Insert a user:

    mutation addUser($name: String, $email: String)
      { addUser(name: $name, email: $email) {
        id
      }}
      
with vars of

    {
      "email": "jeremy5@jeremy",
      "name": "jermm2"
    }


