class SiteController < ApplicationController
  def index
    redirect_to new_toksession_path unless params[:session_id]
    @session = params[:session_id]
    
    opentok = OpenTok::OpenTokSDK.new(ENV['opentok_api_key'], ENV['opentok_api_secret'])
    @token = opentok.generate_token :session_id => @session
    @apikey = ENV['opentok_api_key']
  end  
end
