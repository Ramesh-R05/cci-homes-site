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

When(/^I click on the teaser (image|text) for first (?:Homes|network) recommendation$/) do |teaser_element|
    page.find('.recommendations')
    if (teaser_element == "image")
        find('article.dacrm-teaser > a.dacrm-teaser__image', match: :first).click
    else
        find('article.dacrm-teaser > a.gtm-recommendation-link', match: :first).click
    end
end

Then(/^I should not see ad in the recommendation section$/) do
    actual_count = all_ad_recommendations.count
    expect(actual_count).to eq(0)
end

Then(/^I should be redirected to a (?:Homes|network) article or gallery page from the (homepage|section landing page|article page)$/) do |condition|
    print URI.parse(current_url).path
    case condition
    when 'section landing page'
        testdata_path = "/section"
    when 'article page'
        testdata_path = "/section/article-hero-video"
    else
        testdata_path = "/"
    end

    old_path = URI.parse(current_url).path 
    while (old_path == testdata_path) do
        sleep 1
        old_path = URI.parse(current_url).path 
    end 
    new_path = URI.parse(current_url).path 
    expect(new_path).to_not eq(testdata_path) 

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

