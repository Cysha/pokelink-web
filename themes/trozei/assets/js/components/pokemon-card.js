Vue.component( "pokemon-card", {
  template: `
  <div class="pokemon__slot" :class="{ 'pokemon__empty': pokemon === null }">
    <div v-if="pokemon !== null">
      <div class="pokemon__level">{{pokemon.level}}</div>
      <div><img :src="pokemon.img"></div>
      <div class="pokemon__nick">
        <span class="pokemon__nick-shiny" v-if="pokemon.isShiny == 1">★</span>
        {{ this.pokemon.nickname || this.pokemon.speciesName }}
      </div>
      <div class="pokemon__hp-bar">
        <div class="progress" style="height: 15px;">
          <div :class="healthBarClass(pokemon)" v-bind:style="{width: healthBarPercent(pokemon) + '%'}" role="progressbar" :aria-valuenow="pokemon.hp.current" :aria-valuemin="0" :aria-valuemax="pokemon.hp.max"></div>
        </div>
        <div class="pokemon__hp">
          <span class="text">{{ pokemon.hp.current }} / {{ pokemon.hp.max }}</span>
        </div>
      </div>
      <div class="pokemon__bar">
        <span :class="'pokemon__types pokemon__types-' + type.label.toLowerCase()" v-if="pokemon.types.length != 0" :style="{ 'backgroundColor': getTypeColor(type.label) }" v-for="type in pokemon.types">{{type.label}}</span>
      </div>
    </div>
    <div v-else>
      <div class="pokemon__image">
        <img src="./assets/images/pokeball-icon-22.png"/>
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
    },
    healthBarClass: function (pokemon) {
        var percent = this.healthBarPercent(pokemon);

        if (percent == 0) {
            return 'progress-bar grey';
        }
        if (percent <= 25) {
            return 'progress-bar red';
        }
        if (percent <= 50) {
            return 'progress-bar yellow';
        }

        return 'progress-bar green';
    },
    getTypeColor: function(type) {
      return getTypeColor(type);
    },
  }
});
