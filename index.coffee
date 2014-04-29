# vendor
if process.env.NODE_ENV is 'prod'
  require 'newrelic'

# custom
server = require './server/server'
cache = require './server/cache'

# ==========

# run all queries & populate cache
cache.db.on "connect", cache.init

# start server
server.start()