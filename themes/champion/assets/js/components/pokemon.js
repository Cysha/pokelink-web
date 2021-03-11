Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true }" :style="{'opacity': opacity }">
      <Pokeball :topColor="getPokeballTopColor()" :bottomColor="getPokeballBottomColor()" :ident="ident"></Pokeball>
      <label v-if="typeof pokemon == 'object'">
        <img class="sprite" :src="pokemon.img" />
        <div class="details">
          <h2 class="name">{{ pokemon.nickname }}</h2>
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
    partner() {
      return false;
    },
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

    type1() {
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.2)'; }

      if (settings.pokeImg.staticColor !== false) {
        return normalizeColor(settings.pokeImg.staticColor, 100);
      }

      return hex2rgba(getTypeColor(this.pokemon.types[0].label), 50);
    },
    type2() {
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.2)'; }

      if (settings.pokeImg.staticColor !== false) {
        return normalizeColor(settings.pokeImg.staticColor, 100);
      }

      if (this.pokemon.types.length == 2) {
        return hex2rgba(getTypeColor(this.pokemon.types[1].label), 50);
      }
      return hex2rgba(getTypeColor(this.pokemon.types[0].label), 50);
    },

    selectedPokemon: {
      get: function() {
        return this.nickname
      },
      set: function() {
        this.$emit( "change", this.nickname )
      }
    }
  },
  methods: {
    getPokeballTopColor: function() {
      if (settings.champion.colorPokeball !== true) { return 'white'; }
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.2)'; }

      if (settings.pokeImg.pokemonColor === true) {
        return this.pokemon.color;
      }

      if (settings.pokeImg.routeColor === true) {
        return string2Hex(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.typeColor === true) {
        return getTypeColor(this.pokemon.types[0].label);
      }

      if (settings.pokeImg.staticColor !== false) {
        return normalizeColor(settings.pokeImg.staticColor, 100);
      }

      return 'white';
    },
    getPokeballBottomColor: function() {
      if (settings.champion.colorPokeball !== true) { return 'white'; }
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.2)'; }

      if (settings.pokeImg.pokemonColor === true) {
        if (settings.champion.colorBothSidesPokeball !== true) { return 'white'; }
        return this.pokemon.color;
      }

      if (settings.pokeImg.routeColor === true) {
        if (settings.champion.colorBothSidesPokeball !== true) { return 'white'; }
        return string2Hex(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.typeColor === true) {
        if (this.pokemon.types.length === 2) {
          return getTypeColor(this.pokemon.types[1].label);
        }
        return getTypeColor(this.pokemon.types[0].label);
      }

      if (settings.pokeImg.staticColor !== false) {
        if (settings.champion.colorBothSidesPokeball !== true) { return 'white'; }
        return settings.pokeImg.staticColor;
      }

      return 'white';
    },

  }
});
