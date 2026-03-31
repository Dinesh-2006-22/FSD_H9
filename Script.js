const cropRules = [
  {
    name: "Rice", emoji: "🌾",
    soils: ["clay", "loamy", "silt"],
    tempMin: 20, tempMax: 37,
    humMin: 70,  humMax: 100,
    rainMin: 1000, rainMax: 5000,
    phMin: 5.5, phMax: 7.0,
    reason: "Rice thrives in waterlogged, clayey or loamy soils with high humidity and heavy rainfall."
  },
  {
    name: "Wheat", emoji: "🌾",
    soils: ["loamy", "clay", "silt", "chalky"],
    tempMin: 10, tempMax: 25,
    humMin: 40,  humMax: 75,
    rainMin: 350, rainMax: 900,
    phMin: 6.0, phMax: 7.5,
    reason: "Wheat prefers cool temperatures, moderate rainfall, and well-drained loamy or clay soils."
  },
  {
    name: "Maize", emoji: "🌽",
    soils: ["loamy", "sandy", "silt"],
    tempMin: 18, tempMax: 35,
    humMin: 50,  humMax: 80,
    rainMin: 500, rainMax: 1200,
    phMin: 5.8, phMax: 7.0,
    reason: "Maize grows well in warm conditions with moderate moisture and well-drained loamy soils."
  },
  {
    name: "Cotton", emoji: "🌿",
    soils: ["sandy", "loamy", "clay"],
    tempMin: 21, tempMax: 37,
    humMin: 40,  humMax: 70,
    rainMin: 500, rainMax: 1200,
    phMin: 5.8, phMax: 8.0,
    reason: "Cotton loves warm, sunny weather with moderate rainfall and sandy or loamy soils."
  },
  {
    name: "Sugarcane", emoji: "🎋",
    soils: ["loamy", "clay", "silt"],
    tempMin: 20, tempMax: 38,
    humMin: 65,  humMax: 95,
    rainMin: 1000, rainMax: 3000,
    phMin: 6.0, phMax: 7.5,
    reason: "Sugarcane thrives in tropical climates with high humidity, heavy rain, and fertile loamy soils."
  },
  {
    name: "Soybean", emoji: "🫘",
    soils: ["loamy", "silt", "clay"],
    tempMin: 15, tempMax: 30,
    humMin: 50,  humMax: 80,
    rainMin: 450, rainMax: 1100,
    phMin: 6.0, phMax: 7.0,
    reason: "Soybean prefers well-drained loamy soils with moderate temperatures and steady rainfall."
  },
  {
    name: "Groundnut", emoji: "🥜",
    soils: ["sandy", "loamy"],
    tempMin: 20, tempMax: 33,
    humMin: 45,  humMax: 75,
    rainMin: 400, rainMax: 1000,
    phMin: 5.5, phMax: 7.0,
    reason: "Groundnuts need well-drained sandy or loamy soils with warm temperatures and moderate rainfall."
  },
  {
    name: "Jute", emoji: "🌿",
    soils: ["loamy", "silt", "clay"],
    tempMin: 24, tempMax: 37,
    humMin: 75,  humMax: 100,
    rainMin: 1000, rainMax: 2500,
    phMin: 6.0, phMax: 7.5,
    reason: "Jute flourishes in humid tropical climates with heavy monsoon rainfall and alluvial soils."
  },
  {
    name: "Potato", emoji: "🥔",
    soils: ["sandy", "loamy", "silt"],
    tempMin: 7,  tempMax: 22,
    humMin: 50,  humMax: 80,
    rainMin: 400, rainMax: 900,
    phMin: 5.0, phMax: 6.5,
    reason: "Potatoes prefer cool climates, slightly acidic sandy-loam soils, and moderate moisture."
  },
  {
    name: "Tomato", emoji: "🍅",
    soils: ["loamy", "sandy", "silt"],
    tempMin: 15, tempMax: 30,
    humMin: 45,  humMax: 75,
    rainMin: 400, rainMax: 900,
    phMin: 6.0, phMax: 7.0,
    reason: "Tomatoes do best in warm weather with well-drained, fertile loamy soils and moderate watering."
  },
  {
    name: "Banana", emoji: "🍌",
    soils: ["loamy", "silt", "clay"],
    tempMin: 20, tempMax: 35,
    humMin: 70,  humMax: 100,
    rainMin: 1000, rainMax: 3000,
    phMin: 5.5, phMax: 7.0,
    reason: "Bananas require a hot, humid climate with plenty of rainfall and deep, rich soils."
  },
  {
    name: "Coffee", emoji: "☕",
    soils: ["loamy", "peaty", "silt"],
    tempMin: 15, tempMax: 28,
    humMin: 65,  humMax: 90,
    rainMin: 1200, rainMax: 2500,
    phMin: 4.5, phMax: 6.5,
    reason: "Coffee grows best in mild temperatures, high rainfall, and slightly acidic loamy soils."
  },
  {
    name: "Tea", emoji: "🍵",
    soils: ["loamy", "peaty"],
    tempMin: 13, tempMax: 28,
    humMin: 70,  humMax: 100,
    rainMin: 1500, rainMax: 4000,
    phMin: 4.5, phMax: 6.0,
    reason: "Tea thrives in cool, misty highlands with heavy rainfall and acidic, well-drained peaty soils."
  },
  {
    name: "Millet", emoji: "🌾",
    soils: ["sandy", "loamy", "chalky"],
    tempMin: 20, tempMax: 38,
    humMin: 30,  humMax: 65,
    rainMin: 200, rainMax: 700,
    phMin: 5.5, phMax: 8.0,
    reason: "Millet is drought-resistant and suits hot, dry climates with sandy or loamy soils."
  },
];

