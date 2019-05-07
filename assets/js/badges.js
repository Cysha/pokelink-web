new Vue({
  el: '#badges',
  data: function () {
    return {
      badges: []
    };
  },
  mounted: function () {
    var vm = this;
    client.setup(settings.port, 'badges-'+settings.currentUser+'-browser', settings.server, () => {})
      .on('player:trainer:updated', (data) => {
        console.log(data)
        this.badges = data.update.trainer.badges.map(function(badge) {
          var badgeObj = {};
          badgeObj.img = 'https://pokelink.cybershade.org/assets/sprites/badges/'+badge.name.toLowerCase()+'.png';
          badgeObj.label = badge.name+' Badge';
          badgeObj.active = badge.value
          return badgeObj;
        });
      });
  },
  updated: function( ){
    var vm = this;
  },
  methods: {

  }
});
