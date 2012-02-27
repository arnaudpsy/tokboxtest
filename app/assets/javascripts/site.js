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
			width: 570,
			height: 418
		}
 		var pubOptions =  {
			width: 270,
			height: 200
		}

		function sessionConnectedHandler(event) {
		    var div = document.createElement('div');
		    div.setAttribute('id', 'publisher');

		    var publisherContainer = document.getElementById('publisherContainer');  
		    	// This example assumes that a publisherContainer div exists
				publisherContainer.innerHTML='';
		    publisherContainer.appendChild(div);

		    publisher = session.publish('publisher', pubOptions);
		}
     
    function streamCreatedHandler(event) {
      // Subscribe to any new streams that are created
      subscribeToStream(event.streams);
    }
     
    function subscribeToStream(streams) {
			$('#initialcontent').remove();
			var subscriberContainer = $('#subscribersContainer');
			
      for (var i = 0; i < streams.length; i++) {
				var stream = streams[i];
        // Make sure we don't subscribe to ourself
        if (stream.connection.connectionId != session.connection.connectionId) {
	        // Create the div to put the subscriber element in to
	        var div = document.createElement('div');
	        div.setAttribute('id', 'stream' + streams[i].streamId);
					var subscriberContainer = document.getElementById('subscribersContainer');

	        subscriberContainer.appendChild(div);

	        // Subscribe to the stream
	        session.subscribe(stream, div.id, subOptions);
        }
      }
/*			$('#waiting').hide();
			$('#interface').css('visibility','visible');*/
    }
})