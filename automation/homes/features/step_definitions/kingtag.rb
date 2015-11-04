When(/^I am on the "([^"]+)" (?:article|gallery|section|tag) page$/) do |page_name|
    visit '/' + page_name
end

Then(/^I can see "([^"]*)" as part of the ad targeting on the (article|gallery|section|tag) page$/) do |text, page|
    case page
    when 'article'
        position = 6
    when 'gallery'
        position = 2
    else
        position = 5
    end

    sleep(5) #wait to load the googfc console
    gt_tag_text(text,position)
    #puts $tags_capture
    expect(all('.ad').size).to be <= $tags_capture.to_i
end

#Compares the text of the Page request
def gt_tag_text(txt_to_find,iframe_position)
    gtframe = all(:xpath, './/iframe[contains(@id, "xpcpeer")]')[iframe_position.to_i]
    #puts gtframe['id'] #prints this for trouble shooting
    #switch to the frame, click on the Page Request tab and compares text
    within_frame (gtframe['id']) do
        all('.goog-rounded-tab-caption')[1].click
        expect(find('#trace-events-table').text).to include(txt_to_find)
        $tags_capture = all("td", :text=>txt_to_find).size #captures the number of times the tag is sent
    end
end