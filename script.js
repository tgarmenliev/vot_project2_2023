// callAPI function that takes the base and exponent numbers as parameters
var callAPI_PostPlan = (eventName,eventDescription,eventDate,startLocation,destination,departureTime,arrivalTime,tripNumber,transport)=>{
	// instantiate a headers object
	var myHeaders = new Headers();
	// add content type header to object
	myHeaders.append("Content-Type", "application/json");
	// using built in JSON utility package turn object to string and store in a variable
	var raw = JSON.stringify({"eventName":eventName,"eventDescription":eventDescription,"eventDate":eventDate,"startLocation":startLocation,"destination":destination,"departureTime":departureTime,"arrivalTime":arrivalTime,"tripNumber":tripNumber,"transport":transport});
	// create a JSON object with parameters for API call and store in a variable
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};
	// make API call with parameters and use promises to get response
	fetch("https://i8b5ylple2.execute-api.eu-north-1.amazonaws.com/dev", requestOptions)
	.then(response => response.text())
	.then(result => alert(JSON.parse(result).body))
	.catch(error => console.log('error', error));
}

var callAPI_GetAll = () => {

  var myDiv = document.getElementById("travelPlans");

  if (myDiv.innerHTML === "") {
  
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
  };
  // make API call with parameters and use promises to get response
  fetch("https://i8b5ylple2.execute-api.eu-north-1.amazonaws.com/dev", requestOptions)
	  .then(response => response.json())
	  .then(result => {
		  var travel_plans = JSON.parse(result.body);
		  var plans_element = document.getElementById("travelPlans");
		  plans_element.innerHTML = "";
		  var button = document.getElementById("showHide");
		  button.textContent = "Hide all";
		  travel_plans.forEach(plan => {
			  var travel_plan = document.createElement("div");
			  travel_plan.innerHTML = "<h3>" + plan.EventName + " " + plan.EventDate +"</h3>";
			  plans_element.appendChild(travel_plan); // corrected variable name
		  });
	  })
	  .catch(error => console.log('error', error));
	  
  }
  else {
	var button = document.getElementById("showHide");
	button.textContent = "Show all";
	var plans_element = document.getElementById("travelPlans");
	plans_element.innerHTML = "";
  }
}

const carelessDate = (date) => new Date(Date.UTC(date.getFullYear(),date.getMonth(), date.getDate()));
const compareDates = (dateOne, dateTwo) => carelessDate(dateOne).toDateString() === carelessDate(dateTwo).toDateString()

