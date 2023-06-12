// Store the travel plans
//let plans = [];

// callAPI function that takes the base and exponent numbers as parameters
var callAPI = () => {
  var eventName = document.getElementById('eventName').value;
  var eventDescription = document.getElementById('eventDescription').value;
  var eventDate = document.getElementById('eventDate').value;
  var startLocation = document.getElementById('startLocation').value;
  var destination = document.getElementById('destination').value;
  var departureTime = document.getElementById('departureTime').value;
  var arrivalTime = document.getElementById('arrivalTime').value;
  var tripNumber = document.getElementById('tripNumber').value;
  var transport = document.getElementById('transport').value;

  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append('Content-Type', 'application/json');
  // using built-in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify({
    eventName: eventName,
    eventDescription: eventDescription,
    eventDate: eventDate,
    startLocation: startLocation,
    destination: destination,
    departureTime: departureTime,
    arrivalTime: arrivalTime,
    tripNumber: tripNumber,
    transport: transport
  });
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  // make API call with parameters and use promises to get response
  fetch('https://i8b5ylple2.execute-api.eu-north-1.amazonaws.com/dev', requestOptions)
    .then((response) => response.text())
    .then((result) => alert(JSON.parse(result).body))
    .catch((error) => console.log('error', error));
};

var callAPI2 = () => {
  var myDiv = document.getElementById('travelPlans');

  if (myDiv.innerHTML === '') {
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch('https://i8b5ylple2.execute-api.eu-north-1.amazonaws.com/dev', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var travel_plans = JSON.parse(result.body);
        var plans_element = document.getElementById('travelPlans');
        plans_element.innerHTML = '';
        var button = document.getElementById('showHide');
        button.textContent = 'Hide all';
        travel_plans.forEach((plan) => {
          var travel_plan = document.createElement('div');
          travel_plan.innerHTML = '<h3>' + plan.EventName + ' ' + plan.EventDate + '</h3>';
          plans_element.appendChild(travel_plan); // corrected variable name
        });
      })
      .catch((error) => console.log('error', error));
  } else {
    var button = document.getElementById('showHide');
    button.textContent = 'Show all';
    var plans_element = document.getElementById('travelPlans');
    plans_element.innerHTML = '';
  }
};

var callAPI3 = () => {
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  // make API call with parameters and use promises to get response
  fetch('https://i8b5ylple2.execute-api.eu-north-1.amazonaws.com/dev', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      var travel_plans = JSON.parse(result.body);
      var plans_element = document.getElementById('travelPlansDate');
      plans_element.innerHTML = '';

      var desiredDateInput = document.getElementById('eventDateRequest').value; // Example desired date from input field
      var desiredDate = new Date(desiredDateInput); // Convert to ISO 8601 format

      var travel_plan2 = document.createElement('div');
      travel_plan2.innerHTML = '<h3>' + desiredDate + '</h3>';
      plans_element.appendChild(travel_plan2);

      travel_plans.forEach((plan) => {
        var dateString = Date.parse(plan.date);
        var newDate = new Date(dateString);
        if (newDate - desiredDate === 0) {
          // Check if event's date matches desired date
          var travel_plan = document.createElement('div');
          travel_plan.innerHTML = '<h3>' + plan.EventName + '</h3>';
          plans_element.appendChild(travel_plan);
        }
      });
    })
    .catch((error) => console.log('error', error));
};
