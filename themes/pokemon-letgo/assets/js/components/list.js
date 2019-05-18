Vue.component( "List", {
  template: `
  <div>
    <transition-group :name="switchSpeed" tag="div" class="pokes">
      <Pokemon v-for="( poke, idx ) in pokemon" v-if="poke !== null" :key="poke.nickname+poke.species" :pokemon="poke">
      </Pokemon>
    </transition-group>
    <Pokemon v-for="index in 6-party_count" :key="index" v-if="party_count != 6">
    </Pokemon>
  </div>
`,
  data() { return {
    pokemon: {},
    switchSpeed: 'switchMedium',
    party_count: 0,
  }},
  mounted () {
    var vm = this;
    client.setup(settings.port, 'party-'+settings.currentUser+'-browser', settings.server, (data) => {})
      .on('client:players:list', (users) => {
        users.forEach(user => {
          if (user.username === settings.currentUser) {
            this.updateUserParty(user.party, vm);
          }
        });
      })
      .on('client:party:updated', (party) => {
        this.updateUserParty(party, vm);
      })
  },
  methods: {
    update( val ) {
    },

    updateUserParty(party, vm) {
      party = collect(party).map(function(pokemonWrapper) {
        if (pokemonWrapper.pokemon == null) {
          return null;
        }
        return transformPokemon(pokemonWrapper.pokemon);
      });

      vm.pokemon = party.all();
      vm.party_count = party.toArray().filter(function(value) {
        return value !== null;
      }).length;
    }
  }
});
