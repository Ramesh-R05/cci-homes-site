# Homes To Love

## Pushing to git

* Before pushing to git, ensure you have `pre-git` installed which is defined in `package.json`
* When you push to git, the `pre-push` git hook will run the unit tests. If they pass, then your changes will be pushed to the remote origin
* You can skip this if you must by appending `--no-verify` to the push command
 
 