/* Helper: check if a number is within [min, max] */
function inRange(val, min, max) {
  return val >= min && val <= max;
}

/* Score a crop: 1 point per matching criterion (max 5) */
function scoreCrop(crop, soil, temp, hum, rain, ph) {
  let score = 0;
  if (crop.soils.includes(soil))                 score++;
  if (inRange(temp, crop.tempMin, crop.tempMax)) score++;
  if (inRange(hum,  crop.humMin,  crop.humMax))  score++;
  if (inRange(rain, crop.rainMin, crop.rainMax)) score++;
  if (inRange(ph,   crop.phMin,   crop.phMax))   score++;
  return score;
}

/* Main function — called when the button is clicked */
function recommendCrop() {

  // 1. Read form values
  const soil    = document.getElementById('soilType').value;
  const tempStr = document.getElementById('temperature').value;
  const humStr  = document.getElementById('humidity').value;
  const rainStr = document.getElementById('rainfall').value;
  const phStr   = document.getElementById('phValue').value;

  // 2. Clear old errors
  let valid = true;
  ['field-soil','field-temp','field-humidity','field-rainfall','field-ph']
    .forEach(id => document.getElementById(id).classList.remove('has-error'));

  // 3. Validate each field
  if (!soil) {
    document.getElementById('field-soil').classList.add('has-error');
    valid = false;
  }
  const temp = parseFloat(tempStr);
  if (tempStr === '' || isNaN(temp) || temp < -10 || temp > 60) {
    document.getElementById('field-temp').classList.add('has-error');
    valid = false;
  }
  const hum = parseFloat(humStr);
  if (humStr === '' || isNaN(hum) || hum < 0 || hum > 100) {
    document.getElementById('field-humidity').classList.add('has-error');
    valid = false;
  }
  const rain = parseFloat(rainStr);
  if (rainStr === '' || isNaN(rain) || rain < 0 || rain > 5000) {
    document.getElementById('field-rainfall').classList.add('has-error');
    valid = false;
  }
  const ph = parseFloat(phStr);
  if (phStr === '' || isNaN(ph) || ph < 0 || ph > 14) {
    document.getElementById('field-ph').classList.add('has-error');
    valid = false;
  }

  if (!valid) return; // Stop if any field is invalid

  // 4. Find the best-scoring crop
  let bestCrop = null, bestScore = -1;
  cropRules.forEach(crop => {
    const s = scoreCrop(crop, soil, temp, hum, rain, ph);
    if (s > bestScore) { bestScore = s; bestCrop = crop; }
  });

  // 5. Map score → confidence label
  const confidenceMap = {
    5: { label: "Excellent Match", color: "#1a3c2b" },
    4: { label: "Good Match",      color: "#2d6a4f" },
    3: { label: "Moderate Match",  color: "#52b788" },
    2: { label: "Weak Match",      color: "#e9c46a" },
    1: { label: "Poor Match",      color: "#c0392b" },
    0: { label: "No Clear Match",  color: "#c0392b" },
  };
  const conf = confidenceMap[bestScore] || confidenceMap[0];

  // 6. Inject result into the DOM
  document.getElementById('resultCropName').innerHTML = `
    ${bestCrop.emoji} ${bestCrop.name}
    <span class="confidence-badge" style="background:${conf.color}">${conf.label}</span>
  `;
  document.getElementById('resultReason').textContent = bestCrop.reason;
  document.getElementById('resultStats').innerHTML = `
    <span class="stat-chip">🌍 ${capitalise(soil)} soil</span>
    <span class="stat-chip">🌡️ ${temp}°C</span>
    <span class="stat-chip">💧 ${hum}% humidity</span>
    <span class="stat-chip">🌧️ ${rain} mm rain</span>
    <span class="stat-chip">⚗️ pH ${ph}</span>
    <span class="stat-chip">📊 Score ${bestScore}/5</span>
  `;

  // 7. Show result box with animation (re-triggered each click)
  const box = document.getElementById('resultBox');
  box.style.display = 'none';
  box.style.display = 'block';
  setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

/* Capitalise first letter */
function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
