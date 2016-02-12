require 'cucumber/rake/task'
require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'
require 'parallel'
require 'json'

@browsers = JSON.load(open('browsers.json'))
@parallel_limit = ENV["nodes"] || 1
@parallel_limit = @parallel_limit.to_i

def run_rake_task(name)
  begin
    Rake::Task[name].invoke
  rescue Exception => e
    return false
  end
  true
end

def create_tasks(extra_args)
  desc 'Default regression tests'
  Cucumber::Rake::Task.new :local, [:extra_args] do |t|
    t.cucumber_opts = ["--format pretty --format rerun --out rerun.txt #{extra_args} --tags=@local --strict"]
  end

  Cucumber::Rake::Task.new :regression, [:extra_args] do |t|
    t.cucumber_opts = ["--format pretty --format rerun --out rerun.txt #{extra_args} --tags=~@manual --strict"]
  end

  desc 'Rerun failed tests'
  Cucumber::Rake::Task.new :rerun do |t|
    t.cucumber_opts = ["@rerun.txt --format pretty #{extra_args} --strict"]
  end

  desc 'Run test on browser stak grid'
  Cucumber::Rake::Task.new :run_features do |t|
      t.cucumber_opts = "env=automation crossbrowser=true #{extra_args} -t @crossbrowser -t ~@solr -f pretty"
  end
end

desc 'Run regression and rerun failed tests'
task :default, [:extra_args] do | t, args |

  create_tasks(args[:extra_args])

  first_successful = run_rake_task("regression")
  rerun_successful = true
  unless first_successful
    rerun_successful = run_rake_task("rerun")
  end
  unless first_successful || rerun_successful
    raise 'Cucumber tests failed'
  end
end

desc 'Run local acceptance tests'
task :local, [:extra_args] do | t, args |
  ENV['env'] = "stubbed"
  create_tasks(args[:extra_args])
  default_successful = run_rake_task("local")
  Rake::Task['rerun'].invoke unless default_successful
end

desc 'Run cucumber crossbrowser'
task :cucumber do
    Parallel.each(@browsers, :in_processes => @parallel_limit) do |browser|
        begin
            puts "Running with: #{browser.inspect}"
            ENV['SELENIUM_BROWSER'] = browser['browser']
            ENV['SELENIUM_VERSION'] = browser['browser_version']
            ENV['BS_AUTOMATE_OS'] = browser['os']
            ENV['BS_AUTOMATE_OS_VERSION'] = browser['os_version']
            ENV['SELENIUM_PLATFORM'] = browser['platform']
            ENV['SELENIUM_DEVICE'] = browser['browserName']
            ENV['SELENIUM_DEVICE_ID'] = browser['device']

            Rake::Task[:run_features].execute()
        rescue Exception => e
            puts "Error while running task"
        end
    end
end

desc 'Crossbrowser regression tests'
task :cross => [:cucumber]


desc 'Crossbrowser regression and env setup'
task :crossbrowser, [:extra_args] do |t, args|
    create_tasks(args[:extra_args])
    run_rake_task("cross")
end
