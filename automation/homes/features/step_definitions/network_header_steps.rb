Then(/^I should see the "([^"]+)" menu item with href "([^"]+)"$/) do |menu_item, href|
  expect(page.find('.global-nav-list')).to have_link(menu_item, :href=>href)
end

When(/^I hover on the "More" menu item$/) do
  page.find('.global-nav-list .tl-header__link span', text: 'More').hover
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

Then(/^I should see the following sites opened in the current window with the specific url:$/) do |table|
    table.hashes.each do |link|
        within('nav.tl-header') do
            expect(find_link("#{link['name']}")[:href]).to eq(link['url'])
            expect(find_link("#{link['name']}")[:target]).to_not eq("_blank")
        end
    end
 end

Then(/^I should see the additionals sites opened in the current window with the specific url:$/) do |table|
	all_actual_content_name = all('.global-nav-list__dropdown li a').collect(&:text)
	all_actual_content_url = all('.global-nav-list__dropdown li a').map { |a| a['href'] }

	table.hashes.each_with_index do |hash,index|
		all_actual_content_name.should include(hash['name'])
        all_actual_content_url.should include(hash['url'])
    end

    all_actual_content_target = all('.global-nav-list__dropdown li a').map { |a| a['target'] }
    expect(all_actual_content_target.count("_blank")).to eq(0)
end


