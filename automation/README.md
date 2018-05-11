Node chimp framework
==========================

# Requirement:
- git bash if using windows or add git bash path to `PATH` environment variable

# Setup:
- cd automation
- npm install

# Run locally:
(NO PROXY)
- cd automation
    - `export URL=` (or populate with local host)
    - `export APP_KEY=homes-site`
    - `export APP_ENV=environment` (test, sit, prod)
    - `npm run once` (runs all test cases once)
    or
    - `npm run watch` (runs any scenarios with @watch)

(BEHIND PROXY)
open git-bash
- cd automation
    - `export URL=` (or populate with local host)
    - `export APP_KEY=homes-site`
    - `export APP_ENV=environment` (test, sit, prod)
    - `export HTTP_PROXY=` <= this will enable the selenium-standalone package to interact with selenium
    - `export HTTPS_PROXY=http://username:password@sydproxy.acp.net:8080` <= this will enable to download chrome selenium header
    - `npm run once` (runs all test cases once)
    or
    - `npm run watch` (runs any scenarios with @watch)
  
# Run browserstack: - WIP -
Ensure you update the browser or device the test will run on in the chimp.bs.js file config
- cd automation


# Configuration
- configs are environment variable based
- URL is configured base on `APP_KEY`, `APP_ENV`
- you can run on stubb by using `export URL=http://localhost:3001/` environment variable

# Other modes:
- `npm run debug` (run in debug mode)
- `npm run test:high` (run all test marked as @high)
- `npm run test:med` (run all test marked as @med)
- `npm run test:low` (run all test marked as @low)
- `npm run test:rerun` (run all test from file @rerun generated from fail test in `test:high`)
- `npm run html_report` (generates html report from file `./reports/regression.json`)
- `npm run homes:automation` (run `test:high` with all the automation environment variables set)
- `npm run homes:stubbed` (run `test:once` with all the stubbed environment variables set, using http://localhost:3001)
- `npm run homes:smoketest` (run `smoketest` in prelive environment)
- `npm run general:live` (run and environment live)

Below are work in progress 
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
