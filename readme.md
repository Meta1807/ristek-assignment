# Ristek Assignment - Backend
## By: Adrian Ardizza - Ilmu Komputer 2020

This project was made as the author's RISTEK Fasilkom (Web Dev) assignment. It is written in JavaScript and uses the Express framework (API) with Prisma 2-SQLite as the ORM.

Only the API is included in this repo. I could not make an interface for it due to not having enough time (only had about 4 hours to make this because of time constraints this week).

## How to Install and Run:
1. Clone this repo into your local filesystem.
2. Make sure that you have the following requirements installed:
   1. Node.js runtime (>10.0)
   2. A JS package manager of your choice (preferably NPM, although yarn should work).
3. Open the root directory of the project in your terminal and install dependencies using `npm install` (npm) or `yarn install` (yarn)
4. Run the application by using `npm start`

## API Documentation:
### User
1. **Login (/user/login)**
   1. **HTTP Request Method:** POST
   2. **HTTP Request Body:**
        - username (String): Username of the user's account.
        - password (String): Password of the user's account.

    **On Successful Login:** Logs in the user (Session-based auth) and returns the following message as a response:
    ```json
    {
        "message": "You have successfully logged in!"
    }
    ```
    **On Failed Login (Wrong Username/Password):** returns the following message as a response:
    ```json
    {
        "message": "You have entered an incorrect username or password."
    }
    ```

2. **Register (/user/register)**
   1. **HTTP Request Method:** POST
   2. **HTTP Request Body:**
        - username (String): Username of the account to be registered.
        - password (String): Password of the account to be registered.

    **On Successful Registration:** Logs in the user (Session-based auth) and returns the following message as a response:
    ```json
    {
        "message": "You have successfully registered a new account."
    }
    ```

### Blog Posts
1. **Fetch All Posts (/user/login)**
   1. **HTTP Request Method:** GET

    **On Successful Fetch:** Fetches all blog posts in the posts table and returns the following data as the response:
    ```json
    [
        {
            "id": 0,
            "authorId": 1,
            "title": "HELP",
            "content": "CALL AN AMBULANCE, but not for me",
            "time": 1616849760000
        },
        {
            "id": 1,
            "authorId": 1,
            "title": "Hackathon Time Lesgo",
            "content": "No guys it was just a joke im actually fine",
            "time": 1616852549943
        }
    ]
    ```

