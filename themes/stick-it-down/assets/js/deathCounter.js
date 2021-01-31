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
      type: !!params.get('counter') === 'true' ? true : false
    };
  },
  created: function () {
    this.loaded = true
  },
  mounted: function () {
    var vm = this;
    let deathsClient = client.setup(settings.port, 'deaths-'+settings.currentUser+'-browser', settings.server, (data) => {
      vm.connected = true;

      this.deaths = this.deaths.map(pokemon => {
        delete pokemon.transformed
        return transformPokemon(pokemon)
      })
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

      this.deaths = [...this.deaths, transformPokemon(payload.update.death)]
    },
    updateDeaths (payload) {
      if (window.settings.debug) {
        console.log(`Mass Death Update recieved from ${payload.username}`)
        console.log(payload)
      }
      if (payload.username !== settings.currentUser) return;

      this.deaths = payload.pokedex.dead.map(pokemon => transformPokemon(pokemon))
    },
    revivePokemon ({payload}) {
      if (window.settings.debug) {
        console.log(`Pokemon Revive recieved for ${payload.username}`)
        console.log(payload)
      }

      this.deaths = this.deaths.filter(pokemon => pokemon.pid !== payload.update.pokemon.pid)
    },
  },
  computed: {
    deathsToShow () {
      let graveyardSize = parseInt(params.get('limit'))
      if (isNaN(graveyardSize) || graveyardSize <= 0) return this.deaths

      return this.deaths.reverse().slice(0, graveyardSize)
      // return this.type === VIEW_TYPE_COUNTER
    },
    addCountOffset () {
      let offset = parseInt(params.get('counterOffset'))
      if (isNaN(offset)) return 0
      return offset
    },
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
