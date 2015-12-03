Given(/^I am viewing a "([^"]+)" page$/) do |url|
    visit "/#{url}"
end