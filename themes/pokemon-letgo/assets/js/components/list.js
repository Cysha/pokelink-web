Vue.component( "List", {
  template: `
  <div style="display: none" :class="{ 'browser-connected' : true }">
    <transition-group :name="switchSpeed" tag="div" class="pokes" v-if="loaded">
      <Pokemon v-for="( poke, idx ) in pokemon" v-if="poke !== null" :key="poke.nickname+poke.species" :pokemon="poke">
      </Pokemon>
    </transition-group>
    <Pokemon v-for="index in 6-party_count" :key="index" v-if="party_count != 6 && loaded">
    </Pokemon>
    <div class="no-connection" v-if="!connected">
      <p>Waiting for successful connection to Pokélink...</p>
      <p>Attempting to connect on port {{settings.port}}</p>
    </div>
  </div>
`,
  data() { return {
    connected: false,
    loaded: false,
    settings: {},
    pokemon: {},
    switchSpeed: 'switchMedium',
    party_count: 0,
    user: null,
  }},
  created: function () {
    this.loaded = true
    this.settings = window.settings;
  },
  mounted () {
    var vm = this;
    client.setup(settings.port, 'party-'+settings.currentUser+'-browser', settings.server, (data) => {
      vm.connected = true;
    })
    .on('client:players:list', (users) => {
      if (users.length === 1) {
        user = users[0];
        console.log('only got one user, assuming ', user.username);
        this.user = user.username;
        this.updateUserParty(user.party, vm);
      } else {
        users.forEach(user => {
          if (user.username === settings.currentUser) {
            this.user = user.username;
            this.updateUserParty(user.party, vm);
          }
        });
      }
    })
      // .on('client:party:updated', (party) => {
      //   this.updateUserParty(party, vm);
      // })
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
