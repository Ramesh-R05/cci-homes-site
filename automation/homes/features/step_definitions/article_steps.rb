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
    expect(article_title).to eq(title)
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

Then(/^I should see a source logo$/) do
    hero_image = find('.article__source')
    expect(hero_image.visible?).to eq(true)
end

Then(/^I should see a hero video$/) do
    hero_video = find('.article__main-hero-video .video-wrapper')
    expect(hero_video.visible?).to eq(true)
end

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
