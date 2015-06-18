Given(/^I am viewing an article( with a hero image| with a hero video)$/) do |condition|
	case condition
	when ' with a hero image'
  		visit '/section/article-hero-image'
  	when ' with a hero video'
  		visit '/section/article-hero-video'
  	end	
end

Then(/^I should see "(.*?)" as the title$/) do |title|
  	article_title = find("h1.article__title").text
  	expect(article_title).to eq(title)
end

Then(/^I should see a hero image$/) do
  	hero_image = find('.article__main-hero img')
  	expect(hero_image.visible?).to eq(true)
end

Then(/^I should see "(.*?)" within the summary$/) do |summary|
  	article_summary = find('.article__summary').text
  	expect(article_summary).to have_content(summary)
end

Then(/^I should see "(.*?)" within the first paragragh$/) do |body|
  	article_body = first(".content-body__paragraph").text
  	expect(article_body).to have_content(body)
end

Then(/^I should see an inline image with the text as "(.*?)" in caption$/) do |image_caption|
	article_inline_image = find('.content-body__inline-image img')
  	article_inline_image_caption = find('.content-body__inline-image-caption').text

  	expect(article_inline_image.visible?).to eq(true)
  	expect(article_inline_image_caption).to have_content(image_caption)
end

Then(/^I should see a source logo$/) do
	hero_image = find('.article__source')
  	expect(hero_image.visible?).to eq(true)
end 

Then(/^I should see a hero video$/) do
  	hero_video = find('.article__main-hero-video .video-wrapper')
  	expect(hero_video.visible?).to eq(true)
end