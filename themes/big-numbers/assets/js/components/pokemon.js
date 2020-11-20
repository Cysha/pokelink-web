Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true, 'isDead': isDead, isDamaged: justTookDamage, 'closing': isClosing, 'active': isActive}">
      <div class="slot_id">{{slotId}}</div>
      <div class="pokemon__card-art" :style="{'background-image': 'url(' + customCardArt + ')'}"></div>
      <div class="pokemon__container" :style="typeColorBackgroundStyle">
        <div class="hp" v-if="pokemonExists && !pokemon.isEgg">
          <div :style="{width:healthPercent}" :class="{ hp__inner: true, low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }"></div>
        </div>

        <div class="sleeping" v-if="isSleeping">
          <span>z</span>
          <span>z</span>
          <span>z</span>
        </div>

        <div class="pokemon__row" v-if="pokemonExists">
          <div class="pokemon__level" v-if="pokemon.level">
            <small>Lv.</small>{{pokemon.level}}
          </div>
          <div class="pokemon__image">
            <img v-if="pokemon.isEgg" class="sprite" :src="pokemon.img" style="transform: scale(0.8); bottom: 0px;" />
            <img v-else class="sprite" :src="pokemon.img" />
          </div>
        </div>

        <!--<div class="pokemon__name" :style="nameStyle" v-if="pokemonExists">
          {{pokemon.nickname}}
        </div>-->

        <!--<div class="pokemon__heldItem" v-if="hasItem"><img :src="pokemon.heldItem.img" /></div>-->

        <!--<div class="exp" v-if="pokemonExists && !pokemon.isEgg">
          <div :style="{width:experienceRemaining}" class="exp__inner"></div>
        </div>-->
      </div>
    </div>
  `,
  props: {
    pokemon: {},
    slotId: null
  },
  data () {
    return {
      settings: {},
      justTookDamage: false,
      customCardArt: null,
      pokeIsChanging: false,
      isFresh: true,
      newCardArt: null,
      sets: []
    }
  },
  created () {
    this.settings = window.settings;
    this.sets = this.settings.theme.pokemonTCGCardSets()
  },
  mounted () {
    this.pokeIsChanging = false
    if (this.pokemonExists && this.settings.pokeImg.useCardArtBackground) this.getNewCardArt(this.pokemon)
  },
  methods: {
    getNewCardArt (poke) {
      let vm = this
      if (!this.isFresh) {
        this.pokeIsChanging = true
      }
      if (!this.settings.pokeImg.useCardArtBackground) {
        setTimeout(() => {
          this.pokeIsChanging = false
        }, 1400)
        return false
      }

      let isFresh = this.customCardArt === null && this.isFresh === true
      if (!this.isFresh) {
        this.pokeIsChanging = true
      }
      this.isFresh = false

      fetch('https://api.pokemontcg.io/v1/cards?setCode=' + this.sets.join('|') + '&supertype=pokemon&nationalPokedexNumber=' + poke.species)
        .then(response => response.json())
        .then(cards => {
          let setOrder = this.sets
          // try {
            cardImages = cards
              .cards
              .sort((a,b) => {
                return setOrder.findIndex(set => set === a.setCode) - setOrder.findIndex(set => set === b.setCode)
              })

              cardImages = cardImages.find(card => card.nationalPokedexNumber === poke.species)
              this.newCardArt = cardImages.imageUrl

            if (!isFresh) {
              setTimeout(() => {
                this.customCardArt = this.newCardArt
                this.pokeIsChanging = false
              }, 1400)
            } else {
              this.customCardArt = cardImages.imageUrl
              this.pokeIsChanging = false
            }
          // } catch (e) {
          //   console.log(e)
          //   // console.log(`unknown image for ${vm.pokemon.speciesName}`)
          //   // console.info(cards.cards)
          //
        });
    }
  },
  computed: {
    pokemonExists () {
      if (!this.pokemon || !this.pokemon.hasOwnProperty('hp')) return false
      return true
    },
    isActive () {
      if (!this.settings.pokeImg.useCardArtBackground) {
        return !this.pokeIsChanging
      }
      return this.customCardArt && !this.pokeIsChanging;
    },
    isClosing () {
      return this.pokeIsChanging === true
    },
    healthPercent() {
      if (!this.pokemon || !this.pokemon.hasOwnProperty('hp')) return '0%'
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
      if (this.pokemonExists === false ) { return null; }
      return this.pokemon.species;
    },
    opacity() {
      if (this.pokemonExists === false ) { return '0.4'; }
      return '1';
    },
    hasItem() {
      if (this.pokemonExists === false ) { return false; }
      if (typeof this.pokemon.heldItem === "undefined") { return false; }
      return this.pokemon.heldItem.id !== 0;
    },
    sprite () {
      if (this.pokemonExists === false ) { return ''; }
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
    mainStyle () {
      if (this.pokemonExists === false ) { return false; }
      // let styles = {
      //   'opacity': this.opacity,
      // }

      if (this.pokemon) {
        let primaryType = this.pokemon.types[0].label.toLowerCase()
        styles = {...styles, 'background-image': 'linear-gradient(180deg, ' + this.settings.typeColors[primaryType] + ', white)'}
      }

      // return styles;
    },

    typeColorBackgroundStyle () {
      if (this.pokemonExists === false ) { return false; }
      if (this.settings.pokeImg.useTypesGradient === false) return false
      let styles = {
        'opacity': this.opacity,
      }

      if (this.pokemon) {
        let primaryType = this.pokemon.types[0].label.toLowerCase()
        let secondaryType = primaryType;
        // if (this.pokemon.types.length > 1) {
        //   secondaryType = this.pokemon.types[1].label.toLowerCase()
        // }

        styles = {...styles, 'background-image': 'linear-gradient(90deg, ' + this.settings.typeColors[primaryType] + ', ' + this.settings.typeColors[secondaryType]  + ')'}
      }

      return styles;
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
    pokemon (newVal, oldVal) {
      try {
        if ((!oldVal.hasOwnProperty('hp') && newVal.hasOwnProperty('hp')) || newVal.species !== oldVal.species) {
          this.getNewCardArt(newVal)
        }

        if (!newVal.hasOwnProperty('hp')) {
          this.customCardArt = null
        }

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
