Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true }" :style="{'opacity': opacity }">
      <label v-if="typeof pokemon == 'object'">
        <img v-if="pokemon.isEgg" class="sprite" :src="pokemon.img" style="max-height: 80px;" />
        <img v-else class="sprite" :src="pokemon.img" />
        <div class="pokemon__details">
          <div class="details__name">{{pokemon.nickname}} Lv.<span>{{pokemon.level}}</span></div>
          <div class="details__hp hp">
            <div class="hp__bar" :style="{width: healthPercent}"></div>
          </div>
        </div>
      </label>
      <label v-else></label>
    </div>
  `,
  props: {
    pokemon: {},
    key: {}
  },
  computed: {
    healthPercent() {
      return (100/this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
    nickname() {
      return this.pokemon.nickname || this.pokemon.speciesName;
    },
    sex() {
      return (this.pokemon.isGenderless ? '' : (this.pokemon.isFemale ? 'female' : 'male'));
    },
    ident() {
      if (typeof this.pokemon === "undefined") { return null; }
      return this.pokemon.species;
    },
    opacity() {
      if (typeof this.pokemon === "undefined") { return '0.4'; }
      return '1';
    },
    hasItem() {
      if (typeof this.pokemon === "undefined") { return false; }
      if (typeof this.pokemon.heldItem === "undefined") { return false; }
      return this.pokemon.heldItem.id !== 0;
    },

    selectedPokemon: {
      get: function() {
        return this.nickname
      },
      set: function() {
        this.$emit( "change", this.nickname )
      }
    }
  }
});
