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

Then(/^I should see the "([^"]+)" logo redirected to the brand listing page in the current window$/) do |source_name|
    source_link = source_name.downcase.gsub!(/\s/,'-')
    link = find('.article__source a')
    expect(link[:href]).to have_content("#{source_link}")
    expect(link[:target]).to_not eq('_blank')
end

Then(/^I should see a hero video$/) do
    hero_video = find('.article__main-hero-video .video-wrapper')
    expect(hero_video.visible?).to eq(true)
    find('.article__main-hero-video .video-wrapper').click
    sleep(3) #have to sleep to capture the screenshot of the video
    screenshot "video_screen"
end

Then(/^I should see (hero|inline) video title$/) do |position|
    if (position.downcase == 'inline')
        video_title = find('.content-body__inline-video .video-title-bar').text
    else
        video_title = find('.article__main-hero-video .video-title-bar').text
    end
    expect(video_title).to_not eq("")
end

Then(/^I should see (\d+) inline videos$/) do |number_of_videos|
    expect(page.all('.content-body__inline-video').count).to eq(number_of_videos.to_i)
end

Then(/^I am able to click the video$/) do
    find('.content-body__inline-video').click
end

Then(/^I can see an ad is played$/) do
    sleep(3) #have to sleep to capture the screenshot of the ad
    find('.content-body__inline-video').find(".vjs-ad-playing")
    screenshot "video_ad_screen"
end

Then(/^the video starts playing$/) do
    sleep(15) #have to sleep to capture the screenshot of the video
    find('.content-body__inline-video').find(".vjs-playing")
    screenshot "video_screen"
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

#Inline Gallery
Then(/^I should see the inline gallery cover image redirected to the gallery page in the current window$/) do
    inline_gallery_link = find('.content-body__gallery-link a', match: :first)
    expect(inline_gallery_link[:href]).to have_content('/hot-desking-create-a-home-office-to-suit-your-style-1517')
    expect(inline_gallery_link[:target]).to_not eq('_blank')
end

Then(/^I should see "([^"]+)", "([^"]+)" and "([^"]+)" on the inline gallery cover image$/) do |category, count, title|
    gallery_category = find('.content-body__gallery-link-category').text
    gallery_count = find('.content-body__gallery-link-count').text
    gallery_title = find('.content-body__gallery-link-title').text

    expect(gallery_category).to eq(category)
    expect(gallery_count).to eq(count)
    expect(gallery_title).to eq(title)
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

Then(/^I should see the related content (image|title) links redirected to the specific article page in the current window$/) do |type|
    expected_content = Array.new(["#{$base_url}8-ingredients-for-the-perfect-kitchen-design-1645",
        "#{$base_url}alex-and-patricks-retro-inspired-bondi-beach-house-1637"])

    if (type == "image")
        element = "teaser__image"
    else
        element = "feed-item__body-title"
    end

    actual_content = all(".related-content a.#{element}").map { |a| a['href'] }
    actual_target = all(".related-content a.#{element}").map { |a| a['target'] }

    expect(actual_content).to eq(expected_content)
    expect(actual_target.count("_blank")).to eq(0)
end
