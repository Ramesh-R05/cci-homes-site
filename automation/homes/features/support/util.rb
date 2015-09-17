def wait_until(timeout = 5)
  start_time = Time.now

  begin
    value = yield
    raise "condition is still false" if !value
  rescue
    sleep(0.1)
    if (Time.now - start_time) > timeout
      raise "Timed out waiting for field to change"
    else
      retry
    end
  end
end
