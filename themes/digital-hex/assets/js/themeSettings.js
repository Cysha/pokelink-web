var themeSettings = {
    theme: {
        name: 'digtial-hex',
        hideHPBar: params.get('hide_hp') === 'true' || false,
        staggered: !(params.get('flat') === 'true' || false),
    },

    pokeImg: {
        // will use species name instead (eg Bulbasaur.gif instead of 1.gif),
        useDexNumbers: false,
        // valid image types include: gif, jpg, jpeg, png etc
        fileType: 'png',
        ignoreForms: false,
        ignoresShinies: false
    },

    // Change these to thwwwwwwwwe image paths

    imgPaths: {
      normal: 'https://assets.pokelink.xyz/assets/sprites/pokemon/home/normal/',
    //   normal: 'https://assets.pokelink.xyz/assets/sprites/pokemon/home/normal/',
      shiny: 'https://assets.pokelink.xyz/assets/sprites/pokemon/home/shiny/',
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
