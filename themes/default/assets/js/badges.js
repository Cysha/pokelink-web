new Vue({
  el: '#badges',
  data: function () {
    return {
      connected: false,
      loaded: false,
      settings: {},
      badges: []
    };
  },
  created: function () {
    this.loaded = true
    this.settings = window.settings;
  },
  mounted: function () {
    var vm = this;
    let badgesClient = client.setup(settings.port, 'badges-'+settings.currentUser+'-browser', settings.server, (data) => {
      vm.connected = true;
    })
      .on('player:trainer:updated', (payload) => { this.updateBadges(payload)})
      .on('client:players:list', (users) => {
        users.forEach(user => {
          this.updateBadges(user)
        });
      })

  },
  updated: function( ){
    var vm = this;
  },
  methods: {
    updateBadges (payload) {
      //console.log(`Trainer Update recieved for ${payload.username}`)
      //console.log(payload.username, window.settings)
      if (payload.username !== settings.currentUser) return;

      this.badges = payload.trainer.badges
        .map(function(badge) {
          var badgeObj = {};
          badgeObj.img = window.settings.imgPaths.badges+badge.name.toLowerCase()+'.png';
          badgeObj.label = badge.name+' Badge';
          badgeObj.active = badge.value
          return badgeObj;
        });

    }
  }
});
