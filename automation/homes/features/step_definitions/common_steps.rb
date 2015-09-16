When(/^I pause$/) do
  print "Press Return to continue"
  STDIN.getc
end

def dynamic_wait(element)
  i = 0
  timeout = 10
    while (page.has_css?(element) == false) && (i < timeout)
      sleep(1)
      i = i + 1
    end
end

def redirect_page(test_path)
    i = 0
    timeout = 10
    old_path = URI.parse(current_url).path 
    while (old_path == test_path) && (i < timeout) do
        sleep 1
        i = i + 1
        old_path = URI.parse(current_url).path 
    end 
    new_path = URI.parse(current_url).path 
    return new_path
end