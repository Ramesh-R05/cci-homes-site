Then(/^I can scroll into view a TEADs video$/) do
    handle_lazy_load(1)
    find(".teads-inread")
end
