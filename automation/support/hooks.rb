Before('~@mobile', '~@tablet-landscape', '~@tablet-portrait', '~@crossbrowser') do
  if Capybara.current_driver == Capybara.default_driver
    if page.nil? or page.driver.nil?
      puts "the page and driver are not defined"
    else
      page.driver.resize(1600, 900)
    end
  else
    page.driver.browser.manage.window.maximize
  end
end

Before('@mobile') do
  if Capybara.current_driver == Capybara.default_driver
    page.driver.resize(320, 568)
  else
    page.driver.browser.manage.window.resize_to(320,568)
  end
end

Before('@desktop') do
  if Capybara.current_driver == Capybara.default_driver
    page.driver.resize(1200, 800)
  else
    page.driver.browser.manage.window.resize_to(1200, 800)
  end
end

Before('@tablet-landscape') do
  if Capybara.current_driver == Capybara.default_driver
    page.driver.resize(1024, 768)
  else
    page.driver.browser.manage.window.resize_to(1024, 768)
  end
end

Before('@tablet-portrait') do
  if Capybara.current_driver == Capybara.default_driver
    page.driver.resize(768, 1024)
  else
    page.driver.browser.manage.window.resize_to(768, 1024)
  end
end

Before('@login-radius') do
    visit base_url_without_port + ":#{$login_radius_stub_port}/ssologin/logout"
end

After('@login-radius') do
    find('.tl-header__link--logout').click
    visit base_url_without_port + ":#{$login_radius_stub_port}/ssologin/logout"
end

Before('@my-recipes') do
  visit base_url_without_port + ":#{$my_recipes_stub_port}/stub/profiles/nodes/clear"
end

Before('@my-recipes-listing') do
  visit base_url_without_port + ":#{$my_recipes_stub_port}/stub/profiles/nodes/clear"
end

After do |scenario|
  if scenario.failed?
    begin
      print URI.parse(current_url)
    rescue
      print 'unable to access current url'
    end
    screenshot scenario.name
  end
end

def initialise_solr
  puts "Initialising SOLR connection" if $verbose_logging

  url = $solr_base_url
  Solr.initialise(url)

  abort("You should *never* run acceptance tests on #{$environment}! It will cause issues, and may get you fired...") if (['dev', 'uat', 'prod'].index($environment))

  if Solr.collection_exists?($solr_collection_name) && Solr.collection_exists?($solr_collection_search_name)
    clear_collections
  else
    Solr.create_collection($solr_collection_name)
    Solr.create_collection($solr_collection_search_name)
  end
end

def clear_collections(solr_base_url=$solr_base_url)
  clear_collection($solr_collection_name, solr_base_url)
  clear_collection($solr_collection_search_name, solr_base_url)
end

def clear_collection(collection, solr_base_url=$solr_base_url)
  call_url "#{solr_base_url}#{collection}/update?stream.body=#{URI::encode('<delete><query>*:*</query></delete>')}"
end

def clear_site_cache
  # clear cache on all servers (load-balancer is round-robin, so sequential calls should clear each server)
  (1..$server_count).each do |idx|
    call_url "#{$base_url}api/cache/clear"
    puts "cleared site cache of server #{idx}" if $verbose_logging
  end
end

def call_url url
  puts "call URL: #{url}" if $verbose_logging
  ($proxy_bypass == 'false') ? open(url, :proxy => nil) : open(url)
end

def base_url_without_port
  url_without_port = $base_url.sub( %r{:\d+/?}, '' )
  url_without_port = (url_without_port.end_with? "/") ? url_without_port[0..-2] : url_without_port
  url_without_port
end



def screenshot screen_name
    file_name = screen_name.gsub(/ /, '-').gsub(/,/, '').downcase + Time.now.strftime("%Y%m%d-%H%M%S").to_s + '.png'
    page.save_screenshot('artifacts/' + file_name, :full => true)
    embed("#{file_name}", "image/png", "SCREENSHOT")
end
