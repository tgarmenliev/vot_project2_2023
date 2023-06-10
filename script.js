// Store the travel plans
let plans = [];

// Function to add a travel plan
function addPlan(event) {
  event.preventDefault();

  // Get form values
  const eventName = document.getElementById('eventName').value;
  const eventDescription = document.getElementById('eventDescription').value;
  const eventDate = document.getElementById('eventDate').value;
  const startLocation = document.getElementById('startLocation').value;
  const destination = document.getElementById('destination').value;
  const departureTime = document.getElementById('departureTime').value;
  const arrivalTime = document.getElementById('arrivalTime').value;
  const tripNumber = document.getElementById('tripNumber').value;
  const transport = document.getElementById('transport').value;

  // Create a new plan object
  const plan = {
    eventName,
    eventDescription,
    eventDate,
    startLocation,
    destination,
    departureTime,
    arrivalTime,
    tripNumber,
    transport
  };

  // Add the plan to the plans array
  plans.push(plan);

  // Clear form inputs
  document.getElementById('eventName').value = '';
  document.getElementById('eventDescription').value = '';
  document.getElementById('eventDate').value = '';
  document.getElementById('startLocation').value = '';
  document.getElementById('destination').value = '';
  document.getElementById('departureTime').value = '';
  document.getElementById('arrivalTime').value = '';
  document.getElementById('tripNumber').value = '';

  // Refresh the travel plans list
  displayPlans();
}

// Function to delete a travel plan
function deletePlan(index) {
  plans.splice(index, 1);
  displayPlans();
}

// Function to display the travel plans
function displayPlans() {
  const travelPlans = document.getElementById('travelPlans');
  travelPlans.innerHTML = '';

  plans.forEach((plan, index) => {
    const planElement = document.createElement('div');
    planElement.className = 'travel-plan';

    const eventName = document.createElement('p');
    eventName.textContent = plan.eventName;

    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'View Details';
    detailsButton.className = 'details-button';
    detailsButton.addEventListener('click', () => showDetails(index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deletePlan(index));

    planElement.appendChild(eventName);
    planElement.appendChild(detailsButton);
    planElement.appendChild(deleteButton);
    travelPlans.appendChild(planElement);
  });
}

// Function to show the details of a travel plan
function showDetails(index) {
  const plan = plans[index];
  const details = `Event Name: ${plan.eventName}\nDescription: ${plan.eventDescription}\nDate: ${plan.eventDate}\nStart Location: ${plan.startLocation}\nDestination: ${plan.destination}\nDeparture Time: ${plan.departureTime}\nArrival Time: ${plan.arrivalTime}\nNumber of the Trip: ${plan.tripNumber}\nTransport: ${plan.transport}`;
  alert(details);
}

// Add event listener to the form submission
document.getElementById('travelForm').addEventListener('submit', addPlan);
