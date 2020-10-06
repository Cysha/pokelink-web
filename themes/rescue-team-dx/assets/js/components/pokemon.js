Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true, 'isDead': isDead }" :style="mainStyle">
      <img v-if="typeof pokemon == 'object'" :src="pokemon.img" style="visibility: hidden; position: absolute; left:99999px;top:999px;" @load="loaded">
      <div style="position: relative;" :style="{'background-image': 'url(' + image + ')'}" v-if="typeof pokemon == 'object' && image !== null">
        <!-- <img v-if="pokemon.isEgg" class="sprite" :src="pokemon.image" />
         <img v-else class="sprite" :src="pokemon.img" />-->

        <span class="sex" :class="sex" v-if="sex !== ''">
          <Female v-if="sex === 'female'"></Female>
          <Female v-if="sex === 'female'" color="#000000"></Female>
          <Male v-if="sex === 'male'"></Male>
          <Male v-if="sex === 'male'" color="#000000"></Male>
        </span>
      </div>
      <label v-else></label>
    </div>
  `,
  props: {
    pokemon: {},
    key: {}
  },
  data () {
    return {
      image: null,
      settings: {}
    }
  },
  created () {
    this.settings = window.settings;
  },
  computed: {
    healthPercent() {
      return (100/this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
    isDead () {
      if (typeof this.pokemon === "undefined") { return false; }

      return parseFloat(this.healthPercent) === 0
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
    mainStyle () {
      let styles = {
        'opacity': this.opacity
      }

      // if (this.pokemon) {
      //   let primaryType = this.pokemon.types[0].label.toLowerCase()
      //   styles = {...styles, 'background-image': 'linear-gradient(180deg, ' + this.settings.typeColors[primaryType] + ', white)'}
      // }

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
  methods: {
    loaded () {
      this.image = this.pokemon.img
    }
  },
  watch: {
    // pokemon (val, oldVal) {
    //   if (val.species !== oldVal.species) {
    //     let sprite = new Image()
    //     sprite.onload = function () {
    //       val.sprite = val.img
    //     }
    //     sprite.src = val.img
    //   }
    // }
  }
});
