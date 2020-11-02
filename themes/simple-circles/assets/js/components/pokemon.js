Vue.component( "Pokemon", {
  template: `
    <div :style="mainStyle">
      <div
        :class="{ 'pokemon': true, 'isDead': isDead, 'isEmpty': !pokemonExists }"
        :style="{'height': (radius * 2) + 'px', 'width': (radius * 2) + 'px'}"
      >
        <svg
          class="outerHPBar"
          :height="radius * 2"
          :width="radius * 2"
        >
        <circle
          stroke="#d5d5d5"
          :stroke-dasharray="circumference + ' ' + circumference"
          :stroke-width="stroke"
          fill="#ffffff"
          :r="normalizedRadius"
          :cx="radius"
          :cy="radius"
        />
        <circle
          v-if="typeof pokemon == 'object'"
          :class="{hpBar: true, low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }"
          stroke="#00ff00"
          :stroke-dasharray="circumference + ' ' + circumference"
          :style="'stroke-dashoffset:' + dashOffset"
          :stroke-width="stroke"
          fill="transparent"
          :r="normalizedRadius"
          :cx="radius"
          :cy="radius"
        />
      </svg>

      <TrimmedSprite
        v-if="typeof pokemon == 'object'"
        :key="ident"
        :pokemon="pokemon"
        :maxBoundingBoxHeight="150"
        @done="fixedSprite = true"
        :style="{'max-height': 'calc(' + radius + 'px * 0.8)', 'max-width': 'calc(' + radius + 'px * 0.8)'}"
      ></TrimmedSprite>

      <div class="pokemon__details">
        <div class="pokemon__name">
          {{pokemon.nickname}}
        </div>
      </div>
    </div>
  </div>
  `,
  props: {
    pokemon: {},
    key: {},
    radius: {
      type: Number,
      default () {
        return 100
      }
    },
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
      fixedSprite: false
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
    normalizedRadius () {
      return this.radius - this.stroke * 2
    },
    circumference () {
      return rootCircumference = this.normalizedRadius * 2 * Math.PI
    },
    dashOffset () {
      if (this.pokemonExists === false ) { return false; }
      return this.circumference - (this.healthPercent / 100 * this.circumference)
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
        'opacity': this.opacity,
      }

      if (this.pokemon) {
        let primaryType = this.pokemon.types[0].label.toLowerCase()
        styles = {...styles, }//'background-image': 'linear-gradient(180deg, ' + this.settings.typeColors[primaryType] + ', white)'}
      }

      return styles;
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
