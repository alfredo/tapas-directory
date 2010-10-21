var db_backend = require('tapas/db');

db_backend.model('News',
                 {properties: ['title',
                               'subtitle',
                               'imageUri',
                               'article',
                               'excerpt',
                               'appid',
                               'updated_at'],
                  indexes: ['title'],
                  methods: {
                      save: function(fn){
                          this.updated_at = new Date();
                          this.__super__(fn);
                      }
                  }
                 });

module.exports = db_backend.db.model('News');
