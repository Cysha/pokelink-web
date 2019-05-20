
window.settings = {};
settings = deepmerge(settings, defaultSettings);
settings = deepmerge(settings, themeSettings);
settings = deepmerge(settings, clientSettings);
if (window.settings.debug) {
  console.log(settings);
}

if (typeof pokedex !== 'undefined') {
  pokedex = collect(pokedex);
}

if (typeof movedex !== 'undefined') {
  movedex = collect(movedex);
}

if (typeof itemdex !== 'undefined') {
  itemdex = collect(itemdex);
}

var client = {
  connection: null,
  players: [],
  connected: false,
  username: null,
  currentUser: settings.currentUser,
  events: new EventEmitter(),

  setup (serverPort, username, host, cb) {
    host = host || 'http://127.0.0.1';
    this.username = username;
    let address = host + ':' + serverPort;

    this.connection = io(address);

    this.connection.on('connect', socket => {
      this.log('Client Connected');
      this.connected = true;

      this.connection
        .on('client:party:updated', (data) => this.handleRemotePlayerParty(socket, data, cb))
        .on('client:badges:updated', (data) => this.handleRemotePlayerTrainer(socket, data, cb))
        .on('client:players:list', (players) => this.addPlayersInBulk(socket, players, cb))
        .on('player:trainer:updated', (data) => this.handleRemotePlayerTrainer(socket, data, cb));
    })

    return this;
  },

  on (eventName, callback) {
    this.events.on(eventName, callback);

    return this;
  },

  join () {
  },

  handleRemotePlayerTrainer (socket, payload, cb) {
    if (window.settings.debug) {
      console.log('Player Trainer Updated');
      console.log(payload);
    }
    this.events.emit('player:trainer:updated', payload);
  },

  handleRemotePlayerParty (socket, payload, cb) {
    if (window.settings.debug) {
      console.log('Party Updated');
    }
    let newPlayerParty = {};

    if (this.players.hasOwnProperty(payload.username) === false) {
      this.players[payload.username] = payload.update.party;
    }

    payload.update.party.forEach(mon => {
      newPlayerParty[mon.slotId - 1] = mon;
    });

    newPlayerParty = {...this.players[payload.username], ...newPlayerParty};
    this.players = {...this.players, [payload.username]: newPlayerParty};

    this.log('Client Rcv: Player %s updated their party', payload.username);
    cb(payload.username, Object.values(this.players[payload.username]));
    this.events.emit('client:party:updated', this.players[payload.username]);
  },

  addPlayersInBulk (socket, players, cb) {
    if (window.settings.debug) {
      console.log('Initial Bulk Load');
      console.log(players);
    }
    players.forEach((player) => {
      let tempPlayer = {
        id: player.id,
        username: player.username,
        update: {
          party: player.party
        }
      }

      if (player.username === settings.currentUser) {
        settings.game = {
          name: player.trainer.game.friendlyName,
          generation: player.trainer.game.generation,
        };
        if (window.settings.debug) {
          console.log(['setting game to gen: '+ settings.game.generation +' - '+settings.game.name]);
        }
        this.events.emit('player:trainer:updated', player);
        this.events.emit('client:party:updated', player.party);
      }

      this.handleRemotePlayerParty(socket, tempPlayer, (username, newPlayerList) => {
        cb(username, newPlayerList);
      });
    });
    this.events.emit('client:players:list', players);
  },

  log (title, msg, ...params) {
    params = params || [];
    console.log.apply(this, [title, msg].concat(params));
  }
}
