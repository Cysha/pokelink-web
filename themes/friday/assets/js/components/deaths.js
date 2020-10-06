Vue.component( "Deaths", {
    template: `
    <div style="display: none" :class="{ 'browser-connected' : true }" class="pokes">
    <div class="deaths container loaded" v-if="death"">
        <ul class="moon">
        <li class="crater"></li>
        <li class="crater"></li>
        <li class="crater"></li>
        <li><img :src="death.img" class="dead" @load="death.loaded = true "></li>
        </ul>
        <ul class="mountain-range">
        <li class="mountain"></li>
        <li class="mountain"></li>
        <li class="mountain"></li>
        <li class="mountain"></li>
        <li class="mountain"></li>
        <li class="mountain"></li>
        <li class="mountain"></li>
        <li class="mountain"></li>
        <li class="mountain"></li>
        <li class="mountain"></li>
        <li class="mountain"></li>
        </ul>
    <ul class="forest">
        <li class="hill"></li>
        <li class="hill"></li>
        <li class="hill"></li>
    </ul>
    <ul class="sparkles">
        <li class="sparkle one"></li>
        <li class="sparkle one"></li>
        <li class="sparkle one"></li>
        <li class="sparkle one"></li>
        <li class="sparkle two"></li>
        <li class="sparkle two"></li>
        <li class="sparkle two"></li>
        <li class="sparkle two"></li>
        <li class="sparkle three"></li>
        <li class="sparkle three"></li>
        <li class="sparkle three"></li>
        <li class="sparkle three"></li>
        <li class="sparkle four"></li>
        <li class="sparkle four"></li>
        <li class="sparkle four"></li>
        <li class="sparkle four"></li>
        <li class="sparkle five"></li>
        <li class="sparkle five"></li>
        <li class="sparkle five"></li>
        <li class="sparkle five"></li>
        <li class="sparkle six"></li>
        <li class="sparkle six"></li>
        <li class="sparkle six"></li>
        <li class="sparkle six"></li>
        <li class="sparkle seven"></li>
        <li class="sparkle seven"></li>
        <li class="sparkle seven"></li>
        <li class="sparkle seven"></li>
        <li class="sparkle eight"></li>
        <li class="sparkle eight"></li>
        <li class="sparkle eight"></li>
        <li class="sparkle eight"></li>
        </ul>
    <div class="grass">
        <div class="pokemon">
        <div class="poke" id="bulbasaur">
            <div class="ear"></div>
            <div class="ear"></div>
            <div class="head"></div>
            <div class="leg"></div>
            <div class="bulba-body"></div>
            <div class="bulbs">
            <div class="bulb"></div>
            </div>
        </div>
        <div class="poke" id="pikachu">
            <div class="ear"></div>
            <div class="ear"></div>
            <div class="hand"></div>
            <div class="pika-body"></div>
            <div class="head"></div>
            <div class="pika-tail"></div>
        </div>
        </div>
    </div>
    </div>

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
        party: [],
        players: {},
        party_count: 0,
        switchSpeed: 'switchMedium',
        flipped: false,
        deaths: [],
        oldDeaths: [],
        death: null,
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
          vm.players[username] = party.map(function (pokemonWrapper) {
              let mon = pokemonWrapper.pokemon;
              if (mon == null) {
                  return false;
              }

              return transformPokemon(mon);
          });

          if (username == client.currentUser) {
            let newDeaths = vm.players[username]
                .filter(function(value) { return typeof value == "object" })
                .filter(poke => poke.hp.current === 0)
                .filter(poke => vm.deaths.every(death => death.pid !== poke.pid) && vm.oldDeaths.every(death => death.pid !== poke.pid))
                .map(poke => {
                    return {...poke, animated: false}
                })

            vm.deaths = [...vm.deaths, ...newDeaths]
          }
      })
      .on('player:trainer:updated', (payload) => { this.updateTrainerStuffs(payload)})
      ;

      setInterval(() => {
        if (vm.death === null && vm.deaths.length > 0) {
            vm.death = vm.deaths.pop()
            vm.oldDeaths = [...vm.oldDeaths, vm.death]
            vm.deaths = vm.deaths.slice(1)
            // var newImage = new Image()
            // newImage.onload = function () {
                //     vm.death.loaded = true
                setTimeout(function () {
                    vm.death = null
                }, 8000)
            // }
            // newImage.src = vm.death.img
        }

      }, 1000)
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
