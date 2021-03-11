var themeSettings = {
    theme: {
        name: 'vyublitz',
        hideHPBar: params.get('hide_hp') === 'true' || false,
    },

    pokeImg: {
        // valid image types include: gif, jpg, jpeg, png etc
        fileType: 'png',
        ignoreForms: true,
    },

    // Change these to thwwwwwwwwe image paths

    imgPaths: {
      normal: 'http://assets.pokelink.xyz/assets/sprites/pokemon/home/normal/',
      shiny: 'http://assets.pokelink.xyz/assets/sprites/pokemon/home/shiny/',
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
