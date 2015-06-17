RSpec::Matchers.define :have_link_canonical do |expected|
  match do |actual|
    has_css?("link[rel=canonical][href='#{expected}']", :visible => false)
  end

  failure_message_for_should do |actual|
    actual = first("link[rel=canonical]")
    if actual
      "expected that link canonical would have content='#{expected}' but was '#{actual[:content]}'"
    else
      "expected that link canonical would exist with content='#{expected}'"
    end
  end
end
