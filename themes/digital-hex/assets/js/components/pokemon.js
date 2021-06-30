Vue.component( "Pokemon", {
  template: `
    <div :style="mainStyle" :class="{ 'pokemon': true, 'isDead': isDead, 'isEmpty': !pokemonExists, 'loaded': loaded, 'staggered': settings.theme.staggered }">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="250"
        height="250"
        viewbox="0 0 250 200"
        style="padding:0px;"
      >
      <path
        id="background"
        class="slot__background"
        fill="#252027"
        stroke-width="0px"
        style=""
        d="M86.60254037844386 5L169.20508075688772 55L169.20508075688772 151L86.60254037844386 201L5 151L5 55Z"
      >
      </path>
      <defs>
        <clipPath id="hexagon">
          <path
            fill="transparent"
            stroke-width="0"
            style=""
            d="M86.60254037844386 5L169.20508075688772 55L169.20508075688772 151L86.60254037844386 201L5 151L5 55Z"
            class="slot__border-background"
          >
          </path>
        </clipPath>
      </defs>
      <path
        id="clip"
        class="slot__background-inner"
        :fill="borderColor"
        stroke-width="0px"
        style="opacity:0.3;"
        d="M91.28203230275508 29L155.56406460551017 64L155.56406460551017 137L89.28203230275508 177L29 141L29 61Z"
      >
      </path>
    </svg>

    <TrimmedSprite
      v-if="typeof pokemon == 'object'"
      :key="ident"
      :pokemon="pokemon"
      :maxBoundingBoxHeight="150"
      @done="loaded = true"
    ></TrimmedSprite>

    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="250"
      height="250"
      viewbox="0 0 250 200"
      style="padding:0px;"
      class="slot__border-wrapper"
    >
    <path
      fill="transparent"
      stroke="rgb(62 62 75)"
      stroke-width="10px"
      style=""
      d="M86.60254037844386 5L169.20508075688772 55L169.20508075688772 151L86.60254037844386 201L5 151L5 55Z"
      class="slot__border-background"
    >
    </path>
    <path
      fill="transparent"
      :stroke="borderColor"
      stroke-dasharray="576.5182495117188 576.5182495117188"
      stroke-width="10px"
      stroke-linecap="butt"
      :stroke-dashoffset="dashOffset"
      d="M86.60254037844386 5L169.20508075688772 55L169.20508075688772 151L86.60254037844386 201L5 151L5 55Z"
      class="slot__border"
    >
    </path>
  </svg>
  </div>
  `,
  props: {
    pokemon: {},
    key: {},
    stroke: {
      type: Number,
      default () {
        return 10
      }
    }
  },
  data () {
    return {
      settings: {},
      loaded: false
    }
  },
  created () {
    this.settings = window.settings;
  },
  computed: {
    pokemonExists () {
      if (!this.pokemon || !this.pokemon.hasOwnProperty('hp')) return false
      return true
    },
    dashOffset () {
      if (this.pokemonExists === false ) { return false; }
      if (this.settings.theme.hideHPBar) return 0;
      return 576.5182495117188 - (this.healthPercent / 100 * 576.5182495117188)
    },
    healthPercent() {
      if (this.pokemonExists === false ) { return null; }
      return (100/this.pokemon.hp.max) * this.pokemon.hp.current
    },
    isDead () {
      if (typeof this.pokemon === "undefined") { return false; }

      return parseFloat(this.healthPercent) === 0
    },
    level () {
      if (this.pokemonExists === false ) { return null; }
      return this.pokemon.level || '0';
    },
    nickname() {
      if (this.pokemonExists === false ) { return null; }
      return this.pokemon.nickname || this.pokemon.speciesName;
    },
    sex() {
      return (this.pokemon.isGenderless ? '' : (this.pokemon.isFemale ? 'female' : 'male'));
    },
    ident () {
      if (this.pokemonExists === false ) { return null; }
      return this.pokemon.pid;
    },
    opacity() {
      if (typeof this.pokemon === "undefined") { return '0.4'; }
      return '1';
    },
    hasItem() {
      if (this.pokemonExists === false ) { return null; }
      if (typeof this.pokemon === "undefined") { return false; }
      if (typeof this.pokemon.heldItem === "undefined") { return false; }
      if (typeof this.pokemon.heldItem.id === "undefined") { return false; }
      return this.pokemon.heldItem.id !== 0;
    },
    sprite () {
      console.log(this.pokemon)
      if (typeof this.pokemon === "undefined") { return ''; }
      if (this.pokemon.img) {
        return this.pokemon.img;
      }

      return '';
    },
    mainStyle () {
      if (this.pokemonExists === false ) { return null; }
      let styles = {
        // 'opacity': this.opacity,
      }

      if (this.pokemon) {
        let primaryType = this.pokemon.types[0].label.toLowerCase()
        styles = {...styles, }//'background-image': 'linear-gradient(180deg, ' + this.settings.typeColors[primaryType] + ', white)'}
      }

      return styles;
    },

    borderColor () {
      if (this.pokemonExists === false ) { return '#7375ae'; }
      let primaryType = this.pokemon.types[0].label.toLowerCase()
      return this.settings.typeColors[primaryType]
    },
    nature () {
      if (typeof this.pokemon === "undefined") { return ''; }
      if (!this.pokemon.nature) return ''

      return this.pokemon.nature.charAt(0).toUpperCase() + this.pokemon.nature.slice(1)
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
  watch: {
    pokemon (oldPoke, newPoke) {
      if (oldPoke.img !== newPoke.img) {
        this.fixedSprite = false
      }
    }
  }
});
