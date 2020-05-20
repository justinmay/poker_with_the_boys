export default class Settings {
    static dev = false;
    static code = "d38b2aa3";
    static mode = "heroku"
    static localhost_uri = 'localhost:8000/graphql';
    static heroku_uri = "poker-graphql-backend.herokuapp.com/graphql"
    //static ngrok_uri = "http://localhost:8000/graphql"
    //static socket_uri = "ws://localhost:8000/graphql"
    static ngrok_uri = Settings.mode === "heroku" ? "https://" + Settings.heroku_uri :
                        Settings.mode === "localhost" ? "http://" + Settings.localhost_uri : "https://" + Settings.code + ".ngrok.io/graphql";
    static socket_uri = Settings.mode === "heroku" ? "ws://" + Settings.heroku_uri :
                        Settings.mode === "localhost" ? "ws://" + Settings.localhost_uri :"ws://" + Settings.code + ".ngrok.io/graphql";
}
