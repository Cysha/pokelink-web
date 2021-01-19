Vue.component("Pokemon", {
  template: `
    <div 
      :class="{'pkmn': true, 'pkmn--fainted': isFainted, 'pkmn--empty': isEmptySlot}" 
      :style="{'background': getBackgroundColor }"
    >
      <div v-if="typeof pokemon == 'object'" class="pkmn__wrapper">
        <svg viewBox="0 0 36 36" class="pkmn__hp">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            :stroke="getHPColor"
            stroke-width="1.5"
            :stroke-dasharray="getHP + ', 100'"
          />
        </svg>
        <img v-if="pokemon.isEgg" class="pkmn__sprite" :src="pokemon.img" style="max-height: 80px;" />
        <img v-else class="pkmn__sprite" :src="pokemon.img" />
        <div class="pkmn__details">
          <div class="details__name">
            {{pokemon.nickname.toLowerCase()}}
            <svg v-if="sex === 'female'" stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C9.23858 3 7 5.23858 7 8C7 10.419 8.71776 12.4367 11 12.9V15H8V17H11V21H13V17H16V15H13V12.9C15.2822 12.4367 17 10.419 17 8C17 5.23858 14.7614 3 12 3ZM9 8C9 9.65685 10.3431 11 12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8Z" fill="currentColor"></path></svg>
            <svg v-if="sex === 'male'" stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.1888 7L12.1909 5L19.1909 5.00746L19.1834 12.0075L17.1834 12.0053L17.1873 8.41678L14.143 11.4611C15.4612 13.4063 15.2587 16.0743 13.5355 17.7975C11.5829 19.7501 8.41709 19.7501 6.46447 17.7975C4.51184 15.8449 4.51184 12.6791 6.46447 10.7264C8.16216 9.02873 10.777 8.80709 12.7141 10.0615L15.7718 7.00382L12.1888 7ZM7.87868 12.1406C9.05025 10.9691 10.9497 10.9691 12.1213 12.1406C13.2929 13.3122 13.2929 15.2117 12.1213 16.3833C10.9497 17.5549 9.05025 17.5549 7.87868 16.3833C6.70711 15.2117 6.70711 13.3122 7.87868 12.1406Z" fill="currentColor"></path></svg>
            </div>
          <div class="details__level">Lvl. {{pokemon.level}}</div>
        </div>
      </div>
     <div v-else></div>
    </div>
  `,
  props: {
    pokemon: {},
    key: {},
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
    sex() {
      return this.pokemon.isGenderless
        ? ""
        : this.pokemon.isFemale
        ? "female"
        : "male";
    },
    hasItem() {
      if (typeof this.pokemon === "undefined") {
        return false;
      }
      if (typeof this.pokemon.heldItem === "undefined") {
        return false;
      }
      return this.pokemon.heldItem.id !== 0;
    },
    getBackgroundColor() {
      if (typeof this.pokemon === "undefined") {
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
    getHP() {
      if (this.pokemon.hp.current === this.pokemon.hp.max) {
        return 100;
      }

      return ((this.pokemon.hp.current * 100) / this.pokemon.hp.max);
    },
    getHPColor() {
      const hp = this.getHP;
      if (hp <= 20) {
        return '#942e2e'
      }

      if (hp <= 50) {
        return '#94862e'
      }

      return '#2e9475'
    },
    isFainted() {
      return typeof this.pokemon === "object" && this.pokemon.hp.current === 0
    },

    selectedPokemon: {
      get: function () {
        return this.nickname;
      },
      set: function () {
        this.$emit("change", this.nickname);
      },
    },
  },
});
