Vue.component( "PokemonSummary", {
  template: `
  <div style="display: none" :class="{ 'browser-connected' : true, 'darkMode': settings.theme.darkMode }" class="pokes">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <Pokemon-Summary
        v-if="summaryList.length"
        :key="summaryList[0].pid"
        :pokemon="summaryList[0]"
      >
      </Pokemon-Summary>
    </transition>
    <div class="no-connection" v-if="!connected">
      <p>Waiting for successful connection to Pokélink...</p>
      <p>Attempting to connect on port {{settings.port}}</p>
    </div>
  </div>
`,
  data() {
    return {
      connected: false,
      loaded: false,
      settings: {},
      summaryList: [],
      players: {},
      party_count: 0,
      flipped: false,
      timeout: null
    }
  },
  created: function () {
    this.loaded = true
    this.settings = window.settings;
    this.flipped = !!params.get('flipped')
  },
  mounted: function () {
    var vm = this;
    client.setup(settings.port, settings.currentUser+'-browser', settings.server, (username, party) => {
        vm.connected = true;
        vm.players[username] = party
          .filter(slot => slot !== null && slot.pokemon !== null)
          .filter(slot => slot.pokemon.is_active_in_battle === true)
          .map(function (pokemonWrapper) {
              return transformPokemon(pokemonWrapper.pokemon);
          });

        if (username == client.currentUser) {
          clearTimeout(this.timeout)
            if (vm.players[username].length !== 0) {
              vm.summaryList = vm.players[username];
              vm.party_count = vm.summaryList.filter(function(value) { return typeof value == "object" }).length;
              return
            }

            this.timeout = setTimeout(() => {
              vm.summaryList = vm.players[username];
              vm.party_count = vm.summaryList.filter(function(value) { return typeof value == "object" }).length;
            }, 1500)
        }
    })
    .on('player:trainer:updated', (payload) => { this.updateTrainerStuffs(payload)})
    ;
  },
  methods: {
    updateTrainerStuffs (payload) {
      if (window.settings.debug) {
        console.log(`Trainer Update recieved for ${payload.username}`)
        console.log(payload, window.settings)
      }
      if (payload.username !== settings.currentUser) return;

    },

    update( val ) {
    },
  }
});
