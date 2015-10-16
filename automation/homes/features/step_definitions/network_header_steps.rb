Then(/^I should see the "([^"]+)" menu item with href "([^"]+)"$/) do |menu_item, href|
    expect(page.find('.global-nav-list')).to have_link(menu_item, :href=>href)
end

When(/^I hover on the "More" menu item$/) do
	dynamic_wait('.global-nav-list__has-children .tl-header__link span')
	page.driver.browser.action.move_to(page.find('.global-nav-list__has-children .tl-header__link span', text: 'More').native).perform
end

Then(/^I should see the "([^"]+)" menu heading$/) do |menu_heading|
    expect(page.find('.global-nav-list__dropdown .global-nav-list__title')).to have_content(menu_heading.upcase)
end

When(/^I click on the network header logo$/) do
    page.find('.tl-header__logo-menu').click
end

Then(/^I should see the expanded menu/) do
	dynamic_wait('.tl-modal__content')
    expect(page).to have_selector('.tl-modal__content')
end

Then(/^I should see the following sites opened in the current window with the specific url:$/) do |table|
    table.hashes.each do |link|
        within('nav.tl-header') do
            expect(find_link("#{link['name']}")[:href]).to eq(link['url'])
            expect(find_link("#{link['name']}")[:target]).to_not eq("_blank")
        end
    end
 end

Then(/^I should see the additionals (sites|links) opened in the current window with the specific url:$/) do |type, table|
    if (type == "links")
    	element = "mobile-menu-column"
    else
    	element = "global-nav-list__dropdown"
    end

	all_actual_content_name = page.all(".#{element} li a").collect(&:text).reject(&:empty?)
	all_actual_content_url = page.all(".#{element} li a").map { |a| a['href'] }

    all_actual_content_target = all(".#{element} li a").map { |a| a['target'] }
    expect(all_actual_content_target.count("_blank")).to eq(0)
end

Then(/^I should see the following logos opened in the current window with the specific url:$/) do |table|
	dynamic_wait('.mobile-menu-column--image')
	all_actual_image = all('.mobile-menu-column--image img').map { |img| img['alt'] }
	all_actual_url = all('.mobile-menu-column--image a').map { |a| a['href'] }

	table.hashes.each_with_index do |hash,index|
	    all_actual_image.should include(hash['name'])
        all_actual_url.should include(hash['url'])
    end

    all_actual_target = all('.mobile-menu-column--image a').map { |a| a['target'] }
    expect(all_actual_target.count("_blank")).to eq(0)
end
