Node chimp framework
==========================

# Requirement:
- git bash if using windows

# Setup:
- cd automation
- npm install

# Run locally:
(MAC)
- cd automation
    - `export URL=` (or populate with local host)
    - `export APP_KEY=homes-site`
    - `export APP_ENV=environment` (automation, dev, prelive, live)
    - `export WN=true` (true will use url for WN sites `.APP_KEY-site.wn`, false will use share repo sites `dolly and cosmo`)
    - `npm run once` (run once)
    or
    - `npm run watch` (watching file changes, run features when any file is saved)
(WIDNOWS)
open git-bash
- cd automation
    - `export URL=` (or populate with local host)
    - `export APP_KEY=homes-site`
    - `export APP_ENV=environment` (automation, dev, prelive, live)
    - `export WN=true` (true will use url for WN sites `.APP_KEY-site.wn`, false will use share repo sites `dolly and cosmo`)
    - `export HTTP_PROXY=` <= this will enable the selenium-standalone package to interact with selenium
    - `npm run once` (run once)
    or
    - `npm run watch` (watching file changes, run features when any file is saved)
  
# Run browserstack: - WIP -
Ensure you update the browser or device the test will run on in the chimp.bs.js file config
- cd automation


# Configuration
- configs are environment variable based
- URL is configured base on `APP_KEY`, `APP_ENV` and `WN`
- you can run on stubb by using `export URL=http://localhost:3001/` environment variable
- runner config can be found in ./automation/config/APP_KEY.js

# Other modes:
- `npm run debug` (run in debug mode)
Below are set in the ./runner.js file 
- `npm run features` (run multiple features concurrently)
- `npm run browsers` (run multiple browsers concurrently)

# Troubleshooting:
### Microsoft JScript compilation error
Use git bash/cygwin

### Selenium complains about missing drivers
npm run setup should have installed necessary drivers, otherwise set chimp.js config => offline = false for chimp to install requirements automatically

### Firefox error: Unable to connect to host 127.0.0.1 on port 7055 after 45000 ms.
Your selenium is not compatible with your firefox installation, see also https://github.com/SeleniumHQ/selenium/issues/1431. Two options:
- use firefox v40
  - set PATH pointing to this firefox
  - OR set desiredCapabilities.firefox_binary, see also https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
- use a newer selenium-standalone server:
  - run ./node_modules/chimp/node_modules/.bin/selenium-standalone install --version=2.53.0
  - modifies ./node_modules/chimp/dist/lib/selenium.js:seleniumStandaloneOptions to use version=2.53.0
