def read_document filename
  # read_document will try to find json within the project folder first. 
  # If not there, will look up the test data under common.
  if File.exist?("./features/test_data/#{filename}")
    doc = open("./features/test_data/#{filename}") { |f| f.read }
  elsif $project == 'aww' || $project == 'wd'
    doc = open("../common_aww_wd/test_data/#{filename}") { |f| f.read }

    doc = doc.gsub!('PROJ', $project.upcase)
  end

  doc = JSON.parse(doc)
end

def load_document_into_solr (filename, solr_collection_name = $solr_collection_name)
  json = read_document filename
  load_json_into_solr(json, solr_collection_name)
end

def load_documents_into_solr(filenames, solr_collection_name = $solr_collection_name)
  if filenames && !filenames.empty?
    documents = filenames.map {| filename | read_document(filename)}
    load_json_into_solr documents, solr_collection_name
  end
end

def load_json_into_solr (json, solr_collection_name = $solr_collection_name)
  if json.kind_of?(Array)
    json.each do | doc |
      update_site_url(doc,solr_collection_name)
    end
  else
      update_site_url(json, solr_collection_name)
  end
  Solr.create_document(solr_collection_name, json)
end

def update_site_url (doc, solr_collection_name)
    if solr_collection_name['search']
        doc['siteUrl_t'] = $base_url[0..-2]
    else
        doc['siteUrl_s'] = $base_url[0..-2]
    end
end

def generate_filename_from_document_name(profile_name, folder_name = '')
  filename = "#{profile_name.gsub(/'/, '').downcase}"
  filename = "#{filename.gsub(/ /, '-').downcase}.json"

  if folder_name.strip.empty?
    filename
  else
    "#{folder_name}/#{filename}"
  end
end

def deep_clone_json json
  JSON.parse(JSON.generate(json))
end