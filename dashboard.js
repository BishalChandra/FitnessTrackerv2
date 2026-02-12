// LOAD DATA ON START
document.addEventListener("DOMContentLoaded", () => {
  loadWorkouts();
  loadSteps();
  loadBodyStats();
  updateProgress();
  generateAI();
});

// WORKOUTS
function addWorkout(){
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

  workouts.push({
    date: new Date().toLocaleDateString(),
    activity: activity.value,
    duration: duration.value,
    calories: calories.value
  });

  localStorage.setItem("workouts", JSON.stringify(workouts));
  activity.value = duration.value = calories.value = "";
  loadWorkouts();
  updateProgress();
}

function loadWorkouts(){
  const list = document.getElementById("workoutList");
  list.innerHTML = "";

  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

  workouts.forEach(w => {
    list.innerHTML += `
      <div class="row">
        <span>${w.date}</span>
        <span>${w.activity}</span>
        <span>${w.duration}</span>
        <span>${w.calories}</span>
      </div>`;
  });
}

// STEPS
function saveSteps(){
  localStorage.setItem("steps", stepsInput.value);
  loadSteps();
}

function loadSteps(){
  let steps = localStorage.getItem("steps");
  if(steps){
    stepsDisplay.innerText = "Today's Steps: " + steps;
  }
}

// BODY STATS
function saveBodyStats(){
  localStorage.setItem("bodyStats", JSON.stringify({
    weight: weight.value,
    bmi: bmi.value
  }));
  loadBodyStats();
}

function loadBodyStats(){
  let stats = JSON.parse(localStorage.getItem("bodyStats"));
  if(stats){
    bodyDisplay.innerText = `Weight: ${stats.weight}kg | BMI: ${stats.bmi}`;
  }
}

// PROGRESS BAR
function updateProgress(){
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  let percent = Math.min(workouts.length * 20, 100);

  progressFill.style.width = percent + "%";
  progressText.innerText = `${percent}% of your weekly goal completed 🎯`;
}

// AI SUGGESTION
function generateAI(){
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  aiText.innerText =
    workouts.length >= 3
      ? "Great consistency! Keep it up 💪"
      : "Try adding more workouts this week 🚀";
}
