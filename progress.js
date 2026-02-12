const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

const labels = workouts.map(w => w.date);
const calories = workouts.map(w => w.calories);

new Chart(document.getElementById("workoutChart"), {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Calories Burned",
      data: calories,
      borderColor: "#7CFF6B",
      fill: false
    }]
  }
});
