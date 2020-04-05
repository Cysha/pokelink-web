Vue.component( "pokemon-card", {
  template: `
  <div class="card has-text-weight-bold has-text-white">
    <div class="card-image" v-if="typeof this.pokemon === 'object'">
      <div class="card-image-container">
        <span><img :src="imageTag" :data-missingno="isMissingno"/></span>
      </div>
    </div>
    <div class="card-content has-text-centered" v-if="typeof this.pokemon === 'object'">
      <div class="main">
        <div class="title has-text-white">{{ this.pokemon.nickname || this.pokemon.speciesName }}</div>
        <div class="hp" v-if="settings.hp">
          <div class="bar">
            <div class="health" :style="{ width: healthPercent }" :class="{ low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }"></div>
          </div>
          <span class="text">{{ pokemon.hp.current }} / {{ pokemon.hp.max }}</span>
        </div>
      </div>
      <div class="stats" v-if="typeof this.pokemon === 'object'">
        <div v-if="this.pokemon.level > 0">
          <span class="value">{{this.pokemon.level}}</span>
          <span class="tag">Level</span>
        </div>
        <div>
          <span class="img" v-for="type in this.pokemon.types"><img :src="'https://rplus.github.io/Pokemon-CP-list/img/type/type_'+type.label.toLowerCase()+'.png'" /></span>
          <span class="tag">Type(s)</span>
        </div>
        <div v-if="typeof this.pokemon.heldItem.id !== 'undefined'">
          <span class="img"><img :src="this.pokemon.heldItem.img" /></span>
          <span class="tag">Item</span>
        </div>
      </div>
    </div>
  </div>
  `,
  props: {
    pokemon: {},
    settings: {
      hp: false
    }
  },
  computed: {
    imageTag() {
      if (this.pokemon.species == -1 || this.pokemon.isEgg == true) {
        return this.pokemon.img;
      }

      var name = this.pokemon.species;

      if (this.pokemon.isShiny) {
        name = (this.pokemon.species+2000)+'-Shiny';
      }

      if (this.pokemon.alternateForm == 'mega' || this.pokemon.alternateForm == 'megay' || this.pokemon.alternateForm == 'megax') {
        name = (this.pokemon.species+8000)+'-'+(this.pokemon.alternateForm.replace(/^(.)|\s+(.)/g, function ($1) {
          return $1.toUpperCase()
        }));
      }

      let imageTag = name + '-' + this.pokemon.normalizeName;
      return 'http://static.pokemonpets.com/images/monsters-images-300-300/'+imageTag+'.png';
    },
    healthPercent() {
      return (100/this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
    isMissingno() {
      if (this.pokemon.isEgg) return false;

      return this.pokemon.species < 0 ? true : false;
    }
  }
});
