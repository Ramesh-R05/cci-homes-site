Then(/^I should see (\d+) (Homes|network) recommendations$/) do |expected_count, source_name|
    page.execute_script "window.scrollBy(0,5000)"
    page.find('.recommendations')
    if source_name == "Homes"
      actual_count = all_homes_recommendations.count
    else
      actual_count = all_network_recommendations.count
    end
    expect(actual_count).to eq(expected_count.to_i)
end

Then(/^I should see (\d+) MRECs in the recommendation section$/) do |expected_count|
    actual_count = all_ad_recommendations.count
    expect(actual_count).to eq(expected_count.to_i)
end

Then(/^I should see (image|title|source) link redirected to a recommendation page in the current window$/) do |teaser_type|    
    page.find('.recommendations')

    case teaser_type
    when 'title'
        link = find("article.dacrm-teaser > div.dacrm-teaser__content > h3.dacrm-teaser__title a", match: :first)
    when 'source'
        link = find("article.dacrm-teaser > div.dacrm-teaser__content > div.dacrm-teaser__source a", match: :first)
    else
        link = find("article.dacrm-teaser > a.dacrm-teaser__image", match: :first)
    end

    expect(link[:href]).to_not eq(URI.parse(current_url))
    expect(link[:target]).to_not eq('_blank')
end

Then(/^I should not see ad in the recommendation section$/) do
    actual_count = all_ad_recommendations.count
    expect(actual_count).to eq(0)
end

def all_homes_recommendations
    homes_recommendations = all('.dacrm-network-specific > a.dacrm-teaser__image')
    raise "could not find any Homes recommendations" if homes_recommendations.count == 0
    homes_recommendations 
end

def all_network_recommendations
    network_recommendations = all('.dacrm-network-all > a.dacrm-teaser__image')
    raise "could not find any network recommendations" if network_recommendations.count == 0
    network_recommendations 
end

def all_ad_recommendations
    ad_recommendations = all('.recommendations .dacrm-ad--recommendations')
    #raise "could not find any ad in the recommendations" if ad_recommendations.count == 0
    ad_recommendations 
end

