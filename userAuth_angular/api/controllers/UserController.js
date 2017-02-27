module.exports = {
  signup: function(req, res) {
    var password = require('machinepack-passwords');

    //Encrypt password
    password.encryptPassword({
      password: req.param('password'),
      difficulty: 10
    }).exec({
      error: function(err) {
        console.error('ERROR:', err);
        return res.negotiate(err);
      },

      success: function(encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function() {
            console.error('ERROR:', err);
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {

            // Create User
            User.create( {
              name: req.param('name'),
              email: req.param('email'),
              password: encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if (err) {
                console.error('ERROR:', err);
                return res.negotiate(err);
              }

              // SESSION VARIABLE
              console.log('New User Added', newUser.id);
              return res.json({
                id: newUser.id
              })
            })
          }
        })
      }
    })
  },

  login: function(req, res) {
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) {
        console.error('ERROR:', err);
        return res.negotiate(err);
      } else if (!user) {
        return res.notFound();
      }

      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({
        error: function(err) {
          console.error('ERROR:', err);
          return res.notFound(err);
        },

        incorrect: function() {
          console.log('PASSWORD incorrect');
          return res.notFound();
        },

        success: function() {
          req.session.me = user.id;
          return res.ok();
        }
      })

    })
  }
}
