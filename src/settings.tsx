export default class Settings {
    static dev = false;
    static code = "381edc7d";
    static mode = "heroku"
    static heroku_uri = "poker-graphql-backend.herokuapp.com/graphql"
    //static ngrok_uri = "http://localhost:8000/graphql"
    //static socket_uri = "ws://localhost:8000/graphql"

    static ngrok_uri = Settings.mode === "heroku" ? "https://" + Settings.heroku_uri : "https://" + Settings.code + ".ngrok.io/graphql";
    static socket_uri = Settings.mode === "heroku" ? "ws://" + Settings.heroku_uri :"ws://" + Settings.code + ".ngrok.io/graphql";
}
