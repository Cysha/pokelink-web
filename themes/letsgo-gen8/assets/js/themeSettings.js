var themeSettings = {
    theme: {
        name: 'letsgo',
    },

    pokeImg: {
        eggType: 'static',

        routeColor: false,
        pokemonColor: false,
        typeColor: true,
        // false to disable, can be a hex color, can be an rgb or rgba value, can also be an html color name
        // like red, or pink etc... https://htmlcolorcodes.com/ works as a color picker
        staticColor: false,

        // switch to columns instead of rows
        verticalPokemon: !params.get('vertical'),
        // will use species name instead (eg Bulbasaur.gif instead of 1.gif),
        useDexNumbers: false,
        // valid image types include: gif, jpg, jpeg, png etc
        fileType: !params.get('animated') ? 'png' : 'gif',
        showHeldItem: true, // settings.pokeImg.showHeldItem
    },

    imgPaths: {
        // normal: 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen8/animated/',
        normal: !params.get('animated') ? 'https://pokelink.cybershade.org/assets/sprites/pokemon/home/normal/' : 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen8/animated/',
        shiny: !params.get('animated') ? 'https://pokelink.cybershade.org/assets/sprites/pokemon/home/normal/' : 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen8/animated-shiny/',
    },

    letsgo: {
        colorPokeball: false,
        colorBothSidesPokeball: false,
        colorBorder: false,
        colorBg: true,
    },

    typeColors: {
        'bug': '#a8b820', 'dark': '#220000', 'dragon': '#7038f8',
        'electric': '#f8d030', 'fairy': '#ee99ac', 'fighting': '#c03028',
        'fire': '#f08030', 'flying': '#a890f0', 'ghost': '#705898',
        'grass': '#78c850', 'ground': '#e0c068', 'ice': '#98d8d8',
        'normal': '#a8a878', 'poison': '#a040a0', 'psychic': '#f85888',
        'rock': '#b8a038', 'steel': '#b8b8d0', '???': '#68a090', 'water': '#6890f0',
      },
};