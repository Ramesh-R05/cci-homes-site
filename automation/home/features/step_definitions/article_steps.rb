When(/^I am viewing the article page$/) do
  visit '/section/article-01-creative-home'
end

Then(/^I should see "(.*?)" as the title$/) do |title|
  article_title = find("h1.article__title").text
  expect(article_title).to eq(title)
end

Then(/^I should see a hero image$/) do
  	expect(page).to have_selector('.article__main-hero img')
end

Then(/^I should see "(.*?)" within the summary$/) do |summary|
  article_summary = find('.article__summary').text
  expect(article_summary).to have_content(summary)
end