Given(/^I am viewing a competition page$/) do
    visit '/competition'
end

Then(/^I should see "([^"]+)" as the embed code$/) do |form_id|
    page.should have_xpath("//iframe[@src='//display.engagesciences.com/display/container/#{form_id}']")
end

And(/I fill in the following information:$/) do |table|
    enter_data = table.rows_hash
    within_frame(page.find(:xpath, './/iframe[contains(@id, "ngxFrame")]')) do
        dropdown_title("#{enter_data['Title']}")
        fill_in 'name_Firstname', with: "#{enter_data['First Name']}"
        fill_in 'name_Lastname', with: "#{enter_data['Last Name']}"
        fill_in 'Address_Line_1', with: "#{enter_data['Address Line 1']}"
        fill_in 'Address_Line_2', with: "#{enter_data['Address Line 2']}"
        fill_in 'CitySuburb', with: "#{enter_data['City/Suburb']}"
        dropdown_state("#{enter_data['State']}")
        fill_in 'Postcode', with: "#{enter_data['Postcode']}"
        textbox_dob_date("#{enter_data['DOB Day']}")
        dropdown_dob_month("#{enter_data['DOB Month']}")
        textbox_dob_year("#{enter_data['DOB Year']}")
        textbox_email("#{enter_data['Email Address']}")
        fill_in 'Enter_your_answer', with: "#{enter_data['Tell us in 25 words or less']}"
        checkbox_terms_conditions("#{enter_data['I accept the Terms and Conditions']}")
    end
end

And(/I click ENTER button$/) do
    within_frame(page.find(:xpath, './/iframe[contains(@id, "ngxFrame")]')) do
        find('button[type="submit"]').click
    end
end

And(/I should see "([^"]+)" as a confirmation message/) do |msg|
    within_frame(page.find(:xpath, './/iframe[contains(@id, "ngxFrame")]')) do
        page.find('h1.xTitle')
        confirmation_msg = find("h1.xTitle").text
        expect(confirmation_msg).to have_content(msg)
    end
end

def dropdown(pos_type, value)
    dropdown_title = all('.xComboWrapper')[pos_type.to_i]
    within (dropdown_title) do 
        dropdown_title.click
        within('.xComboOptions > .xComboOption') do
            find(".option[data-value='#{value}']").click
        end
    end
end

def dropdown_title(title)
    dropdown('0', title.camelize)
end

def dropdown_state(state)
    dropdown('1', state.upcase)
end

def dobmonth(month)
    dropdown('2', month)
end

def textbox_dob_date(value)
    downcase_value = value.downcase
    if (downcase_value == "default value")
        dob_day = Date.today.day
    else
        dob_day = value
    end
    fill_in "Date_Of_Birth_day", with: dob_day
end

def textbox_dob_year(value)
    downcase_value = value.downcase
    if (downcase_value == "default value")
        dob_year = Date.today.year
    else
        dob_year = value
    end
    fill_in "Date_Of_Birth_year", with: dob_year
end

def dropdown_dob_month(dob_month)
    downcase_dob_month = dob_month.downcase
    if (downcase_dob_month == "default value")
        dobmonth(sprintf("%02d", Date.today.month))
    else
        if (dob_month =~ /\A\d+\Z/)             
            dobmonth(sprintf("%02d", dob_month))
        else
            dobmonth(sprintf("%02d", Date::MONTHNAMES.index(dob_month)))
        end 
    end
end

def textbox_email(value)
    downcase_value = value.downcase
    if (downcase_value == "default value")
        s = [*('a'..'z'),*('0'..'9')].sample(5).join
        email = "janice." + s + "@test.com"
    else
        email = value
    end
    fill_in "email", with: email
end

def checkbox_terms_conditions(value)
    downcase_value = value.downcase
    if (downcase_value == "yes")
        find('#xForm-tsandcs_check').click
    end
end