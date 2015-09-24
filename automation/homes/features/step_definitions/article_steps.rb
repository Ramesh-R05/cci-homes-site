Given(/^I am viewing an article(?: with a hero (image|video))?$/) do |condition|
    case condition
    when 'image'
        visit '/section/article-hero-image'
    when 'video'
        visit '/section/article-hero-video'
    else
        visit '/section/article-hero-image'
    end
end

Then(/^I should see "([^"]+)" as the title$/) do |title|
    article_title = find("h1.article__title").text
    expect(article_title).to have_content(title)
end

Then(/^I should see a hero image$/) do
    hero_image = find('.article__main-hero img')
    expect(hero_image.visible?).to eq(true)
end

Then(/^I should see "([^"]+)" within the summary$/) do |summary|
    article_summary = find('.article__summary').text
    expect(article_summary).to have_content(summary)
end

Then(/^I should see "([^"]+)" within the first paragragh$/) do |body|
    article_body = first(".content-body__paragraph").text
    expect(article_body).to have_content(body)
end

Then(/^I should see the source logo redirected to the brand listing page in the current window$/) do 
    link = find('.article__source a')
    expect(link[:href]).to have_content('/australian-house-and-garden')
    expect(link[:target]).to_not eq('_blank')
end

Then(/^I should see a hero video$/) do
    hero_video = find('.article__main-hero-video .video-wrapper')
    expect(hero_video.visible?).to eq(true)
end

#Ads
Then(/^I should see (\d+) "([^"]+)" ad slots?$/) do |slot_count, ad_slot|
    expect(page).to have_selector(".#{ad_slot} > div > div", count: slot_count.to_i)
end

Then(/^I should see the (\d+)(?:[rn]d|st|th) ad in the (\d+)(?:[rn]d|st|th) position in the left-hand rail$/) do |ad_number, item_position|
    ad_number = Integer(ad_number)
    item_position = Integer(item_position)
    found_ad = false
    ad_count = 0;
    all(".feed__items li").each_with_index do |item, i|
        ad_count += 1 if item[:class].include?('feed-ad')
        if ad_count == ad_number
            found_ad = true
            expect(item_position).to eq(i + 1),
                "Expected ad number #{ad_number} to be at position #{item_position}, but it was at position #{i + 1}"
            break
        end
    end
    expect(found_ad).to be_true, "did not find ad #{ad_number}"
end

#Gallery Link
Then(/^I should see the cover image and the title of the related gallery$/) do
    page.execute_script('window.scrollTo(0,100000)')

    cover_img = find('.content-body__gallery-link img')
    gallery_title = find('.content-body__gallery-link-title').text

    expect(cover_img.visible?).to eq(true)
    expect(gallery_title).to eq("HOT DESKING: CREATE A HOME OFFICE TO SUIT YOUR STYLE")
end

When(/^I click on the image of the gallery link$/) do
    find('.content-body__gallery-link-info .content-body__gallery-link-title').click
end

Then(/^I should be redirected to the detail page of the linked gallery$/) do
    page.should_not have_title("Article Long Title")
end

#Related Content
Then(/^I should see (\d+) related articles$/) do |related_article_count|
    expect(page).to have_selector('.related-content-items > .feed-item', count: related_article_count.to_i)
end

Then(/^I should see the image, title and topic tag of the related article$/) do
    image = find('.related-content-items > .feed-item', match: :first).find('.teaser__image')
    title = find('.related-content-items > .feed-item', match: :first).find('.feed-item__body > .feed-item__body-title')
    topic_tag = find('.related-content-items > .feed-item', match: :first).find('.feed-item__body > .feed-item__body-source')

    expect(image.visible?).to eq(true)
    expect(title.visible?).to eq(true)
    expect(topic_tag.visible?).to eq(true)
end

Then(/^I should not see the image for the related article in mobile$/) do
    expect(page).to have_no_selector('.related-content-items > .feed-item > .teaser__image')
end

When(/^I click on the image of the related content$/) do
    find('.related-content-items > .feed-item', match: :first).find('.teaser__image').click
end

When(/^I click on the title of the related content$/) do
    find('.related-content-items > .feed-item', match: :first).find('.feed-item__body > .feed-item__body-title').click
end

Then(/^I should be redirected to the detail page of the related article$/) do
    new_path = redirect_page("/section/article-hero-image")
    expect(new_path).to eq("/8-ingredients-for-the-perfect-kitchen-design-1645") 
end
