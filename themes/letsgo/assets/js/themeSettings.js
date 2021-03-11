var themeSettings = {
    theme: {
        name: 'letsgo',
    },

    pokeImg: {
        // will use species name instead (eg Bulbasaur.gif instead of 1.gif),
        useDexNumbers: false,
        // valid image types include: gif, jpg, jpeg, png etc
        fileType: 'gif',
        ignoreForms: true,

        routeColor: false,
        pokemonColor: false,
        typeColor: true,
        // false to disable, can be a hex color, can be an rgb or rgba value, can also be an html color name
        // like red, or pink etc... https://htmlcolorcodes.com/ works as a color picker
        staticColor: false,

        // switch to columns instead of rows
        verticalPokemon: false,
    },

    letsgo: {
        colorPokeball: false,
        colorBothSidesPokeball: false,
        colorBorder: false,
        colorBg: true,
    },

    imgPaths: {
        normal: 'https://assets.pokelink.xyz/assets/sprites/pokemon/national/animated/',
        party: 'http://assets.pokelink.xyz/assets/sprites/pokemon/national/animated/',
    }
};
