class ToksessionController < ApplicationController
  def new
    opentok = OpenTok::OpenTokSDK.new(ENV['opentok_api_key'], ENV['opentok_api_secret'])

    session_properties = { OpenTok::SessionPropertyConstants::P2P_PREFERENCE => "enabled" }
    session = opentok.create_session request.remote_addr, session_properties
    redirect_to root_path+ "?session_id=#{session}"

  end
    
end
