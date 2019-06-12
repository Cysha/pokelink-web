Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true }" :style="{'opacity': opacity }">
      <Bg :border="getBorderColor()" :bgc="getBgColor()" :type1="type1" :type2="type2" :ident="ident"></Bg>
      <Pokeball :topColor="getPokeballTopColor()" :bottomColor="getPokeballBottomColor()"></Pokeball>
      <label v-if="typeof pokemon == 'object'">
        <input class="radio" type="radio" name="poke" :id="pokemon.nickname" :value="pokemon.nickname" v-model="selectedPokemon">
        <span class="lvl">Lv. {{ pokemon.level }}</span>
        <span class="sex" :class="sex" v-if="sex !== ''">
          <Female v-if="sex === 'female'"></Female>
          <Male v-else></Male>
        </span>
        <img v-if="pokemon.isEgg" class="sprite" :src="pokemon.img" style="max-height: 80px;" />
        <img v-else class="sprite" :src="pokemon.img" />
        <span class="candy" v-if="hasItem"></span>
        <div class="details">
          <h2 class="name">{{ pokemon.nickname }}</h2>
          <div class="hp">
            <div class="bar">
              <div class="health" :style="{ width: healthPercent }" :class="{ low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }"></div>
            </div>
            <span class="text">{{ pokemon.hp.current }} / {{ pokemon.hp.max }}</span>
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
      if (settings.letsgo.colorPokeball !== true) { return 'white'; }
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
      if (settings.letsgo.colorPokeball !== true) { return 'white'; }
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.2)'; }

      if (settings.pokeImg.pokemonColor === true) {
        if (settings.letsgo.colorBothSidesPokeball !== true) { return 'white'; }
        return this.pokemon.color;
      }

      if (settings.pokeImg.routeColor === true) {
        if (settings.letsgo.colorBothSidesPokeball !== true) { return 'white'; }
        return string2Hex(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.typeColor === true) {
        if (this.pokemon.types.length === 2) {
          return getTypeColor(this.pokemon.types[1].label);
        }
        return getTypeColor(this.pokemon.types[0].label);
      }

      if (settings.pokeImg.staticColor !== false) {
        if (settings.letsgo.colorBothSidesPokeball !== true) { return 'white'; }
        return settings.pokeImg.staticColor;
      }

      return 'white';
    },

    getBorderColor: function() {
      if (settings.letsgo.colorBorder !== true) { return 'white'; }
      if (typeof this.pokemon === "undefined") { return 'white'; }

      if (settings.pokeImg.staticColor !== false) {
        return normalizeColor(settings.pokeImg.staticColor);
      }

      if (settings.pokeImg.routeColor === true) {
        return string2Hex(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.pokemonColor === true) {
        return hex2rgba(settings.htmlColors[this.pokemon.color], 50);
      }

      if (settings.pokeImg.typeColor === true || settings.pokeImg.staticColor !== false) {
        return 'url(#types-'+this.pokemon.species+')';
      }

      return 'white';
    },

    getBgColor: function() {
      if (settings.letsgo.colorBg !== true) { return 'rgba(255,255,255,.5)'; }
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.5)'; }

      if (settings.pokeImg.routeColor === true) {
        return string2Hex(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.pokemonColor === true) {
        return hex2rgba(settings.htmlColors[this.pokemon.color], 50);
      }

      if (settings.pokeImg.typeColor === true || settings.pokeImg.staticColor !== false) {
        return 'url(#types-'+this.pokemon.species+')';
      }

      return 'rgba(255,255,255,.5)';
    },
  }
});
