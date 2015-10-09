Then(/^I should see the global footer$/) do
	page.execute_script('window.scrollTo(0,100000)')
    expect(page).to have_selector('.footer')
end

Then(/^I should see the Privacy Policy, Advertise and Terms of Use links open in a new window$/) do
	within('.footer__navigation') do
  	    expect(page).to have_link('Privacy Policy', :href => 'http://www.bauer-media.com.au/privacy')
  	    expect(page).to have_link('Advertise', :href=>'http://www.bauer-media.com.au/advertising/advertise-with-us')
  	    expect(page).to have_link('Terms of Use', :href=>'http://www.bauer-media.com.au/terms/website-terms')

  	    expect(find_link('Privacy Policy')[:target]).to eq('_blank')
  	    expect(find_link('Advertise')[:target]).to eq('_blank')
  	    expect(find_link('Terms of Use')[:target]).to eq('_blank')
  	end
end

Then(/^I (should|should not) see the Facebook, Twitter and Instagram links(?: open in a new window)?$/) do |status|
	if (status == "should")
        expected_content = Array.new(['http://www.facebook.com/homestoloveau', 
    	    'http://twitter.com/homestoloveau', 
    	    'http://instagram.com/homestoloveau/'])

        actual_content = all('.social-link a').map { |a| a['href'] }
        expect(actual_content).to eq(expected_content)

        actual_target = all('.social-link a').map { |a| a['target'] }
        expect(actual_target.count("_blank")).to eq(actual_target.size)
    else
        expect(page).to have_no_selector('.get-social')
        #expect(find('.get-social__links').visible?).to eq(false)
    end
end

Then(/^I should see Belle, Real Living, Homes\+ and House & Garden links redirected to the brand page in the current window$/) do
    expected_content = Array.new(["#{$base_url}belle/",
    	"#{$base_url}real-living/",
    	"#{$base_url}homes-plus/",
    	"#{$base_url}australian-house-and-garden/"])    
    
    actual_content = all('.network-info__supported-content a').map { |a| a['href'] }
    expect(actual_content).to eq(expected_content)

    actual_target = all('.network-info__supported-content a').map { |a| a['target'] }
    expect(actual_target.count("_blank")).to eq(0)
end

Then(/^I should see the newsletter sign up$/) do
    expect(find('.newsletter').visible?).to eq(true)
end 

Then(/^I (should|should not) see subscribe image and button(?: links to "([^"]+)" in a new window)?$/) do |status, url|
    if (status == "should")
        actual_content = all('.magshop a').map { |a| a['href'] }
        expect(actual_content.count("#{url}")).to eq(2)

        actual_target = all('.magshop a').map { |a| a['target'] }
        expect(actual_target.count("_blank")).to eq(2)
    else
        expect(page).to have_no_selector('.magshop')
    end
end
