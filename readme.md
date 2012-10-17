# CRUD

A angularjs tutorial to build a simple crud application with a sinatra backend.

## Requirements

1. Ruby 1.9.3-p194
2. rvm
3. nodejs and npm
4. sqlite3
5. bundler

## STEP 1: Setting up the backend

1. Create new folder called crud

``` sh
mkdir crud
```

2. Create a Gemfile

``` sh
touch Gemfile
```

3. Add the following gems

``` ruby
source :rubygems

gem 'sinatra'
gem 'json'
gem 'rack-post-body-to-params'
gem 'sqlite3'
gem 'sequel'
gem 'activesupport'
gem 'yajl-ruby'
```

4. Run Bundle Install

``` sh
bundle install
```

5. Create app.rb

``` sh
touch app.rb
```

6. Add REST Code

``` ruby
require 'sinatra'
require 'rack/post-body-to-params'
require 'sequel'
require 'active_support'

ActiveSupport::JSON.backend = 'Yajl'

DB = Sequel.sqlite("sqlite://projects.db")

# create an items table
DB.create_table :projects do
  primary_key :id
  String :name
  String :description
  String :site
end

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

```

## Step 2: Setting up AngularJS

1. Install ng globally

``` sh
npm install ng -g
```

2. Create AngularJS Project

```
ng init projects
mv projects public
```

## Step 3: Setting up the list controller view


