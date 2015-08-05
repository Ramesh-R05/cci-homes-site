Then(/^the page should have a title "([^"]+)"$/) do |title|
    expect(page).to have_title(title)
end

Then(/^the page should have a meta description "([^"]+)"$/) do |description_text|
    page.should have_css("meta[name='description'][value='#{description_text}']", visible: false)
end

Then(/^the page should have a canonical URL "([^"]+)"$/) do |canonical_url|
    expect(page).to have_link_canonical(Capybara.app_host + canonical_url)
end
