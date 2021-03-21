Vue.component("Pokemon", {
    template: `
    <div :class="{ 'pokemon': true, 'opaque': !fixedSprite, 'isDead': isDead}" :style="backgroundGradientStyle">
        <div v-if="pokemonExists" class="pokemon__card-art" :style="{'background-image': 'url('+customCardArt+')'}">
        </div>
        <div class="pokemon__sprite" v-if="pokemonExists">
            <TrimmedSprite :pokemon="pokemon" :maxBoundingBoxHeight="150" v-if="typeof pokemon == 'object'" @done="actionOnImageLoaded"></TrimmedSprite>
        </div>
        <div class="pokemon__heldItem" v-if="hasItem">
            <img :src="pokemon.heldItem.img">
        </div>
        <div class="pokemon__details" v-if="pokemonExists">
        <div class="pokemon__hp">
            <div><small>Lv.</small>{{pokemon.level}}</div>
            <div>HP: {{pokemon.hp.current}} / {{ pokemon.hp.max}}</div>
            <div>Exp: {{pokemon.exp}}</div>
        </div>
        <div v-if="pokemon.isegg" class="pokemon__nickname">
            Egg
        </div>
        <div v-else class="pokemon__nickname">
        <div>{{pokemon.speciesName}}<br>{{pokemon.nickname}}</div>
        </div>
        <div class="pokemon__extra-deets">
            {{statusEffectsSlide}}
            {{pokemon.hiddenpower}}
        </div>
            </div>
        </div>`,
    props: {
        pokemon: {},
        key: {}
    },
    data() {
        return {
            fixedSprite: false,
            settings: null,
            customCardArt: null,
            pokeIsChanging: false,
            isFresh: true,
            newCardArt: null,
            sets: []
        }
    },
    created() {
        this.settings = window.settings;
        this.sets = this.settings.theme.pokemonTCGCardSets()
    },
    mounted() {
        this.pokeIsChanging = false
        if (this.pokemonExists && this.settings.pokeImg.useCardArtBackground) this.getNewCardArt(this.pokemon)
        if (this.pokemonExists === false) this.actionOnImageLoaded()
    },
    computed: {
        isDead() {
            if (this.pokemonExists === false) { return false; }

            return parseFloat(this.healthPercent) === 0
        },
        pokemonExists() {
            if (!this.pokemon || !this.pokemon.hasOwnProperty('hp')) return false
            return true
        },
        healthPercent() {
            if (this.pokemonExists === false) { return '0%'; }
            return (100 / this.pokemon.hp.max) * this.pokemon.hp.current + "%";
        },
        nickname() {
            if (typeof this.pokemon === "undefined" || this.pokemon === null) { return null; }
            return this.pokemon.nickname || this.pokemon.speciesName;
        },
        sex() {
            if (this.pokemonExists === false) { return null }
            return (this.pokemon.isGenderless ? '' : (this.pokemon.isFemale ? 'female' : 'male'))
        },
        ident() {
            if (typeof this.pokemon === "undefined" || this.pokemon === null) { return null; }
            return this.pokemon.species;
        },
        opacity() {
            if (typeof this.pokemon === "undefined" || this.pokemon === null) { return '1'; }
            if (typeof this.fixedSprite === false) { return ''; }
            return '';
        },
        hasItem() {
            if (typeof this.pokemon === "undefined" || this.pokemon === null) { return false; }
            if (typeof this.pokemon.heldItem === "undefined") { return false; }
            return this.pokemon.heldItem.id !== 0;
        },

        type1() {
            if (typeof this.pokemon === "undefined" || this.pokemon === null) { return 'rgba(255,255,255,.2)'; }

            if (settings.pokeImg.staticColor !== false) {
                return normalizeColor(settings.pokeImg.staticColor, 100);
            }

            return hex2rgba(getTypeColor(this.pokemon.types[0].label), 50);
        },
        type2() {
            if (typeof this.pokemon === "undefined" || this.pokemon === null) { return 'rgba(255,255,255,.2)'; }

            if (settings.pokeImg.staticColor !== false) {
                return normalizeColor(settings.pokeImg.staticColor, 100);
            }

            if (this.pokemon.types.length == 2) {
                return hex2rgba(getTypeColor(this.pokemon.types[1].label), 50);
            }
            return hex2rgba(getTypeColor(this.pokemon.types[0].label), 50);
        },
        hasItem() {
            if (typeof this.pokemon === "undefined") { return false; }
            if (typeof this.pokemon.heldItem === "undefined") { return false; }
            return this.pokemon.heldItem.id !== 0;
        },
        experienceRemaining() {
            const expGroup = exp_groups_table.find(group => this.pokemon.species === group.id)
            const levelExp = experience_table.filter((expRange) => {
                return expRange.level === this.pokemon.level + 1 ||
                    expRange.level === this.pokemon.level
            })

            const totalExpForThisRange = levelExp[1][expGroup['levelling_type']] - levelExp[0][expGroup['levelling_type']]
            const expLeftInThisRange = this.pokemon.exp - levelExp[0][expGroup['levelling_type']]

            return (100 / totalExpForThisRange) * expLeftInThisRange + '%'
        },
        backgroundGradientStyle() {
            if (this.pokemonExists === false) { return false; }
            // let styles = {
            //   'opacity': this.opacity,
            // }

            let primaryType = this.pokemon.types[0].label.toLowerCase()
            styles = { 'background-image': 'linear-gradient(180deg, ' + this.settings.typeColors[primaryType] + ', black)' }

            return styles
        },

        statusEffectsSlide() {
            // const titles = {'psn': 'Poisoned', 'slp': 'Sleeping', 'par': 'Paralyzed', 'fzn': 'Frozen', 'brn': 'Burned'}
            // let activeEffects = ['psn', 'slp', 'par', 'frz', 'brn']
            //   .filter(effect => this.pokemon.status[effect] === 1)

            if (this.isDead) return 'DEAD'

            if (this.pokemon.nature) {
                return `${this.pokemon.nature} natured`
            }

            return `${this.pokemon.ability}`
        },

        selectedPokemon: {
            get: function() {
                return this.nickname
            },
            set: function() {
                this.$emit("change", this.nickname)
            }
        },
        hideGender() {
            return settings.theme.hideGender;
        },
        hideLevel() {
            return settings.theme.hideLevel;
        },
    },
    methods: {
        getNewCardArt(poke) {
            let vm = this
            if (!this.isFresh) {
                this.pokeIsChanging = true
            }
            if (!this.settings.pokeImg.useCardArtBackground) {
                setTimeout(() => {
                    this.pokeIsChanging = false
                    this.actionOnImageLoaded()
                }, 1400)
                return false
            }

            let isFresh = this.customCardArt === null && this.isFresh === true
            if (!this.isFresh) {
                this.pokeIsChanging = true
            }
            this.isFresh = false

            if (!this.pokemonExists) {
                this.customCardArt = null
                this.pokeIsChanging = false
                this.actionOnImageLoaded()
                this.newCardArt = null
            }

            fetch('https://api.pokemontcg.io/v1/cards?setCode=' + this.sets.join('|') + '&supertype=pokemon&nationalPokedexNumber=' + poke.species)
                .then(response => response.json())
                .then(cards => {
                    let setOrder = this.sets
                        // try {
                    cardImages = cards
                        .cards
                        .sort((a, b) => {
                            return setOrder.findIndex(set => set === a.setCode) - setOrder.findIndex(set => set === b.setCode)
                        })

                    cardImages = cardImages.find(card => card.nationalPokedexNumber === poke.species)
                    this.newCardArt = cardImages.imageUrl

                    if (!isFresh) {
                        setTimeout(() => {
                            this.customCardArt = this.newCardArt
                            this.pokeIsChanging = false
                            this.actionOnImageLoaded()
                        }, 1400)
                    } else {
                        this.customCardArt = cardImages.imageUrl
                        this.pokeIsChanging = false
                        this.actionOnImageLoaded()
                    }
                    // } catch (e) {
                    //   console.log(e)
                    //   // console.log(`unknown image for ${vm.pokemon.speciesName}`)
                    //   // console.info(cards.cards)
                    //
                });
        },
        actionOnImageLoaded() {
            this.fixedSprite = true
            this.$emit('loaded')
        }
    },
    watch: {
        pokemon(newVal, oldVal) {
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
    }
});