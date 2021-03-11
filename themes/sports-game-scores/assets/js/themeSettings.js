var themeSettings = {
    theme: {
        name: 'swsh-team',
        hideGender: params.get('hideGender') === 'true',
        hideLevel: params.get('hideLevel') === 'true',
        pokemonTCGCardSets: function () {
          let userDefinedSets = params.get('sets')

          if (userDefinedSets !== null && userDefinedSets.length > 0) {
              return userDefinedSets.split('|')
          }

          return [
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
            'ex15',
            'ex12',
            'dp6',
            'pl2',
            'bw11',
            'bw10',
            'bw9',
            'bw8',
            'bw7',
            'bw6',
            'bw5',
            'bw4',
            'bw4',
            'bw3',
            'bw2',
            'bw1',
            'xy1',
            'xy2',
            'xy3',
            'xy4',
            'xy5',
            'xy6',
            'xy7',
            'xy8',
          ]
        }
    },

    pokeImg: {
        usePath: 'normal',
        fileType: 'png',
        routeColor: false,
        pokemonColor: false,
        typeColor: true,
        ignoreForms: true,
        // false to disable, can be a hex color, can be an rgb or rgba value, can also be an html color name
        // like red, or pink etc... https://htmlcolorcodes.com/ works as a color picker
        staticColor: false,
        useCardArtBackground: params.get('useCardArtBackground') !== 'false',
        useTypesGradient: params.get('useTypesGradient') === 'true',
    },

    champion: {
        colorPokeball: false,
        colorBothSidesPokeball: false,
    },

    imgPaths: {
        normal: 'https://assets.pokelink.xyz/assets/sprites/pokemon/home/normal/',
        shiny: 'https://assets.pokelink.xyz/assets/sprites/pokemon/home/normal/',
        party: 'https://assets.pokelink.xyz/assets/sprites/pokemon/gen8/party/',
        animatedEgg: 'https://assets.pokelink.xyz/assets/sprites/egg.gif',
        staticEgg: 'https://assets.pokelink.xyz/assets/sprites/egg.png',
        missingno: 'https://assets.pokelink.xyz/assets/sprites/missingno.png',
        unknown: 'https://assets.pokelink.xyz/assets/sprites/',
        badges: 'https://assets.pokelink.xyz/assets/sprites/badges/',
        status: 'https://assets.pokelink.xyz/assets/sprites/status/',
        types: 'https://assets.pokelink.xyz/assets/sprites/types/',
        items: 'https://assets.pokelink.xyz/assets/sprites/items/',
    }

};
