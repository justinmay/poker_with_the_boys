export default class Settings {
    static dev = true;
    static code = "a74588ff";
    static ngrok_uri = "https://" + Settings.code + ".ngrok.io/graphql";
    static socket_uri = "ws://" + Settings.code + ".ngrok.io/graphql";
}