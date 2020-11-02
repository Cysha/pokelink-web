var themeSettings = {
    theme: {
        name: 'vyublitz',
        hideHPBar: params.get('hide_hp') === 'true' || false,
        pokemonTCGCardSets: [
            'base1',
            'base2',
            'basep',
            'ex3',
            'pop5',
            'pop1',
            'pop3',
            'xyp',
            'col1',
            'dp1',
            'dp2',
            'dp3',
            'dp4',
            'swsh1',
            'swsh2',
            'ex15'
        ]
    },

    pokeImg: {
        // will use species name instead (eg Bulbasaur.gif instead of 1.gif),
        useDexNumbers: true,
        // valid image types include: gif, jpg, jpeg, png etc
        fileType: 'png',
        ignoreForms: true,
    },

    // Change these to thwwwwwwwwe image paths

    imgPaths: {
      normal: 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen8/animated/',
      shiny: 'https://www.cpokemon.com/pokes/home/shiny/',
      /*normal: 'http://pokelink.cybershade.org/assets/sprites/pokemon/home/normal/',
      shiny: 'http://pokelink.cybershade.org/assets/sprites/pokemon/home/shiny/',*/
      party: 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen8/party/',
      animatedEgg: 'https://pokelink.cybershade.org/assets/sprites/egg.gif',
      staticEgg: 'https://www.cpokemon.com/pokes/home/0.png',
      unknown: 'https://pokelink.cybershade.org/assets/sprites/',
      badges: 'https://pokelink.cybershade.org/assets/sprites/badges/',
      status: 'https://pokelink.cybershade.org/assets/sprites/status/',
      types: 'https://pokelink.cybershade.org/assets/sprites/types/',
      items: 'https://pokelink.cybershade.org/assets/sprites/items/',
    },
};
