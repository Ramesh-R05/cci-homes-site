module Solr

  require 'rsolr'
  require 'open-uri'

  @solr = nil
  @base_url = nil

  def Solr.initialise(solr_url)
    @base_url = solr_url
    @solr = RSolr.connect(url:solr_url)
  end

  def Solr.create_collection(collection_name)
    raise "SOLR must be initialised before creating collection" unless @solr

    unless Solr.collection_exists?(collection_name)
      puts "creating SOLR collection [#{collection_name}]" if $verbose_logging
      @solr.get('admin/collections',
        :params => {
          :action => 'CREATE',
          :name => collection_name,
          :numShards => 1,
          :replicationFactor => 1,
          :maxShardsPerNode => 1,
          'collection.configName' => 'default'
        })
    else
      puts "collection already exists" if $verbose_logging
    end

    puts "ok" if $verbose_logging
  end

  def Solr.delete_collection(collection_name)
    raise "SOLR must be initialised before deleting a collection" unless @solr

    if Solr.collection_exists?(collection_name)
      puts "deleting collection from SOLR [#{collection_name}]" if $verbose_logging
      @solr.get('admin/collections', :params => {
          :action => 'DELETE',
          :name => collection_name
        })
      puts "ok" if $verbose_logging
    else
      puts "collection #{collection_name} doesn't yet exist" if $verbose_logging
    end
  end

  def Solr.collection_exists?(collection_name)
    raise "SOLR must be initialised before checking a collection" unless @solr

    puts "checking if collection #{collection_name} exist?" if $verbose_logging
    response = @solr.get('admin/collections', :params => {
        :action => 'LIST',
        :wt => 'json'
    })

    exists = !! (response[:collections].include?(collection_name))
    puts "  it does#{exists ? '' : 'n\'t'} exist" if $verbose_logging

    exists
  end

  def Solr.create_document(collection_name, document, commit = true)
    raise "SOLR must be initialised before creating document(s)" unless @solr

    full_collection_name = "#{collection_name}_shard1_replica2"

    puts "adding document(s) to SOLR collection - #{full_collection_name}" if $verbose_logging

    collection_url = "#{@base_url}#{full_collection_name}/"
    collection = RSolr.connect(:url => collection_url)
    collection.add(document)
    collection.commit if commit

    puts 'ok' if $verbose_logging
  end
end
