Given(/^I am viewing a gallery$/) do
    visit '/section/gallery'
end

When(/^I append a query string to the gallery URL and open the gallery page$/) do
    visit @gallery_collection[0]['url_s'] << '?anything=test'
end

Then(/^I should see the gallery title and summary$/) do
    gallery_title = find('.gallery__title').text
    gallery_summary = find('.gallery__summary-text').text

    expect(gallery_title).to eq("Gallery Long Title")
    expect(gallery_summary).to have_content("Gallery Body Text")
end

Then(/^I should see the right slide arrows and the image$/) do
    next_btn = find('.gallery__nav--next')
    image = find('.gallery__slide-image')[:src]

    expect(next_btn.visible?).to eq(true)
    expect(image).to have_content("Chinamans3")
end

Then(/^I should see the slide count and the image caption$/) do
    expect(page).to have_selector('.gallery__slide-current', text: '1')
    expect(page).to have_selector('.gallery__slide-last', text: '8')

    image_caption = find('.gallery-caption__content')
    expect(image_caption).to have_content("Gallery Image Caption")
end

When(/^I click on the next slide arrow$/) do
    find('.gallery__nav--next').click
end

Then(/^I should see "([^"]+)" as the sub-section title above the gallery summary$/) do |title|
    sub_section_title = find('.gallery__subsection')
    expect(sub_section_title.text).to eq(title.upcase)
    expect(sub_section_title.visible?).to eq(true)
end

When(/^I am viewing the last image of the current gallery$/) do
    for i in 0..8
        step "I click on the next slide arrow"
    end  
end

Then(/^I should see "([^"]+)" as the section title on the next gallery page$/) do |title|
    section_title = find('.gallery__next-container h5 span').text
    expect(section_title).to eq(title.upcase)
end

Then(/^I should see "([^"]+)" as the title of the next gallery$/) do |gallery_title|
    gallery_title = find('.gallery__next-container h2').text
    expect(gallery_title).to eq(gallery_title)
end

Then(/^I should see "(.*?)" as the image count of the next gallery$/) do |image_count|
    actual_image_count = find('.gallery__next-number-of-pic').text
    expect(actual_image_count).to eq(image_count.upcase)
end

Then(/^I should see (\d+)(?:st|nd|rd|th) MREC after the (?:first|next) (\d+) images$/) do |ad_number, img_position|
    int_ad_number = ad_number.to_i
    int_img_position = img_position.to_i

    if int_ad_number != 1
        int_img_position = 5
    end
    
    (1..int_img_position).each do
        step "I click on the next slide arrow" 
    end 

    expect(find('.gallery__slide-ad').visible?).to eq(true)
end

Then (/^I should see the swipe to skip add button$/) do
    find("div.gallery__slide-swipe-indicator")
end
