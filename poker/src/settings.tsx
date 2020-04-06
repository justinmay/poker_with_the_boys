export default class Settings {
    static dev = true;
    static code = "bd2ebe77";
    static ngrok_uri = "https://" + Settings.code + ".ngrok.io/graphql";
    static socket_uri = "ws://" + Settings.code + ".ngrok.io/graphql";
}