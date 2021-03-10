var themeSettings = {
    theme: {
        name: 'fading-card-art',
        hideHPBar: params.get('hide_hp') === 'true' || false,
        flat: params.get('flat') === 'true' || false,
        pokemonTCGCardSets: function () {
            let userDefinedSets = params.get('sets')

            if (userDefinedSets !== null && userDefinedSets.length > 0) {
                return userDefinedSets.split('|')
            }

            return [
                'hgss1',
                'hgss2',
                'hgss3',
                'hgss4',
                'hgss5',
                'bw4',
                'bw5',
                'bw6',
                'bw7',
                'base1',
                'base2',
                'basep',
                'ex3',
                'pop5',
                'pop1',
                'pop3',
                'xyp',
                'xy12',
                'xy7',
                'col1',
                'dp1',
                'dp2',
                'dp3',
                'dp4',
                'dp5',
                'dp6',
                'swsh1',
                'swsh2',
                'swsh3',
                'ex15',
                'sm1',
                'sm2',
                'sm3',
                'sm3',
                'sm4',
                'sm5',
                'sm6',
                'sm7',
                'sm8',
                'sm9',
                'sm10',
                'sm11',
                'sm12',
                'sma',
                'smp',
                'xy3',
            ]
        }
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
      normal: 'https://assets.pokelink.xyz/assets/sprites/pokemon/gen8/animated/',
      party: 'https://assets.pokelink.xyz/assets/sprites/pokemon/gen8/party/',
      animatedEgg: 'https://assets.pokelink.xyz/assets/sprites/egg.gif',
      staticEgg: 'https://www.cpokemon.com/pokes/home/0.png',
      unknown: 'https://assets.pokelink.xyz/assets/sprites/',
      badges: 'https://assets.pokelink.xyz/assets/sprites/badges/',
      status: 'https://assets.pokelink.xyz/assets/sprites/status/',
      types: 'https://assets.pokelink.xyz/assets/sprites/types/',
      items: 'https://assets.pokelink.xyz/assets/sprites/items/',
    },
};
