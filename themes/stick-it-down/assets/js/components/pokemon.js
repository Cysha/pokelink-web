Vue.component( "Pokemon", {
  template: `
    <div :class="[...statusClasses, { 'pokemon': true, 'isDead': isDead, isDamaged: justTookDamage }]">
      <div style="display: flex;">
        <div class="pokemon-image__wrapper" :style="'background-color:' + cellColour">
          <TrimmedSprite
            v-if="pokemonExists"
            :key="ident"
            :pokemon="pokemon"
            @done="fixedSprite = true"
          ></TrimmedSprite>
        </div>

        <div class="pokemon__details">
          <div class="pokemon__name" v-if="pokemonExists">
            {{pokemon.nickname}}
          </div>
          <div class="pokemon__level" v-if="pokemonExists">
            <small>Lv. {{pokemon.level}}</small>
          </div>
          <div class="hp" v-if="pokemonExists && !pokemon.isEgg">
            <div
              :style="{width:healthPercent}"
              :class="{ hp__inner: true, low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }"
            ></div>
          </div>
        </div>
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
      settings: {},
      justTookDamage: false
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
    healthPercent() {
      if (this.pokemonExists === false ) { return 0; }
      return (100/this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
    isDead () {
      if (this.pokemonExists === false ) { return false; }

      return parseFloat(this.healthPercent) === 0
    },
    isSleeping () {
      if (this.pokemonExists === false ) { return false; }

      return this.pokemon.status.slp === 1
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
    sprite () {
      console.log(this.pokemon)
      if (typeof this.pokemon === "undefined") { return ''; }
      if (this.pokemon.img) {
        return this.pokemon.img;
      }

      return '';
    },
    experienceRemaining () {
      const expGroup = exp_groups_table.find(group => this.pokemon.species === group.id)
      const levelExp = experience_table.filter((expRange) => {
        return expRange.level === this.pokemon.level+1
            || expRange.level === this.pokemon.level
      })

      const totalExpForThisRange = levelExp[1][expGroup['levelling_type']] - levelExp[0][expGroup['levelling_type']]
      const expLeftInThisRange = this.pokemon.exp - levelExp[0][expGroup['levelling_type']]

      return (100/totalExpForThisRange) * expLeftInThisRange + '%'
    },
    statusClasses () {
      if (typeof this.pokemon === "undefined") { return []; }
      let statuses = []
      if (this.pokemon.status.psn === 1) statuses = [...statuses, 'isPoisoned']
      if (this.pokemon.status.par === 1) statuses = [...statuses, 'isParalyzed']
      if (this.pokemon.status.brn === 1) statuses = [...statuses, 'isBurned']
      if (this.pokemon.status.fzn === 1) statuses = [...statuses, 'isFrozen']

      return statuses
    },
    cellColour () {
      if (!this.pokemonExists) return '#120c2f'
      const primaryType = this.pokemon.types[0].label.toLowerCase()
      return this.settings.typeColors[primaryType]
    },
    selectedPokemon: {
      get: function() {
        return this.nickname
      },
      set: function() {
        this.$emit( "change", this.nickname )
      }
    },
  },
  watch: {
    pokemon (newVal, oldVal) {
      try {
        if (newVal.hp.current < oldVal.hp.current) {
          this.justTookDamage = true
          setTimeout(() => {
            this.justTookDamage = false
          }, 3000)
        }
      } catch (e) {
        return
      }
    }
  },
});
