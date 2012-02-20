$(function() {
	var apiKey = $('#apikey').text();
  var sessionId = $('#session').text();
  var token = $('#token').text();
     
    TB.setLogLevel(TB.DEBUG);     
 
    var session = TB.initSession(sessionId);      
    session.addEventListener('sessionConnected', sessionConnectedHandler);
    session.addEventListener('streamCreated', streamCreatedHandler);      
    session.connect(apiKey, token);
 
    var publisher;
 		var subOptions =  {
			width: 576,
			height: 420
		}
		function sessionConnectedHandler(event) {
		    var div = document.createElement('div');
		    div.setAttribute('id', 'publisher');

		    var publisherContainer = document.getElementById('publisherContainer');  
		    	// This example assumes that a publisherContainer div exists
		    publisherContainer.appendChild(div);

		    publisher = session.publish('publisher', subOptions);
		}
     
    function streamCreatedHandler(event) {
      // Subscribe to any new streams that are created
      subscribeToStreams(event.streams);
    }
     
    function subscribeToStreams(streams) {
      for (var i = 0; i < streams.length; i++) {
        // Make sure we don't subscribe to ourself
        if (streams[i].connection.connectionId == session.connection.connectionId) {
          return;
        }
 
        // Create the div to put the subscriber element in to
        var div = document.createElement('div');
        div.setAttribute('id', 'stream' + streams[i].streamId);
        document.body.getElementById('subscribersContainer').appendChild(div);
                           
        // Subscribe to the stream
        session.subscribe(streams[i], div.id, subOptions);
      }
    }
})