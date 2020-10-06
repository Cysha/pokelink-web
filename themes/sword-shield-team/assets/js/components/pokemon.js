Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true, 'opaque': !fixedSprite}" :style="{'opacity': opacity }">
      <div
        class="pokemon__sprite"
        v-if="typeof pokemon == 'object'"
      >
        <Pokeball :topColor="getPokeballTopColor()" :bottomColor="getPokeballBottomColor()" :ident="ident"></Pokeball>
        <!-- <img class="sprite" :src="pokemon.img" v-if="typeof pokemon == 'object'" /> -->
        <TrimmedSprite
          :pokemon="pokemon"
          v-if="typeof pokemon == 'object'"
          @done="fixedSprite = true"
        ></TrimmedSprite>
      </div>
      <div class="details" v-if="typeof pokemon == 'object'">
        <h2 class="name">
          {{ pokemon.nickname }}
          <span class="sex" :class="sex" v-if="!hideGender && sex !== ''">
            <Female v-if="sex === 'female'"></Female>
            <Male v-if="sex === 'male'"></Male>
          </span>
        </h2>
        <div class="hp">
          <div class="bar">
            <div class="health" :style="{ width: healthPercent }" :class="{ low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }"></div>
          </div>
          <span class="text">{{ pokemon.hp.current }} / {{ pokemon.hp.max }}</span>
        </div>
        <span class="lvl" v-if="hideLevel || (typeof pokemon == 'object' && pokemon.level)">Lv. {{ pokemon.level }}</span>
      </div>
      <div v-else></div>
    </div>
  `,
  props: {
    pokemon: {},
    key: {}
  },
  data () {
    return {
      fixedSprite: false,
      settings: null,
    }
  },
  mounted () {
    this.settings = settings
  },
  computed: {
    partner() {
      return false;
    },
    healthPercent() {
      return (100/this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
    nickname() {
      if (typeof this.pokemon === "undefined" || this.pokemon === null) { return null; }
      return this.pokemon.nickname || this.pokemon.speciesName;
    },
    sex() {
      return (this.pokemon.isGenderless ? '' : (this.pokemon.isFemale ? 'female' : 'male'))
    },
    ident() {
      if (typeof this.pokemon === "undefined" || this.pokemon === null) { return null; }
      return this.pokemon.species;
    },
    opacity() {
      if (typeof this.pokemon === "undefined" || this.pokemon === null) { return '1'; }
      if (typeof this.fixedSprite === false) { return ''; }
      return '';
    },
    hasItem() {
      if (typeof this.pokemon === "undefined" || this.pokemon === null) { return false; }
      if (typeof this.pokemon.heldItem === "undefined") { return false; }
      return this.pokemon.heldItem.id !== 0;
    },

    type1() {
      if (typeof this.pokemon === "undefined" || this.pokemon === null) { return 'rgba(255,255,255,.2)'; }

      if (settings.pokeImg.staticColor !== false) {
        return normalizeColor(settings.pokeImg.staticColor, 100);
      }

      return hex2rgba(getTypeColor(this.pokemon.types[0].label), 50);
    },
    type2() {
      if (typeof this.pokemon === "undefined" || this.pokemon === null) { return 'rgba(255,255,255,.2)'; }

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
    },
    hideGender () {
      return settings.theme.hideGender;
    },
    hideLevel () {
      return settings.theme.hideLevel;
    },
  },
  methods: {
    getPokeballTopColor: function() {
      if (settings.champion.colorPokeball !== true) { return 'C3C4C6'; }
      if (typeof this.pokemon === "undefined" || this.pokemon === null) { return '#C3C4C6'; }

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
      if (settings.champion.colorPokeball !== true) { return '#C3C4C6'; }
      if (typeof this.pokemon === "undefined" || this.pokemon === null) { return '#C3C4C6'; }

      if (settings.pokeImg.pokemonColor === true) {
        if (settings.champion.colorBothSidesPokeball !== true) { return '#C3C4C6'; }
        return this.pokemon.color;
      }

      if (settings.pokeImg.routeColor === true) {
        if (settings.champion.colorBothSidesPokeball !== true) { return 'C3C4C6'; }
        return string2Hex(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.typeColor === true) {
        if (this.pokemon.types.length === 2) {
          return getTypeColor(this.pokemon.types[1].label);
        }
        return getTypeColor(this.pokemon.types[0].label);
      }

      if (settings.pokeImg.staticColor !== false) {
        if (settings.champion.colorBothSidesPokeball !== true) { return 'C3C4C6'; }
        return settings.pokeImg.staticColor;
      }

      return 'white';
    },

  }
});
