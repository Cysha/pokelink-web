Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true }" :style="{'opacity': opacity }">
      <div class="pokemon__info">
        <div class="pokemon__header">
          <div class="pokemon__image">
            <img
              :src="pokemon.img"
              class="pokemon__sprite"
            >
            <img
              :src="pokemon.heldItem.img"
              class="heldItem__sprite"
              v-if="pokemon.heldItem.id !== 0"
            >
          </div>
          <div class="pokemon__types">
            <img
              v-for="type in pokemon.types"
              :src="type.img"
            >
          </div>
        </div>
        <div class="pokemon__details">
          <div class="pokemon__name-level">
            <span class="pokemon__nickname">{{pokemon.nickname}}</span>
            <span
              class="pokemon__gender"
              :class="sex"
              v-if="!hideGender && sex !== ''"
            >
              <Female v-if="sex === 'female'"></Female>
              <Male v-if="sex === 'male'"></Male>
            </span>
            <span class="pokemon__level">Lv.{{pokemon.level}}</span>
          </div>
          <div
            class="pokemon__ability"
            v-if="pokemon.ability !== '--'"
          >
            {{pokemon.ability}}
          </div>
          <div
            class="pokemon__held_item"
          >
            {{pokemon.heldItem.name || 'Unknown'}}
          </div>
        </div>
      </div>
      <div class="pokemon__moves">
        <div class="move">
          <div class="move__icon">
            <img :src="'./assets/images/' + pokemon.move1.type.toLowerCase() + '.png'"></div>
          <div class="move__name">
            {{pokemon.move1.name}}
          </div>
        </div>
        <div class="move">
        <div class="move__icon">
          <img :src="'./assets/images/' + pokemon.move2.type.toLowerCase() + '.png'"></div>
          <div class="move__name">
            {{pokemon.move2.name}}
          </div>
        </div>
        <div class="move">
        <div class="move__icon">
          <img :src="'./assets/images/' + pokemon.move3.type.toLowerCase() + '.png'"></div>
          <div class="move__name">
            {{pokemon.move3.name}}
          </div>
        </div>
        <div class="move">
        <div class="move__icon">
          <img :src="'./assets/images/' + pokemon.move4.type.toLowerCase() + '.png'"></div>
          <div class="move__name">
            {{pokemon.move4.name}}
          </div>
        </div>
      </div>
    </div>
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
