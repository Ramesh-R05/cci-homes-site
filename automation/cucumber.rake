require 'cucumber/rake/task'

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