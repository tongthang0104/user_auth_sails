module.exports - {
  attributes: {
    name: {
      type: 'string',
      require: true
    },

    email: {
      type: 'string',
      email: true,
      require: true,
      unique: true
    },

    encPassword: {
      type: 'string',
      require: true
    },

    lastLoggedIn: {
      type: 'date',
      require: true,
      defaultsTo: new Date(0)
    },

    gravatarUrl: {
      type: 'string'
    }
  }
};
