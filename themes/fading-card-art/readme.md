# Fading Card Art
This is a theme built from a comisisoned design by [That Boy Meech](https://twitter.com/ThatBoyMeech_)


## Preview
![Preview of the Fading Card Art Theme](assets/preview.png)

## Features
 - **HP** is shown as the card art fades to grayscale.
 - **Held Items** are shown if applicable in the white box above the pokemon
 - **Nickname** is shown in the box below each

## Settings

#### Pokémon TCG art
This theme relies on TCG art provided by the [Pokémon TCG]() API.

The card art sends a list of card sets and pokemon ids to the api and displays the first instance of the card for that pokemon.

You can set the list of TCG sets that are used, in different 2 ways:
 - Change the `pokemonTCGCardSets` setting in the `./assets/js/themeSettings.js` file.
 - by listing the set codes as a query parameter in the URL, seperated by pipes, for example: `https://assets.pokelink.xyz/themes/fading-card-art/index.html?user=Jez&sets=col1|dp1|swsh1|sm1`

**Important NOTE:** Check that the sets you pick cover all the pokemon you can recieve in the game