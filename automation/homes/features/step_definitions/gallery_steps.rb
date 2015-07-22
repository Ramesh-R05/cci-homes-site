require 'i18n'

Given(/^I am viewing the generic gallery page$/) do
  visit '/sandbox/2015/07/kev-test-gallery'
end

When(/^I append a query string to the gallery URL and open the gallery page$/) do
  visit @gallery_collection[0]['url_s'] << '?anything=test'
end

Then(/^I should see the gallery title and summary$/) do
  gallery_title = find('.gallery__title').text
  gallery_summary = find('.gallery__summary-text').text

  expect(gallery_title).to eq("Kev test gallery long title")
  expect(gallery_summary).to have_content("Lorem ipsum")
end

Then(/^I should see the right slide arrows and the image$/) do
  next_btn = find('.gallery__nav--next')
  image = find('.gallery__slide-image')[:src]

  expect(next_btn.visible?).to eq(true)
  expect(image).to have_content("mcmeniman")
end

Then(/^I should see the slide count and the image caption$/) do
  expect(page).to have_selector('.gallery__slide-current', text: '1')
  expect(page).to have_selector('.gallery__slide-last', text: '5')
  expect(page).to have_selector('.gallery-caption__content', text: 'Some stuff about the image...')
end

Then(/^I should see the (\d+)(?:st|nd|rd|th) image and caption$/) do |ordinal|
  image = find('.gallery__slide-image')[:src]
  image_caption = find('.gallery__slide-caption p').text

  expect(image).to eq(@gallery_image_collection[ordinal.to_i - 1]['contentImageUrl_s'])
  expect(image_caption).to eq(@gallery_image_collection[ordinal.to_i - 1]['contentImageCaption_s'])
end

When(/^I click on the next slide arrow$/) do
  next_btn = find('.gallery__nav--next')

  next_btn.click
end

Then(/^I should see the sub-section title above the gallery summary$/) do
  sub_section_title = find('.gallery__subSection')

  expect(sub_section_title.text).to eq("TEST TOPIC")
  expect(sub_section_title.visible?).to eq(true)
end

When(/^I am viewing the last image of the current gallery$/) do
  step "I click on the next slide button"
  step "I click on the next slide button"
end

When(/^I click on the next slide button$/) do
  find('.gallery__nav--next').click
end

Then(/^I should see the Mrec$/) do
  expect(find('.gallery__slide-ad').visible?).to eq(true)
end

Then(/^I should see the section title on the next gallery page$/) do
  section_title = find('.gallery__next-container h5 span').text

  expect(section_title).to eq("NEXT GALLERY")
end

Then(/^I should see the title of the (\d+)(?:st|nd|rd|th) gallery$/) do |ordinal|
  gallery_title = find('.gallery__next-container h2').text

  expect(gallery_title).to eq(@gallery_collection[(ordinal.to_i - 1)]['contentTitle_s'])
end

Then(/^I should see "(.*?)" as the image count of the next gallery$/) do |image_count|
  actual_image_count = find('.gallery__next-number-of-pic').text

  expect(actual_image_count).to eq(image_count)
end
