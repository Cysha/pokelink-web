Vue.component( "Pokemon-Summary", {
  template: `
    <div :class="[...statusClasses, { 'pokemon': true, 'isDead': isDead, isDamaged: justTookDamage }]">
      <div style="display: flex;">
        <div class="pokemon-image__wrapper">
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

          <div class="hp__wrapper">
            <div class="hp" v-if="pokemonExists && !pokemon.isEgg">
              <div
                :style="{width:healthPercent}"
                :class="{ hp__inner: true, low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }"
              ></div>
            </div>
            <div class="hp__text">{{pokemon.hp.current}} / {{pokemon.hp.max}} HP</div>
          </div>


          <div class="pokemon__info-block" v-if="pokemonExists">
            <div class="pokemon__info">
              <div class="info__value">
                <img :src="pokemon.heldItem.img" v-if="hasItem">
              </div>
              <div class="info__title">Item</div>
            </div>
            <div class="pokemon__info">
              <div class="info__value">
                <img
                  v-for="type in pokemon.types"
                  :src="type.img"
                  style="height: "
                >
              </div>
              <div class="info__title">{{pokemon.types[0].label}}</div>
            </div>
            <div class="pokemon__info">
              <div class="info__value">{{pokemon.level}}</div>
              <div class="info__title">Level</div>
            </div>
          </div>

          <div class="separator"></div>

          <div class="pokemon__stats" v-if="pokemonExists">
            <div class="pokemon__stat">
              <div class="stat__title">HP</div>
              <div class="stat__value">{{pokemon.ivs.hp}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Atk</div>
              <div class="stat__value">{{pokemon.ivs.atk}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Def</div>
              <div class="stat__value">{{pokemon.ivs.def}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Sp.Atk</div>
              <div class="stat__value">{{pokemon.ivs.spatk}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Sp.Def</div>
              <div class="stat__value">{{pokemon.ivs.spdef}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Spd</div>
              <div class="stat__value">{{pokemon.ivs.spd}}</div>
            </div>
          </div>

          <div class="separator"></div>

          <div class="pokemon__stats" v-if="pokemonExists">
            <div class="pokemon__stat">
              <div class="stat__title">HP</div>
              <div class="stat__value">{{pokemon.evs.hp}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Atk</div>
              <div class="stat__value">{{pokemon.evs.atk}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Def</div>
              <div class="stat__value">{{pokemon.evs.def}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Sp.Atk</div>
              <div class="stat__value">{{pokemon.evs.spatk}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Sp.Def</div>
              <div class="stat__value">{{pokemon.evs.spdef}}</div>
            </div>
            <div class="pokemon__stat">
              <div class="stat__title">Spd</div>
              <div class="stat__value">{{pokemon.evs.spd}}</div>
            </div>
          </div>

          <div class="separator"></div>

          <div class="pokemon__moves" v-if="pokemonExists">
            <div class="pokemon__move" v-for="move in moves" v-if="move.name.length > 0">
              <div class="move__icon">
                <img
                  :src="settings.imgPaths.types + move.type + '.png'"
                >
                </div>
              <div class="move__title">{{move.name}}</div>
              <div class="move__power">
                <span
                  class="pp-shape"
                  :style="{'background-color': move.color}"
                  v-for="remainingMovePPPercentage in move.remaining"
                ></span>
              </div>
              <div class="move__pp">{{move.pp}}</div>
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
      settings: {},
      justTookDamage: false,
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
      if (this.pokemonExists === false ) { return false; }
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
    moves () {
      return [this.pokemon.move1, this.pokemon.move2, this.pokemon.move3, this.pokemon.move4]
        .map(move => {
          let moveType = movedex.all().find(iteratedMove => iteratedMove.ename.toLowerCase() === move.name.toLowerCase())
          return {
            ...move,
            type: moveType.type.toLowerCase(),
            maxPP: moveType.pp,
            color: this.settings.typeColors[moveType.type.toLowerCase()],
            remaining: Math.ceil(((move.pp / moveType.pp) * 100) / 25)
          }
        })
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
