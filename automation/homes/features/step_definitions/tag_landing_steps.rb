Given(/^I am viewing a tag landing page$/) do
    visit '/tags/feature-home'
end

Then(/^I should see "([^"]+)" heading$/) do |heading|
    page_heading = find('.section-heading h1').text
    expect(page_heading).to have_content(heading)
end

Then(/^I should see (\d+) teasers on the (?:homepage|tag landing page)$/) do |teaser_count|
    expect(page).to have_selector("article.teaser > a.teaser__image", count: teaser_count.to_i)
end

Then(/^I should see "([^"]+)" as a primary tag on all teasers$/) do |primary_tag|
    actual_primary_tag = all('.tag-primary a').collect(&:text)
    expect(actual_primary_tag.count(primary_tag)).to eq(actual_primary_tag.length)
end

Then(/^I should be navigated to the "([^"]+)" page in the current window after clicking any primary tag$/) do |tag_link|
    actual_link = all('.tag-primary a').map { |a| a['href'] }
    actual_link.each_with_index do |link, index|
        tag_name = link.split("\/tags\/")
        expect("#{tag_name[1]}").to eq(tag_link)
    end

    actual_target = all('.tag-primary a').map { |a| a['target'] }
    expect(actual_target.count("_blank")).to eq(0)
end
