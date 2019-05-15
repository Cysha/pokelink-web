Vue.component( "Pokemon", {
  template: `
    <div :class="{ 'pokemon': true }">
      <Bg></Bg>
      <Pokeball></Pokeball>
      <label>
        <input class="radio" type="radio" name="poke" :id="pokemon.nickname" :value="pokemon.nickname" v-model="selectedPokemon">
        <span class="lvl">Lv. {{ pokemon.level }}</span>
        <span class="sex" :class="sex" v-if="sex !== ''">
          <Female v-if="sex === 'female'"></Female>
          <Male v-else></Male>
        </span>
        <img class="sprite" :src="pokemon.img" />
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
    </div>
  `,
  props: {
    pokemon: {}
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
  }
});
