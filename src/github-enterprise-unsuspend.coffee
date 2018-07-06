# Description
#   Unsuspend users in GitHub Enterprise via Hubot
#
# Configuration:
#   export GHE_URL='https://<hostname>'
#   export GHE_TOKEN='<Site admin token>'
#
# Commands:
#   hubot gheunsuspend <user> -- Unsuspends user specified in GitHub Enterprise
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   John Wiebalk <jwiebalk@github.com>

host = process.env.GHE_URL
token = process.env.GHE_TOKEN

module.exports = (robot) ->
  robot.respond /gheunsuspend (.*)/i, slackEnabled: true, (msg) ->
    user = msg.match[1]
    msg.http("#{host}/api/v3/users/#{user}/suspended?access_token=#{token}")
      .delete() (err, res, body) ->
        if err?
          robot.emit 'error', err, msg
          return

        if res.statusCode is 204
            msg.send "User #{user} unsuspended in GitHub Enterprise :jazzhands:"
        else
          msg.send "#{host}/api/v3/users/#{user}/suspended?access_token=#{token}"
          error = new Error("Unsuspend failed with #{res.statusCode} status code")
          robot.emit 'error', error, msg
