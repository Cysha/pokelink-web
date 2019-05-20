Vue.component( "pokemon-card", {
  template: `
  <div class="card has-text-weight-bold has-text-white">
    <div class="card-image" v-if="typeof this.pokemon === 'object'">
      <div class="card-image-container">
        <span>
          <img :src="'http://static.pokemonpets.com/images/monsters-images-300-300/'+imageTag+'.png'"/>
        </span>
      </div>
    </div>
    <div class="card-content has-text-centered" v-if="typeof this.pokemon === 'object'">
      <div class="main">
        <div class="title has-text-white">{{ this.pokemon.nickname || this.pokemon.speciesName }}</div>
        <div class="hp">
          <div class="bar">
            <div class="health" :style="{ width: healthPercent }" :class="{ low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }"></div>
          </div>
          <span class="text">{{ pokemon.hp.current }} / {{ pokemon.hp.max }}</span>
        </div>
      </div>
      <div class="stats" v-if="typeof this.pokemon === 'object'">
        <div>
          <span class="value">{{this.pokemon.level}}</span>
          <span class="tag">Level</span>
        </div>
        <div>
          <span class="img" v-for="type in this.pokemon.types"><img :src="'https://rplus.github.io/Pokemon-CP-list/img/type/type_'+type.label.toLowerCase()+'.png'" /></span>
          <span class="tag">Type(s)</span>
        </div>
        <div>
          <span class="img"><img :src="this.pokemon.heldItem.img" /></span>
          <span class="tag">Item</span>
        </div>
      </div>
    </div>
  </div>
  `,
  props: {
    pokemon: {},
  },
  computed: {
    imageTag() {
      return this.pokemon.species+'-'+this.pokemon.normalizeName;
    },
    healthPercent() {
      return (100/this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
  }
});
