

/**
*    * Create the new activity and send it to the server.
*       */
function postActivity(text, divId, priority) {  
	var div = document.getElementById(divId);
	var params = {};  
	params[opensocial.Activity.Field.TITLE] = text;
	var activity = opensocial.newActivity(params); 
	opensocial.requestCreateActivity(activity, opensocial.CreateActivityPriority.HIGH, callback);
//	div.innerHTML = "Activity title is: " + activity.getField(opensocial.Activity.Field.TITLE);
};        

/**
*   * Server calls this function to indicate whether the activity post succeeded or failed.
*     */
function callback(status) {
if (status.hadError())
{
//	alert("Error creating activity.");
}
else 
{
//	alert("Activity successfully created.");
}
};


