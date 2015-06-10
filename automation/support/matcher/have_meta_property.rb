RSpec::Matchers.define :have_meta_property do |property, expected|
  match do |actual|
    has_css?("meta[property='#{property}'][content*='#{expected}']", visible: false)
  end

  failure_message_for_should do |actual|
    actual = first("meta[property='#{property}']")
    if actual
      "expected that meta #{property} would have content='#{expected}' but was '#{actual[:content]}'"
    else
      "expected that meta #{property} would exist with content='#{expected}'"
    end
  end
end
