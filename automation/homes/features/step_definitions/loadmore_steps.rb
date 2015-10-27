When(/^I am on the "([^"]+)" landing page$/) do |section|
    visit '/' + section
end

When(/^I am on the "([^"]+)" landing page(\d+)$/) do |section, page|
    visit '/' + section + '?page=' + page
end

Then(/^I should see (\d+) teasers$/) do |teaser_count|
    page.document.synchronize(40) do
        expect(page).to have_selector("article.teaser > a.teaser__image", count: teaser_count.to_i)
    end
end

Then(/^I should see a 'Load More' button$/) do
    page.document.synchronize(40) do
        page.assert_selector(".button--load-more", :count => 1)
    end
end

Then(/^I should not see a 'Load More' button$/) do
    page.assert_selector(".button--load-more", :count => 0)
end

When(/^I click on the 'Load More' button$/) do
    page.document.synchronize(40) do
        page.find('.button--load-more').click
    end
end
