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