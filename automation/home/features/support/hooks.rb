require '../support/hooks'
require '../support/solr'

$solr_initialised = false

Before('@solr') do

  unless $solr_initialised
    initialise_solr
    $solr_initialised = true
  end

  clear_site_cache
end

After('@solr') do
  clear_collections
end
