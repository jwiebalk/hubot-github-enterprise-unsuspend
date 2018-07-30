// # Description
// #   Unsuspend users in GitHub Enterprise via Hubot
// #
// # Configuration:
// #   export GHE_HOST='<hostname>'
// #   export GHE_PRIVATE_KEY=`cat /path/to/private_key/id_rsa`
// #
// # Commands:
// #   hubot gheunsuspend <user> -- Unsuspends user specified in GitHub Enterprise
// #
// # Notes:
// #   <optional notes required for the script>
// #
// # Author:
// #   John Wiebalk <jwiebalk@github.com>

var SSH = require("simple-ssh");

host = process.env.GHE_HOST
key = process.env.GHE_PRIVATE_KEY
module.exports = function(robot) {
  robot.respond(/gheunsuspend (.*)/i, function(msg) {
    var
      user = msg.match[1],
      command = "ghe-user-unsuspend " + user,
      ssh = new SSH({
        user: "admin",
        host: host,
        port: "122",
        key: key
      // agent: process.env.SSH_AUTH_SOCK,
      // agentForward: true
      });

    ssh.on('error', function(err) {
      msg.reply(err);
      ssh.end();
      });

    msg.reply("Sending request to GitHub Enterprise to unsuspend " + user);
    msg.reply("Please stand by");

    ssh.exec(command, {
            out: function(stdout) {
           },
            exit: function(code) {
              msg.reply("User " + user + " unsuspended in GitHub Enterprise :jazzhands:");
            },
            err: function(stderr) {
              msg.reply("Failed with error " + stderr)
              ssh.end();
          }
      }).start();
  });
};
