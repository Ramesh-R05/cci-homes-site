$homes_facebook_url = "http://www.facebook.com/homestoloveau"
$homes_twitter_url = "http://twitter.com/homestoloveau"
$homes_instagram_url = "http://instagram.com/homestoloveau/"

Then(/^I should see the global footer$/) do
	  page.execute_script('window.scrollTo(0,100000)')
    expect(page).to have_selector('.footer')
end

Then(/^I should see the Privacy Policy, Advertise and Terms of Use links open in a new window$/) do
	  within('.footer__navigation') do
  	    expect(page).to have_link('Privacy Policy', :href=>'http://www.bauer-media.com.au/privacy')
  	    expect(page).to have_link('Advertise', :href=>'http://www.bauer-media.com.au/advertising/advertise-with-us')
  	    expect(page).to have_link('Terms of Use', :href=>'http://www.bauer-media.com.au/terms/website-terms')

  	    expect(find_link('Privacy Policy')[:target]).to eq('_blank')
  	    expect(find_link('Advertise')[:target]).to eq('_blank')
  	    expect(find_link('Terms of Use')[:target]).to eq('_blank')
  	end
end

Then(/^I should see the Facebook, Twitter and Instagram links(?: open in a new window)?$/) do
    expected_content = Array.new(["#{$homes_facebook_url}",
    	"#{$homes_twitter_url}",
    	"#{$homes_instagram_url}"])

    actual_content = all('.social-link a').map { |a| a['href'] }
    expect(actual_content).to eq(expected_content)

    actual_target = all('.social-link a').map { |a| a['target'] }
    expect(actual_target.count("_blank")).to eq(actual_target.size)
end

Then(/^I should see the newsletter sign up$/) do
    expect(find('.newsletter').visible?).to eq(true)
end

Then(/^I should see subscribe image and button(?: links to "([^"]+)" in a new window)?$/) do |url|
    actual_content = all('.magshop a').map { |a| a['href'] }
    expect(actual_content.count("#{url}")).to eq(2)

    actual_target = all('.magshop a').map { |a| a['target'] }
    expect(actual_target.count("_blank")).to eq(2)
end

Then(/^I should see the subscribe button(?: links to "([^"]+)" in a new window)?$/) do |url|
    actual_content = all('.magshop a.button').map { |a| a['href'] }
    expect(actual_content.count("#{url}")).to eq(1)

    actual_target = all('.magshop a.button').map { |a| a['target'] }
    expect(actual_target.count("_blank")).to eq(1)
end

#-------------- the  below are for the header
Then(/^I should see Belle, Real Living, Homes\+ and House & Garden links redirected to the brand page in the current window$/) do
    expected_content = Array.new(["#{$base_url}belle/",
                                  "#{$base_url}real-living/",
                                  "#{$base_url}homes-plus/",
                                  "#{$base_url}australian-house-and-garden/"])

    actual_content = all('.header-sponsors.header-sponsors--text-only a').map { |a| a['href'] }
    expect(actual_content).to eq(expected_content)

    actual_target = all('.network-info__supported-content a').map { |a| a['target'] }
    expect(actual_target.count("_blank")).to eq(0)
end

#for homepage
Then(/^I should see Belle, Real Living, Homes\+ and House & Garden links redirected$/) do
    expected_content = Array.new(["#{$base_url}belle/",
                                  "#{$base_url}real-living/",
                                  "#{$base_url}homes-plus/",
                                  "#{$base_url}australian-house-and-garden/"])

    actual_content = all('.header-sponsors a').map { |a| a['href'] }
    expect(actual_content).to eq(expected_content)
end

#for hamburger
Then(/^I should see Belle, Real Living, Homes\+ and House & Garden links in the hamburger/) do
    sleep(3)
    expected_content = Array.new(["#{$base_url}belle/",
                                  "#{$base_url}real-living/",
                                  "#{$base_url}homes-plus/",
                                  "#{$base_url}australian-house-and-garden/"])

    actual_content = all('.header-sponsors--text-vertical-only a').map { |a| a['href'] }
    expect(actual_content).to eq(expected_content)
end
