var themeSettings = {
    theme: {
        name: 'round-hp',
        gymAces: function() {
          const userGymAces = params.get('gymAces')
          if (userGymAces !== null && userGymAces.length > 0) {
              return userGymAces.split(',')
          }
    
          return [];
        },
    },
    pokeImg:{
      fileType: 'png',
      typeColor: true,
    },
    
    // Change these to the image paths
    imgPaths: {
      normal: 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen7/normal/',
      shiny: 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen7/normal/',
      party: 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen8/party/',
      animatedEgg: 'https://pokelink.cybershade.org/assets/sprites/egg.gif',
      staticEgg: 'https://pokelink.cybershade.org/assets/sprites/egg.png',
      unknown: 'https://pokelink.cybershade.org/assets/sprites/',
      badges: 'https://pokelink.cybershade.org/assets/sprites/badges/',
      status: 'https://pokelink.cybershade.org/assets/sprites/status/',
      types: 'https://pokelink.cybershade.org/assets/sprites/types/',
      items: 'https://pokelink.cybershade.org/assets/sprites/items/',
    },
};
