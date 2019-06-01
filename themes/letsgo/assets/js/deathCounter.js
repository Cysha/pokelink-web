new Vue({
  el: '#deaths',
  data: function () {
    return {
      connected: false,
      loaded: false,
      deaths: []
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
      .on('player:party:death', (payload) => { this.updateDeaths(payload)})
      .on('client:players:list', (users) => {
        users.forEach(user => {
          this.updateDeaths(user)
        });
      })
  },
  methods: {
    updateDeaths (payload) {
      if (window.settings.debug) {
        console.log(`Death Update recieved from ${payload.username}`)
        console.log(payload, window.settings)
      }
      if (payload.username !== settings.currentUser) return;

      this.deaths = payload.pokedex.dead.map(pokemon => transformPokemon(pokemon))
    }
  }
});
