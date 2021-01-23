Vue.component("Pokemon", {
  template: `
    <div 
      :class="{'pkmn': true, 'pkmn--fainted': isFainted, 'pkmn--empty': isEmptySlot}" 
      :style="{'background': slotBgColor }"
    >
      <div v-if="!isEmptySlot" class="pkmn__wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" class="pkmn__hp">
          <path 
            d="M 10, 70 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            fill="none"
            :stroke="hpColor"
            stroke-width="5"
            :stroke-dasharray="hpDasharray"
          />
        </svg>

        <TrimmedSprite
          :key="pokemon.pid || 'egg'"
          :pokemon="pokemon"
          :maxBoundingBoxHeight="120"
          @done="fixedSprite = true"
          class="pkmn__sprite"
        ></TrimmedSprite>

        <div class="pkmn__details">
          <div class="details__name">{{nickname.toLowerCase()}}</div>
          <div class="details__level">Lvl. {{pokemon.level}}</div>
        </div>
      </div>
    </div>
  `,
  props: {
    pokemon: {},
    key: {},
  },
  data () {
    return {
      fixedSprite: false
    }
  },
  computed: {
    isEmptySlot() {
      return typeof this.pokemon === "undefined";
    },
    healthPercent() {
      return (100 / this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
    nickname() {
      return this.pokemon.nickname || this.pokemon.speciesName;
    },
    slotBgColor() {
      if (this.isEmptySlot) {
        return "#cccccc";
      }

      if (this.pokemon.types.length === 1) {
        return window.getTypeColor(this.pokemon.types[0].label);
      }

      const color = this.pokemon.types.reduce((gradient, type, idx) => {
        return gradient + (idx === 0
          ? "linear-gradient(to right, " + window.getTypeColor(type.label)
          : " 0%, " + window.getTypeColor(type.label) + " 100%)");
      }, "");

      return color;
    },
    hp() {
      if (this.pokemon.hp.current === this.pokemon.hp.max) {
        return 100;
      }

      return ((this.pokemon.hp.current * 100) / this.pokemon.hp.max);
    },
    hpColor() {
      const hp = this.hp;
      if (hp <= 20) {
        return '#942e2e'
      }

      if (hp <= 50) {
        return '#94862e'
      }

      return '#2e9475'
    },
    hpDasharray() {
      const radius = 60;
      const circum = 2 * Math.PI * radius; // HP circle radius is always 60
      return circum * this.hp / 100 + ', ' + circum
    },
    isFainted() {
      return !this.isEmptySlot && this.pokemon.hp.current === 0
    },
    selectedPokemon: {
      get: function () {
        return this.nickname;
      },
      set: function () {
        this.$emit("change", this.nickname);
      },
    },
    watch: {
      pokemon (oldPoke, newPoke) {
        if (oldPoke.img !== newPoke.img) {
          this.fixedSprite = false
        }
      }
    }
  },
});
