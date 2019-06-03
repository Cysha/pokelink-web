Vue.component( "pokemon-card", {
  template: `
  <div class="party_row">
    <div class="sprite"><img :src="imageTag"/></div>
    <div class="details">
      <div class="half top">
        <div class="identity text">
          <span v-if="this.pokemon.isShiny == 1"><img src="./assets/images/shiny.png" alt="" /></span>{{ this.pokemon.nickname || this.pokemon.speciesName }} <span class="pokemon__gender pokemon__gender-male" v-if="this.pokemon.isGenderless == 0 && this.pokemon.isFemale == 0">♂</span><span class="pokemon__gender pokemon__gender-female" v-if="this.pokemon.isGenderless == 0 && this.pokemon.isFemale == 1">♀</span>
        </div>
        <div class="hp text">{{ pokemon.hp.current }}/{{ pokemon.hp.max }}</div>
      </div>
      <div class="half bottom">
        <div class="level half">
          <span :class="' text pokemon__status  pokemon__status-'+ this.pokemon.status.img.toLowerCase()" v-if="this.pokemon.status.img != 0">
              {{this.pokemon.status.img}}
          </span>
          <span class="level text">:L{{this.pokemon.level}}</span>
        </div>
        <div class="half heathBar">
          <div class="heathBar__label text">HP:</div>
          <div class="healthBar__bar">
            <div class="bar">
              <div class="health" :style="{ width: healthPercent }" :class="{ low: parseFloat(healthPercent) <= 50, critical: parseFloat(healthPercent) <= 15 }"></div>
            </div>
          </div>
          <div class="healthBar__chock"></div>
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
      return this.pokemon.img;
    },
    healthPercent() {
      return (100/this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
  }
});
