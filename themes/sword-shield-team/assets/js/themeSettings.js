var themeSettings = {
    theme: {
        name: 'swsh-team',
        hideGender: params.get('hideGender') === 'true',
        hideLevel: params.get('hideLevel') === 'true',
    },

    pokeImg: {
        usePath: 'party',
        fileType: 'png',
        routeColor: false,
        pokemonColor: false,
        typeColor: true,
        ignoreForms: true,
        // false to disable, can be a hex color, can be an rgb or rgba value, can also be an html color name
        // like red, or pink etc... https://htmlcolorcodes.com/ works as a color picker
        staticColor: false,
    },

    champion: {
        colorPokeball: false,
        colorBothSidesPokeball: false,
    },

    imgPaths: {
        // party: 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen8/galar/',
        party: 'https://pokelink.cybershade.org/assets/sprites/pokemon/national/party/',
    }

};
