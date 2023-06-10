// Store the travel plans
let plans = [];

// Function to add a travel plan
function addPlan(event) {
  event.preventDefault();

  // Get form values
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;
  const hours = document.getElementById('hours').value;
  const startLocation = document.getElementById('startLocation').value;
  const destination = document.getElementById('destination').value;
  const tripNumber = document.getElementById('tripNumber').value;
  const transport = document.getElementById('transport').value;

  // Create a new plan object
  const plan = {
    description,
    date,
    hours,
    startLocation,
    destination,
    tripNumber,
    transport
  };

  // Add the plan to the plans array
  plans.push(plan);

  // Clear form inputs
  document.getElementById('description').value = '';
  document.getElementById('date').value = '';
  document.getElementById('hours').value = '';
  document.getElementById('startLocation').value = '';
  document.getElementById('destination').value = '';
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

    const description = document.createElement('p');
    description.textContent = plan.description;

    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'View Details';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deletePlan(index));

    planElement.appendChild(description);
    planElement.appendChild(detailsButton);
    planElement.appendChild(deleteButton);
    travelPlans.appendChild(planElement);
  });
}

// Add event listener to the form submission
document.getElementById('travelForm').addEventListener('submit', addPlan);

