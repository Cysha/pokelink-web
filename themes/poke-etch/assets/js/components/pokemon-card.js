Vue.component( "pokemon-card", {
  template: `
  <div>
    <div :class="{ 'pokemon__slot': true }" v-if="pokemon !== null">
      <div :class="{ 'pokemon__image': true, 'pokemon__dead': (pokemon.hp.current === 0)}">
          <img :src="pokemon.img">
      </div>
      <div class="pokemon__hp-bar">
          <div class="progress" style="height: 9px;">
              <div class="progress-bar" v-bind:style="{width: healthBarPercent(pokemon) + '%'}" role="progressbar" :aria-valuenow="pokemon.hp.current" :aria-valuemin="0" :aria-valuemax="pokemon.hp.max"></div>
          </div>
      </div>
    </div>
    <div class="pokemon__slot pokemon__empty" v-else>
      <div class="pokemon__image">
      </div>
    </div>
  </div>
  `,
  props: {
    pokemon: {
      default: null,
      type: Object,
      required: false
    }
  },
  methods: {
    healthBarPercent: function (pokemon) {
      if (pokemon.hp.max === pokemon.hp.current) {
        return 100;
      }

      return (100/pokemon.hp.max) * pokemon.hp.current;
    }
  }
});
