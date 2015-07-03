When(/^I switch to "([^"]+)" view$/) do |mode|

  resolutions = {}
  resolutions["mobile"] = [320, 568]
  resolutions["desktop"] = [1600, 900]
  resolutions["tablet portrait"] = [768, 1024]
  resolutions["tablet landscape"] = [1024, 768]

  if Capybara.current_driver == Capybara.default_driver
    page.driver.resize(resolutions[mode][0], resolutions[mode][1])
  else
    page.driver.browser.manage.window.resize_to(resolutions[mode][0], resolutions[mode][1])
  end
end
