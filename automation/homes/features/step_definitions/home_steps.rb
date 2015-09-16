Given(/^I am on the homepage$/) do
    visit '/'
end

Then(/^I should see (\d+) galleries in the gallery of galleries$/) do |items|
    expect(page).to have_selector('.carousel__pagination li', count: items.to_i)
end

When(/^I click on the (previous|next) icon$/) do |condition|
    if (condition == "previous")
        find('.carousel__navigation-button--prev').click
    else
        find('.carousel__navigation-button--next').click
    end	
end

Then(/^I should see the "([^"]+)" gallery$/) do |title|
    gallery_title = find('.carousel__item--active .gallery-item__title').text
    expect(gallery_title).to have_content(title)
end

Then(/^I click on the gallery image$/) do
    find('.carousel__item--active .gallery-item__image').click
end	

Then(/^I should be redirected to the specific gallery page$/) do
    new_path = redirect_page("/")
    expect(new_path).to eq('/gallery-kimberly-and-stephens-byron-bay-beach-house-1660')
end
