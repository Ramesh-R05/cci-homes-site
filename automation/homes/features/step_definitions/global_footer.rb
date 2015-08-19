Then(/^I should see the global footer$/) do
    expect(page).to have_selector('.footer')
end

Then(/^I should see the global footer heading "(.*?)"$/) do |heading|
    expect(page.find('.footer > section.get-social')).to have_content(heading.upcase.gsub(' ', '').upcase)
end

Then(/^I should see the Privacy Policy, Advertise and Terms of Use links$/) do
	within('.footer__navigation') do
  	    expect(page).to have_link('Privacy Policy', :href=>'http://www.bauer-media.com.au/privacy')
  	    expect(page).to have_link('Advertise', :href=>'http://www.bauer-media.com.au/advertising/advertise-with-us')
  	    expect(page).to have_link('Terms of Use', :href=>'http://www.bauer-media.com.au/terms/website-terms')
  	end
end
