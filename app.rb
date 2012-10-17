require 'sinatra'
require 'rack/post-body-to-params'
require 'sequel'
require 'active_support'

ActiveSupport::JSON.backend = 'Yajl'

# Sqlite Memory Database
DB = Sequel.sqlite('projects.db')

# create an items table
DB.create_table :projects do
  primary_key :id
  String :name
  String :description
  String :site
end unless DB.table_exists?(:projects)

use Rack::PostBodyToParams

set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/projects' do
  begin
    results = DB[:projects].all
    logger.info results.inspect
    results.to_json
  rescue
    "[]"
  end
end

post '/projects' do
  puts params.inspect
  data = { name: params[:name], description: params[:description], site: params[:site] }
  record = DB[:projects].insert(data)
  data.to_json
end

get '/projects/:id' do |id|
  DB[:projects].where(id: id).first.to_json
end

put '/projects/:id' do |id|
  DB[:projects].where(id: id).update(name: params[:name], description: params[:description], site: params[:site])
  DB[:projects].where(id: id).first.to_json
end

delete '/projects/:id' do |id|
  DB[:projects].where(id: id).delete
  '{"status": "success"}'
end

