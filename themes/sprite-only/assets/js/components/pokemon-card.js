Vue.component( "pokemon-card", {
  template: `
  <div>
    <div :class="{ 'pokemon__slot': true }" v-if="pokemon !== null">
      <div :class="{ 'pokemon__image': true, 'pokemon__dead': (pokemon.hp.current == 0)}">
          <img :src="pokemon.img">
      </div>
    </div>
    <div class="pokemon__slot pokemon__empty" v-else>
      <div class="pokemon__image">
      </div>
    </div>
  </div>
  `,
  props: {
    pokemon: {
      default: null,
      type: Object,
      required: false
    }
  },
  computed: {

  }
});
