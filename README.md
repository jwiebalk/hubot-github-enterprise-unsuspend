# hubot-github-enterprise-unsuspend

Unsuspend users in GitHub Enterprise via Hubot

See [`src/github-enterprise-unsuspend.coffee`](src/github-enterprise-unsuspend.coffee) for full documentation.

## Installation

In hubot project repo, run:

`npm install hubot-github-enterprise-unsuspend --save`

Then add **hubot-github-enterprise-unsuspend** to your `external-scripts.json`:

```json
[
  "hubot-github-enterprise-unsuspend"
]
```

## Configuration

Two variables will need to be configured to set the hostname and the site admin token for Hubot to use:

```
export GHE_URL='https://<hostname>'
export GHE_TOKEN='<Site admin token>'
```

## Sample Interaction

```
user1>> gheunsuspend <user>
hubot>> User <user> unsuspended in GitHub Enterprise :jazzhands:
```

## NPM Module

https://www.npmjs.com/package/hubot-github-enterprise-unsuspend
