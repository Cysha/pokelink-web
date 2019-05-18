Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true }" :style="{'opacity': opacity }">
      <Bg :border="getBorderColor()" :bgc="getBgColor()" :type1="type1" :type2="type2" :ident="ident"></Bg>
      <Pokeball :topColor="getPokeballTopColor()" :bottomColor="getPokeballBottomColor()"></Pokeball>
      <label v-if="typeof pokemon != 'undefined'">
        <input class="radio" type="radio" name="poke" :id="pokemon.nickname" :value="pokemon.nickname" v-model="selectedPokemon">
        <span class="lvl">Lv. {{ pokemon.level }}</span>
        <span class="sex" :class="sex" v-if="sex !== ''">
          <Female v-if="sex === 'female'"></Female>
          <Male v-else></Male>
        </span>
        <img class="sprite" :src="pokemon.img" />
        <span class="candy" v-if="pokemon.heldItem.id !== 0"></span>
        <div class="details">
          <h2 class="name">{{ pokemon.nickname }}</h2>
          <div class="hp">
            <div class="bar">
              <div class="health" :style="{ width: healthPercent }" :class="{ low: healthPercent <= 50, critical: healthPercent <= 15 }"></div>
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

    type1() {
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.2)'; }
      return this.convertHex(this.getTypeColor(this.pokemon.types[0].label), 50);
    },
    type2() {
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.2)'; }

      if (this.pokemon.types.length == 2) {
        return this.convertHex(this.getTypeColor(this.pokemon.types[1].label), 50);
      }
      return this.convertHex(this.getTypeColor(this.pokemon.types[0].label), 50);
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


    getTypeColor: function(type) {
      if (typeof type !== 'string') { return 'white'; }
      if (type.len == 0) { return 'white'; }

      return settings.typeColors[type.toLowerCase()];
    },
    stringToColour: function(str) {
      var colorHash = new ColorHash({lightness: 0.5});
      return colorHash.hex(str);
    },

    getPokeballTopColor: function() {
      if (settings.pokeImg.letsgo.colorPokeball !== true) { return 'white'; }
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.2)'; }

      if (settings.pokeImg.pokemonColor === true) {
        return this.pokemon.color;
      }

      if (settings.pokeImg.routeColor === true) {
        return this.stringToColour(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.typeColor === true) {
        return this.getTypeColor(this.pokemon.types[0].label);
      }

      return 'white';
    },
    getPokeballBottomColor: function() {
      if (settings.pokeImg.letsgo.colorPokeball !== true) { return 'white'; }
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.2)'; }

      if (settings.pokeImg.pokemonColor === true) {
        if (settings.pokeImg.letsgo.colorBothSidesPokeball !== true) { return 'white'; }
        return this.pokemon.color;
      }

      if (settings.pokeImg.routeColor === true) {
        if (settings.pokeImg.letsgo.colorBothSidesPokeball !== true) { return 'white'; }
        return this.stringToColour(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.typeColor === true) {
        if (this.pokemon.types.length === 2) {
          return this.getTypeColor(this.pokemon.types[1].label);
        }
        return this.getTypeColor(this.pokemon.types[0].label);
      }

      return 'white';
    },

    getBorderColor: function() {
      if (settings.pokeImg.letsgo.colorBorder !== true) { return 'white'; }
      if (typeof this.pokemon === "undefined") { return 'white'; }

      if (settings.pokeImg.routeColor === true) {
        return this.stringToColour(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.pokemonColor === true) {
        return this.convertHex(settings.htmlColors[this.pokemon.color], 50);
      }

      if (settings.pokeImg.typeColor === true) {
        return 'url(#types-'+this.pokemon.species+')';
      }

      return 'white';
    },

    getBgColor: function() {
      if (settings.pokeImg.letsgo.colorBg !== true) { return 'rgba(255,255,255,.5)'; }
      if (typeof this.pokemon === "undefined") { return 'rgba(255,255,255,.5)'; }

      if (settings.pokeImg.routeColor === true) {
        return this.stringToColour(this.pokemon.locationMet.toString());
      }

      if (settings.pokeImg.pokemonColor === true) {
        return this.convertHex(settings.htmlColors[this.pokemon.color], 50);
      }

      if (settings.pokeImg.typeColor === true) {
        return 'url(#types-'+this.pokemon.species+')';
      }

      return 'rgba(255,255,255,.5)';;
    },

    convertHex: function(hex,opacity){
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }
  }
});
