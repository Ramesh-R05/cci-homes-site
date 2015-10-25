Given(/^I am viewing a tag landing page$/) do
    visit '/tags/feature-home'
end

Then(/^I should see "([^"]+)" heading$/) do |heading|
    page_heading = find('.section-heading h1').text
    expect(page_heading).to have_content(heading)
end

Then(/^I should see (\d+) teasers on the tag landing page$/) do |teaser_count|
    expect(page).to have_selector("article.teaser > a.teaser__image", count: teaser_count.to_i)
end

Then(/^I should see "([^"]+)" as a primary tag on all teasers$/) do |primary_tag|
    actual_primary_tag = all('.tag-primary a').collect(&:text)
    expect(actual_primary_tag.count(primary_tag)).to eq(actual_primary_tag.length)
end

Then(/^I should be navigated to the "([^"]+)" page in the current window after clicking any primary tag$/) do |tag_link|
    actual_link = all('.tag-primary a').map { |a| a['href'] }
    expect(actual_link.count("#{$base_url}#{tag_link}")).to eq(actual_link.length)

    actual_target = all('.tag-primary a').map { |a| a['target'] }
    expect(actual_target.count("_blank")).to eq(0)
end

Then(/^I can see "([^"]*)" as part of the ad targeting$/) do |arg1|
    sleep(5) #wait to load the googfc console
    gt_tag_text arg1
    puts $tags_capture
    expect(page).to have_selector(".ad", count: $tags_capture.to_i)
end

#HOMES
#Compares the text of the Page request
def gt_tag_text txt_to_find
    #finds the 6th frame with ID xpcpeer
    gtframe = all(:xpath, './/iframe[contains(@id, "xpcpeer")]')[5]
    puts gtframe['id'] #prints this for trouble shooting
    #switch to the frame, click on the Page Request tab and compares text
    within_frame (gtframe['id']) do
        all('.goog-rounded-tab-caption')[1].click
        expect(find('#trace-events-table').text).to include(txt_to_find)
        $tags_capture = all("td", :text=>txt_to_find).size #captures the number of times the tag is sent
    end
end
