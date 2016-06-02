Given(/^I am viewing a "([^"]+)" page$/) do |url|
    visit "/#{url}"
end

When(/^I click on the hamburger menu$/) do
    find('.header-menu__button-menu').click
end
