# PokeLink Web

This repo contains the different themes available as web sources for PokeLink

## Development

Themes use Socket.io to communicate with the PokeLink server. This lets the theme know when a change has happenes in your party. To see the different events that can be captured from PokeLink, check `./assets/js/client.js`

Additionally, themes use VueJS to handle the dynamic updates to the roster on the web view. You can get started with a basic theme by checkint `./themes/template`.

The theme's `index.js` is the main file for the team. This should include all the different dependencies needed for the theme to properly render, including Pokemon, item, move and other data, as well as the client to connect to PokeLink.

To see the theme in action, start your PokeLink session and open the `index.html` file in your theme on the browser. Then add `?user=[session username]` where `[session username]` should be replaced by the username you've set for yourself on PokeLink.

## Using Custom Themes

PokeLink will provide a list of themes and their URLs in the Web Sources tab to use on OBS. If you develop your own theme, you can use it on OBS as well. Simply open the theme html file and copy the local file's path from the URL bar. Then use this local URL on OBS as the source for your Browser Source.