Vue.component( "List", {
  template: `
  <div>
    <transition-group :name="switchSpeed" tag="div" class="pokes">
      <Pokemon v-for="( poke, idx ) in pokemon" v-if="poke !== null" :key="poke.nickname+poke.species" :pokemon="poke">
      </Pokemon>
    </transition-group>
  </div>
`,
  data() { return {
    pokemon: {},
    switchSpeed: 'switchMedium',

  }},
  mounted () {
    var vm = this;
    client.setup(settings.port, 'party-'+settings.currentUser+'-browser', settings.server, (data) => {})
      .on('client:players:list', (users) => {
        users.forEach(user => {
          if (user.username === settings.currentUser) {
            console.log('1 updated vm.pokemon!');
            console.log(user.party);
            vm.pokemon = collect(user.party).map(function(pokemonWrapper) {
              if (pokemonWrapper.pokemon == null) {
                return null;
              }
              return transformPokemon(pokemonWrapper.pokemon);
            }).all();
          }
        });
      })
      .on('client:party:updated', (party) => {
        console.log('2 updated vm.pokemon!');
        console.log(party);
        vm.pokemon = collect(party).map(function(pokemonWrapper) {
          if (pokemonWrapper.pokemon == null) {
            return null;
          }
          return transformPokemon(pokemonWrapper.pokemon);
        }).all();
      })
  },
  methods: {
    update( val ) {
    }
  }
});
