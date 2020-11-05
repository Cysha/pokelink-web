Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true, 'isDead': isDead}" :style="{'opacity': opacity }">
      <div v-if="typeof pokemon == 'object'">

        <div class="exp" v-if="!pokemon.isEgg">
          <div :style="{width:experienceRemaining}" class="exp__inner"></div>
        </div>

        <div class="pokemon__image">
          <img v-if="pokemon.isEgg" class="sprite" :src="pokemon.img" style="max-height: 80%;" />
          <img v-else class="sprite" :src="pokemon.img" />
        </div>

        <div class="pokemon__name">
          {{pokemon.nickname}}
          <span
            class="pokemon__gender-icon pokemon__gender-icon--male"
            v-if="pokemon.isGenderless == 0 && pokemon.isFemale == 0"
          >
            ♂
          </span>
          <span
            class="pokemon__gender-icon pokemon__gender-icon--female"
            v-if="pokemon.isGenderless == 0 && pokemon.isFemale == 1"
          >
            ♀
          </span>
        </div>

        <div class="pokemon__level">
          <small>Lv</small>{{pokemon.level}}
        </div>

        <div class="pokemon_bg"></div>

        <div class="hp__text-values">{{pokemon.hp.current}} / {{pokemon.hp.max}}</div>
        <div class="hp__text-label">HP:</div>
        <div class="pokemon__hp">
          <div :class="{hp__inner: true, low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }" :style="{width: healthPercent}"></div>
        </div>

        <div class="moves">
          <div v-for="move in moves" class="move">
            <div class="move__icon"></div>
            <div class="move__name">
              <svg :viewBox="getViewBox(move.name)">
                <text x="50%" y="28" fill="white" text-anchor="middle">{{ move.name }}</text>
              </svg>
            </div>
            <div class="move__pp">{{move.pp}}</div>
          </div>
        </div>

        <div class="pokemon__heldItem" v-if="hasItem">
          <img :src="pokemon.heldItem.img">
        </div>
      </div>
    </div>
  `,
  props: {
    pokemon: {},
    key: {}
  },
  methods: {
    getViewBox(moveName) {
      let width = moveName.length * 17

      if (width < 70) width = 120
      return `0 0 ${width} 30`
    }
  },
  computed: {
    healthPercent() {
      return (100/this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
    isDead () {
      if (typeof this.pokemon != 'object') {
        return false
      }

      if (this.pokemon.hp.current != 0) return false

      return true
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

    moves () {
      return [this.pokemon.move1, this.pokemon.move2, this.pokemon.move3, this.pokemon.move4]
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
