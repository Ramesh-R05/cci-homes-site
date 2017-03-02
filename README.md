# Homes To Love

[![Run Status](https://api.shippable.com/projects/583638ac2bbf381000dffe19/badge?branch=master)](https://app.shippable.com/projects/583638ac2bbf381000dffe19)
[![Run Status](https://api.shippable.com/projects/583638ac2bbf381000dffe19/coverageBadge?branch=master)](https://app.shippable.com/projects/583638ac2bbf381000dffe19)

## Pushing to git

* Before pushing to git, ensure you have `husky` installed which is defined in `package.json`
* When you push to git, the `prepush` git hook will run the unit tests. If they pass, then your changes will be pushed to the remote origin
* You can skip this if you must by appending `--no-verify` to the push command
