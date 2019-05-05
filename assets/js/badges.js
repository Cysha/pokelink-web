new Vue({
  el: '#badges',
  data: function () {
    return {
      badges: {}
    };
  },
  mounted: function () {
    var vm = this;
    this.badges = collect(badges).where('id', 'PM_CRYSTAL').first().badges.map(function(badge) {
      var badgeObj = {};
      badgeObj.img = 'https://pokelink.cybershade.org/assets/sprites/badges/'+badge.toLowerCase()+'.png';
      badgeObj.label = badge+' Badge';
      badgeObj.active = collect([true, false]).random();
      return badgeObj;
    });
  },
  updated: function( ){
    var vm = this;
  },
  methods: {

  }
});
