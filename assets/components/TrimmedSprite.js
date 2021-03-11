Vue.component( 'TrimmedSprite', {
  template: `<div class="pokemon__image" ref="container">
        <img v-if="!isGif && pokemon.isEgg && !fixedSprite" @load="trim" class="sprite" :src="pokemon.img" style="transform: scale(0.8); bottom: 0px; visibility: hidden" />
        <img v-if="!isGif && !pokemon.isEgg && !fixedSprite" class="sprite" @load="trim" :src="pokemon.img" style="visibility: hidden" />
        <canvas v-if="!isGif" ref="canvas" width="2000" height="2000" :class="{sprite: fixedSprite}" :style="{'opacity': (fixedSprite ? '1' : '0')}"></canvas>
        <img
            v-if="isGif"
            :class="['sprite', {'sprite--gif': isGif}]"
            :src="pokemon.img"
            @load="fixedSprite = true"
            :style="{'opacity': (fixedSprite ? '1' : '0')}"
        >

    </div>`,
    props: {
        pokemon: {
            required: true
        }
    },
    data () {
        return {
            fixedSprite: false,
            defaultHeight: 2000,
            defaultWidth: 2000
        }
    },
    computed: {
        isGif () {
            return this.pokemon.img.split('.').pop().toLowerCase() === 'gif'
        }
    },
    methods: {
        trim () {
            if (this.oldImage === this.pokemon.img) return false
            this.oldImage = this.pokemon.img
            let vm = this
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = function() {
                var canvas = vm.$refs.canvas;
                var ctx = canvas.getContext('2d');
                canvas.width = vm.defaultWidth
                canvas.height = vm.defaultHeight
                ctx.clearRect(0, 0, vm.defaultWidth, vm.defaultHeight)
                ctx.drawImage(img, 0, 0);
                let trimmed = trimCanvas(canvas)
                canvas.width = trimmed.width
                canvas.height = trimmed.height
                var newImage = new Image()
                newImage.onload = function () {
                    ctx.drawImage(newImage, 0, 0);
                    vm.fixedSprite = true
                    vm.$emit('done')
                }
                newImage.src = trimmed.toDataURL()
            }
            img.src = this.pokemon.img
        }
    },
    watch: {
        pokemon: {
            deep: true,
            handler (newVal, oldVal) {
                if (this.oldImage !== newVal.img) {
                    this.fixedSprite = false
                }
            }
        }
    }
})