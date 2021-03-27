# Ristek Assignment - Backend
## By: Adrian Ardizza - Ilmu Komputer 2020

This project was made as the author's RISTEK Fasilkom (Web Dev) assignment. It is written in JavaScript and uses the Express framework (API) with Prisma 2 (SQLite) as the ORM.

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
   
      **HTTP Request Method:** POST

      **HTTP Request Body:**
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
   
      **HTTP Request Method:** POST

      **HTTP Request Body:**
      - username (String): Username of the account to be registered.
      - password (String): Password of the account to be registered.

    **On Successful Registration:** Logs in the user (Session-based auth) and returns the following message as a response:
    ```json
    {
        "message": "You have successfully registered a new account."
    }
    ```

### Blog Posts
1. **Fetch All Posts (/post/all)**
   
    **HTTP Request Method:** GET

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

2. **Fetch Single Post (/post/:postId)**
   
    **HTTP Request Method:** GET

    **On Successful Fetch:** Fetches a requested blog post (with user comments included) and returns the following data as a response:
    ```json
    {
        "id": 1,
        "authorId": 1,
        "title": "Hackathon Time Lesgo",
        "content": "No guys it was just a joke im actually fine",
        "time": 1616852549943,
        "comments": [
            {
                "id": 0,
                "postId": 1,
                "commenterId": 1,
                "content": "Good post!",
                "likes": 420,
                "time": 1616853818000,
                "users": {
                    "id": 1,
                    "username": "adrianardizza"
                }
            }
        ]
    }
    ```

3. **Create Post (/post/create) [REQUIRES AUTH]**
   
    **HTTP Request Method:** POST

    **HTTP Request Body:**
      - title (String): Title of the post.
      - content (String): Content of the post.

    **On Successful Post Creation:** Creates a new blog post with the content given by the user and returns the following response if successful:
    ```json
    {
        "message": "Post successfully created."
    }
    ```

    **On Failure (User not logged in):** Returns the following response to the user:
    ```json
    {
        "message": "You are not logged in."
    }
    ```

3. **Edit Post (/post/edit) [REQUIRES AUTH]**
   
    **HTTP Request Method:** POST

    **HTTP Request Body:**
      - title (String): New title for the selected blog post.
      - content (String): New content for the selected blog post.
      - postId (Integer): ID of the post to be updated.

    **On Successful Post Creation:** Updates an existing blog post with the content given by the user (only the author can do this) and returns the following response
    ```json
    {
        "message": "Post with ID <ID> successfully updated."
    }
    ```

    **On Failure (User not logged in):** Returns the following response to the user:
    ```json
    {
        "message": "You are not logged in."
    }
    ```
    
    **On Failure (Not post author/other error):** Returns the following response to the user:
    ```json
    {
        "message": "An error occurred while updating the post."
    }
    ```

4. **Delete Post (/post/remove) [REQUIRES AUTH]**
   
    **HTTP Request Method:** POST

    **HTTP Request Body:**
      - postId (Integer): ID of the post to be updated.

    **On Successful Post Creation:** Updates an existing blog post with the content given by the user (only the author can do this) and returns the following response
    ```json
    {
        "message": "Post with ID <ID> successfully updated."
    }
    ```

    **On Failure (User not logged in):** Returns the following response to the user:
    ```json
    {
        "message": "You are not logged in."
    }
    ```

    **On Failure (Not post author/other error):** Returns the following response to the user:
    ```json
    {
        "message": "An error occurred while removing the post."
    }
    ```

5. **Create Comment (/comment/create) [REQUIRES AUTH]**
   
    **HTTP Request Method:** POST

    **HTTP Request Body:**
      - postId (Integer): ID of the selected post.
      - content (String): Content of the comment.

    **On Successful Post Creation:** Create a new comment on the selected post and return this as a response:
    ```json
    {
        "message": "Comment successfully created."
    }
    ```

    **On Failure (User not logged in):** Returns the following response to the user:
    ```json
    {
        "message": "You are not logged in."
    }
    ```
    