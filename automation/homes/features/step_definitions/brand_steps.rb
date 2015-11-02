Given(/^I am viewing a brand listing page$/) do
    visit '/brand'
end

Then(/^I should see "([^"]+)" logo$/) do |brand_name|
    image_alt = find('.brand__logo img')[:alt]
    expect(image_alt).to have_content(brand_name)
end

Then(/^I should see the Subscribe (image|title) link redirected to the magshop in the current window$/) do |item_type|
    if (item_type == 'image')     
        link = find(".brand-subscribe a.teaser__#{item_type}", match: :first)
    else
        link = find(".brand-subscribe h3.teaser__#{item_type} a", match: :first)
    end
    
    expect(link[:href]).to eq('https://www.magshop.com.au/store/homestolove')
    expect(link[:target]).to_not eq('_blank')
end

Then(/^I should see (\d+) teasers on the page$/) do |teaser_count|
    expect(page).to have_selector("article.theme-australian_house_and_garden", count: teaser_count.to_i)
end

Then(/^I should see the (Facebook|Instagram|Twitter|Pinterest) link opens in (the current|a new) window$/) do |social_name, link_opens_in|
    social_name_lowercase = social_name.downcase 
    link = find(".social-icon--#{social_name_lowercase} a")

    case social_name_lowercase
    when 'facebook'
        expect(link[:href]).to eq('https://www.facebook.com/australianhouseandgarden')
    when 'instagram'
        expect(link[:href]).to eq('https://instagram.com/houseandgarden/?hl=en')
    when 'pinterest'
        expect(link[:href]).to eq('https://www.pinterest.com/HOUSEnGARDEN/')
    else
        expect(page).to have_no_selector(link)        
    end

    if (link_opens_in == 'a new')
        expect(link[:target]).to eq('_blank')
    end
end

Then(/^I should not see the (Facebook|Instagram|Twitter|Pinterest) link$/) do |social_name|
    social_name_lowercase = social_name.downcase 
    expect(page).to have_no_selector(".social-icon--#{social_name_lowercase}")
end
