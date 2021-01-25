// const VIEW_TYPE_COUNTER = 'VIEW_TYPE_COUNTER'
// const VIEW_TYPE_GRAVEYARD = 'VIEW_TYPE_GRAVEYARD'
// const VIEW_TYPES = [VIEW_TYPE_COUNTER]

new Vue({
  el: '#deaths',
  data: function () {
    return {
      connected: false,
      loaded: false,
      deaths: [],
      // types: VIEW_TYPES,
      type: !!params.get('counter') ? true : false
    };
  },
  created: function () {
    this.loaded = true
  },
  mounted: function () {
    var vm = this;
    let deathsClient = client.setup(settings.port, 'deaths-'+settings.currentUser+'-browser', settings.server, (data) => {
      vm.connected = true;
    })
      .on('client:players:list', (users) => {
        users.forEach(user => {
          this.updateDeaths(user)
        });
      })
      .on('player:party:death', (payload) => {
        this.addDeath(payload)
      })
      .on('player:party:revive', (payload) => {
        this.revivePokemon(payload)
      })
  },
  methods: {
    addDeath ({event, payload}) {
      if (window.settings.debug) {
        console.log(`Death Update recieved from ${payload.update.username}`)
        console.log(payload)
      }
      if (payload.update.username !== settings.currentUser) return;

      if (this.deaths.map(pokemon => pokemon.pid).includes(payload.update.death.pid)) return

      this.deaths = [...this.deaths, payload.update.death]
    },
    updateDeaths (payload) {
      if (window.settings.debug) {
        console.log(`Mass Death Update recieved from ${payload.username}`)
        console.log(payload)
      }
      if (payload.username !== settings.currentUser) return;

      this.deaths = payload.pokedex.dead.map(pokemon => transformPokemon(pokemon))
    },
    revivePokemon (payload) {
      if (window.settings.debug) {
        console.log(`Pokemon Revive recieved for ${payload.payload.username}`)
        console.log(payload.payload)
      }

      this.deaths = this.deaths.filter(pokemon => pokemon.pid !== payload.payload.pokemon.pid)
    },
  },
  computed: {
    showCounter () {
      return !!params.get('counter')
      // return this.type === VIEW_TYPE_COUNTER
    },
    showGraveyard () {
      return !!params.get('graveyard')
      // return this.type === VIEW_TYPE_COUNTER
    },
  }
});
