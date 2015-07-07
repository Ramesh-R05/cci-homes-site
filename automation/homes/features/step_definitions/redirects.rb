When(/^I navigate to a page which redirects$/) do
    visit '/redirectToHomepage'
end

Then(/^I should be on the homepage$/) do
    uri = URI.parse(current_url)
    uri.path.should == '/'
end
