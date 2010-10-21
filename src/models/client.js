var db_backend = require('tapas/db');

db_backend.backend.model('Client',
                 {properties: ['slug',
                               'full_name',
                               'short_name',
                               'updated_at'],
                  indexes: ['full_name',
                            [{'slug':1},
                             {unique: true}]
                           ],

                  setters: {
                      slug: function(value){
                          return value.toLowerCase().replace(' ', '-');
                      }
                  },

                  methods: {
                      save: function(fn){
                          this.updated_at = new Date();
                          this.__super__(fn);
                      }
                  }
                 });

module.exports = db_backend.db.model('Client');
