# API de Games
API Criada para intuito de aprendizagem com a linguagem JavaScript utilizando Node.js

## Endpoints

## API Endpoints

### User Endpoints
* Create a user:
  * Endpoint: POST /user
  * Request Body: JSON data containing username, email and password(must contain at least 6 char.).
  * * Example:
  * ```json
    {
    "name": "John Doe", (Required)
    "email": "john@email.com", (Required)
    "password": "johnpassword123", (Required)
    }
    ```

* Login with an user:
  * Endpoint: POST /auth
  * Request Body: JSON data containing email and password(save your token and use it as a bearer authorization token).
    
    
### Games Endpoints
* Create a Game:
  * Endpoint: POST /game
  * Request Body: JSON data containing game details.
  * Authorization token must be set.
  * Example:
  * ```json
    {
    "title": "Sample Game", 
    "year": "This is a sample game.",
    "price": "79.99",
    }
    ```

* List all games
  * Endpoint: GET /games

* View Game Details:
   * Endpoint: GET /game/{id}
   * Authorization token must be set.

* Update Game:
  * Endpoint: PUT /game/{id}
  * Request Body: JSON data containing updated game details.
  * Authorization token must be set.

* Delete Game:
  * Endpoint: DELETE /game/{id}
  * Authorization token must be set.
 
Make requests to these endpoints using your preferred HTTP client (e.g., Postman) to interact with the API.
