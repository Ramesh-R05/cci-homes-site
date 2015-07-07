Then(/^I should see the "([^"]+)" menu item with href "([^"]+)"$/) do |menu_item, href|
  expect(page.find('.global-nav-list')).to have_link(menu_item, :href=>href)
end

When(/^I hover on the "More" menu item$/) do
  page.find('.global-nav-list .tl-header__link span', text: 'More').hover
end

Then(/^I should see the "(.*?)" drop down menu item with href "(.*?)"$/) do |menu_item, href|
  expect(page.find('.global-nav-list__dropdown')).to have_link(menu_item, :href=>href)
end

Then(/^I should see the "(.*?)" menu heading$/) do |menu_heading|
  expect(page.find('.global-nav-list__dropdown').find('.global-nav-list__title')).to have_content(menu_heading.upcase)
end

When(/^I click on the network header logo$/) do
  page.find('.tl-header__logo-menu').click
end

Then(/^I should see the expanded menu/) do
  expect(page).to have_selector('.tl-modal--menu')
end

Then(/^I should see the "(.*?)" logo menu item with href "(.*?)"$/) do |title, href|
  expect(page.find(:link, {:href => href})['title']).to eql(title)
end

Then(/^I should see the "(.*?)" text menu item with href "(.*?)"$/) do |menu_item, href|
  expect(page.find('.tl-modal--menu')).to have_link(menu_item, :href=>href)
end