var callAPI_GetByDate = () => {

var myDiv = document.getElementById("travelPlansDate");

if (myDiv.innerHTML === "") {

  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
  };

  // make API call with parameters and use promises to get response
  fetch("https://i8b5ylple2.execute-api.eu-north-1.amazonaws.com/dev", requestOptions)
	  .then(response => response.json())
	  .then(result => {
		  var travel_plans = JSON.parse(result.body);
		  var plans_element = document.getElementById("travelPlansDate");
		  plans_element.innerHTML = "";

		  var button = document.getElementById("showByDate");
		  button.textContent = "Hide all";

		  var desiredDateInput = document.getElementById('eventDateRequest').value;
		  var desiredDate = new Date(desiredDateInput);

		  travel_plans.forEach(plan => {
			  console.log(plan);
			  if (compareDates(new Date(plan.EventDate), desiredDate)) { // Check if event's date matches desired date
				  var travel_plan = document.createElement("div");
				  travel_plan.innerHTML = "<h3>" + plan.EventName +"</h3>" + "<p>" + "Date: " + plan.EventDate + "<br>Description: " + plan.Description + "<br>Start location: " + plan.StartLocation + "<br>Destination: " + plan.Destination + "<br>Departure time: " + plan.DepartureTime + "<br>Desired arrival time: " + plan.ArrivalTime + "<br>Trip with number: " + plan.TripNumber + "<br>Type of transport: " + plan.Transport +"</p>";
				  plans_element.appendChild(travel_plan);
			  }
		  });
	  })
	  .catch(error => console.log('error', error));
  }
  else {
	var button = document.getElementById("showByDate");
	button.textContent = "Show all on this date";
	var plans_element = document.getElementById("travelPlansDate");
	plans_element.innerHTML = "";
  }
}




	var callAPI_GetByName = () => {

	  var myDiv = document.getElementById("travelPlansName");

		if (myDiv.innerHTML === "") {
		
	  // create a JSON object with parameters for API call and store in a variable
	  var requestOptions = {
		  method: 'GET',
		  redirect: 'follow'
	  };
	  // make API call with parameters and use promises to get response
	  fetch("https://i8b5ylple2.execute-api.eu-north-1.amazonaws.com/dev", requestOptions)
		  .then(response => response.json())
		  .then(result => {
			  var travel_plans = JSON.parse(result.body);
			  var plans_element = document.getElementById("travelPlansName");
			  plans_element.innerHTML = "";
			  
			  var desiredNameInput = document.getElementById('eventNameRequest').value;
			  
			  var button = document.getElementById("showByName");
						button.textContent = "Hide all";
			  travel_plans.forEach(plan => {
					  if(plan.EventName === desiredNameInput)
					  {
						var travel_plan = document.createElement("div");
						travel_plan.innerHTML = "<h3>" + plan.EventName +"</h3>" + "<p>" + "Date: " + plan.EventDate + "<br>Description: " + plan.Description + "<br>Start location: " + plan.StartLocation + "<br>Destination: " + plan.Destination + "<br>Departure time: " + plan.DepartureTime + "<br>Desired arrival time: " + plan.ArrivalTime + "<br>Trip with number: " + plan.TripNumber + "<br>Type of transport: " + plan.Transport +"</p>";
						plans_element.appendChild(travel_plan); // corrected variable name
				  }
			  });
		  })
		  .catch(error => console.log('error', error));
		  
	   }
	   else {
			var button = document.getElementById("showByName");
			button.textContent = "Show more details about this travel plan";
			var plans_element = document.getElementById("travelPlansName");
		plans_element.innerHTML = "";
		}
}



var callAPI_GetByType = () => {

	  var myDiv = document.getElementById("travelPlansType");

		if (myDiv.innerHTML === "") {
		
	  // create a JSON object with parameters for API call and store in a variable
	  var requestOptions = {
		  method: 'GET',
		  redirect: 'follow'
	  };
	  // make API call with parameters and use promises to get response
	  fetch("https://i8b5ylple2.execute-api.eu-north-1.amazonaws.com/dev", requestOptions)
		  .then(response => response.json())
		  .then(result => {
			  var travel_plans = JSON.parse(result.body);
			  var plans_element = document.getElementById("travelPlansType");
			  plans_element.innerHTML = "";
			  
			  var desiredNameInput = document.getElementById('transportRequest').value;
			  
			  var button = document.getElementById("showByType");
						button.textContent = "Hide all";
			  travel_plans.forEach(plan => {
					  if(plan.Transport === desiredNameInput)
					  {
						var travel_plan = document.createElement("div");
						travel_plan.innerHTML = "<h3>" + plan.EventName +"</h3>" + "<p>" + "Date: " + plan.EventDate + "<br>Description: " + plan.Description + "<br>Start location: " + plan.StartLocation + "<br>Destination: " + plan.Destination + "<br>Departure time: " + plan.DepartureTime + "<br>Desired arrival time: " + plan.ArrivalTime + "<br>Trip with number: " + plan.TripNumber + "<br>Type of transport: " + plan.Transport +"</p>";
						plans_element.appendChild(travel_plan); // corrected variable name
				  }
			  });
		  })
		  .catch(error => console.log('error', error));
		  
	   }
	   else {
			var button = document.getElementById("showByType");
			button.textContent = "Show more details about this types travel plans";
			var plans_element = document.getElementById("travelPlansType");
		plans_element.innerHTML = "";
		}
}
