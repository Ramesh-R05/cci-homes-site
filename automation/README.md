First of All
============
1. Get [Sublime](http://www.sublimetext.com/) as your text editor
2. Get [Git Bash](https://code.google.com/p/msysgit/downloads/list?q=label:Featured)
3. Get GitExtention (optional, if you are a GUI person)
4. Get [Ansicon](https://github.com/adoxa/ansicon/downloads) for color coded test result

Setup Your Local Develop Environment
====================================
For more instructions on installing Ruby and setting up your local environment go to [Confluence Page](https://jira.bauermedia.net.au/confluence/display/ADD/Automation+-+Local+Environment+Setup)

Work with Automation
====================
1. Create a feature branch and name it based on the project and feature you are working on
2. Understand how to use tag properly and effectively [Tag Manual](https://jira.bauermedia.net.au/confluence/display/ADD/How+to+use+tag)
3. Execute your automation scripts on your local mulitple times and make sure they all pass
4. Commit to your branch and inform Michael for code review
5. Merge your branch into master branch once passed code review

Create Your First Test Case
===========================
1. Create a feature file under features directory, such as feature-name.feature
2. Create a ruby steps file under step_definitions directory and make sure you name it this way: feature-name_steps.rb
3. Copy and paste what's in sandbox.feature & sandbox_steps.rb into the files you just created
4. Customize the steps using [Capybara DSL](https://github.com/jnicklas/capybara#the-dsl)

Execute Test Cases On Your Local
================================
Prerequiste:
> Open ".cucumberrc.rb", add the following values:
>>  $environment = "local"
>>  $base_url = "http://localhost:3001/"

1. Open Git Bash, checkout the specific branch.
2. On the specific branch, run "gulp --stubbed"
3. Open ansicon.exe, navigate to the specific automation folder.
4. execute command: cucumber --tags=@tag_name

Generate Steps Structure
========================
1. Have your feature file written
2. Execute that feature file and the steps structure will be generated in the output
3. Copy and paste the steps into the right steps ruby file

Where to Keep All Xpaths
========================
1. Add your xpaths in /config/xxxx.ymal
2. Call your xpath: $xpathHelper["xpath-name"]

Points to note on Test Date
===========================
1. We use json format for our test data
2. Add you test data in /test_data/recipe-name.json
3. The recipe-title should be simple plain text. Donot use -, _, ', ", : etc....

For CrossBrowser Execution
==================================
1. tag your test case with @crossbrowser @javascript @manual so it is only picked for crossbrowser execution
2. from the project folder execute command that will setup the environment and run the crossbrowser task:bundle exec rake crossbrowser["bsusername=bxmaccnt bskey=bxmkey"] nodes=1

