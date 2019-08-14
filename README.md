# Homes To Love

[![Run Status](https://api.shippable.com/projects/583638ac2bbf381000dffe19/badge?branch=master)](https://app.shippable.com/projects/583638ac2bbf381000dffe19)
[![Run Status](https://api.shippable.com/projects/583638ac2bbf381000dffe19/coverageBadge?branch=master)](https://app.shippable.com/projects/583638ac2bbf381000dffe19)

## Pushing to git

* Before pushing to git, ensure you have `husky` installed which is defined in `package.json`
* When you push to git, the `prepush` git hook will run the unit tests. If they pass, then your changes will be pushed to the remote origin
* You can skip this if you must by appending `--no-verify` to the push command

### Using content services locally outside of the network
In order to access the content services at `*.bxm.internal` urls we send requests to proxy serve which pipes calls through to the internal services.

This service requires the correct authorization header to be passed. This needs to be set as `APP_SERVICES_ACCESS_KEY` which is injected into the environment via shippable.

in order to replicate this locally, copy and rename the `.sample.sit.env` and `sample.prod.env` and rename them to `.sit.env` and `.prod.env` then fill in the correct key using the keys stored in `keybase`. You'll find them at this path: `/keybase/team/bauerxcelmedia/keys/services-access-keys.txt`. 

Once you have created these files, run your site with `APP_ENV=sit` or `APP_ENV=production` and the `dotenv` package will load the correct envinronment. The keys are also required for one integration test.
