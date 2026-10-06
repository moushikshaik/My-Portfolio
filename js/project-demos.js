/* ==========================================================================
   PROJECT INTERACTIVE SIMULATORS & DEMOS
   Real-time in-browser demonstrations of Moushik's projects
   ========================================================================== */

// --- 1. CROP RECOMMENDATION SIMULATOR ---
const cropProfiles = [
  { name: 'Rice', n: 80, p: 48, k: 40, temp: 24, humidity: 82, ph: 6.5, rain: 240, icon: '🌾', note: 'Thrives in high rainfall & humid tropical climates.' },
  { name: 'Maize', n: 78, p: 48, k: 20, temp: 23, humidity: 65, ph: 6.2, rain: 110, icon: '🌽', note: 'Moderate moisture with balanced nitrogen input.' },
  { name: 'Cotton', n: 117, p: 46, k: 19, temp: 24, humidity: 80, ph: 6.8, rain: 80, icon: '🌱', note: 'Prefers deep black soil with moderate seasonal rain.' },
  { name: 'Wheat', n: 60, p: 38, k: 30, temp: 18, humidity: 55, ph: 6.4, rain: 65, icon: '🌾', note: 'Cool winter crop with moderate irrigation requirements.' },
  { name: 'Chickpea', n: 40, p: 68, k: 80, temp: 19, humidity: 17, ph: 7.3, rain: 80, icon: '🫘', note: 'Excellent drought resistance and low nitrogen demand.' },
  { name: 'Coffee', n: 100, p: 30, k: 30, temp: 26, humidity: 60, ph: 6.8, rain: 160, icon: '☕', note: 'Requires fertile highland soils with ample precipitation.' }
];

function runCropPredictor() {
  const n = parseFloat(document.getElementById('crop-n')?.value || 75);
  const p = parseFloat(document.getElementById('crop-p')?.value || 50);
  const k = parseFloat(document.getElementById('crop-k')?.value || 40);
  const rain = parseFloat(document.getElementById('crop-rain')?.value || 150);

  // Euclidean distance metric approximation for recommendation ranking
  const scored = cropProfiles.map(crop => {
    const dist = Math.sqrt(
      Math.pow((crop.n - n) / 40, 2) +
      Math.pow((crop.p - p) / 40, 2) +
      Math.pow((crop.k - k) / 40, 2) +
      Math.pow((crop.rain - rain) / 80, 2)
    );
    const score = Math.max(10, Math.min(99, Math.round(100 - dist * 14)));
    return { ...crop, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored[0];
  const runnerUp = scored[1];

  const resultContainer = document.getElementById('crop-sim-result');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
        <span style="font-size: 2.5rem;">${top.icon}</span>
        <div>
          <h4 style="font-size: 1.4rem; color: var(--accent-cyan); font-weight: 800;">${top.name}</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">${top.note}</p>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 10px; margin-top: 10px;">
        <span style="font-size: 0.88rem; color: var(--text-muted);">Model Confidence: <strong style="color: var(--accent-emerald);">${top.score}%</strong></span>
        <span style="font-size: 0.88rem; color: var(--text-muted);">Alternative: <strong style="color: var(--text-primary);">${runnerUp.name} (${runnerUp.score}%)</strong></span>
      </div>
    `;
  }
}

// --- 2. SLEEP DISORDER CLASSIFIER SIMULATOR ---
function runSleepClassifier() {
  const duration = parseFloat(document.getElementById('sleep-duration')?.value || 6.2);
  const heartRate = parseFloat(document.getElementById('sleep-hr')?.value || 76);
  const stress = parseFloat(document.getElementById('sleep-stress')?.value || 7);
  const steps = parseFloat(document.getElementById('sleep-steps')?.value || 4500);

  let diagnosis = 'None (Normal & Healthy Sleep Pattern)';
  let confidence = 93.5;
  let severityClass = 'emerald-text';
  let badgeIcon = '✅';
  let details = 'Physiological signals indicate balanced REM, deep sleep cycles, and low cardiovascular strain.';

  if (duration < 5.5 && stress >= 6 && heartRate > 74) {
    diagnosis = 'Insomnia';
    confidence = Math.min(98.4, 88 + (stress * 1.1));
    severityClass = 'cyan-text';
    badgeIcon = '⚠️';
    details = 'High sympathetic arousal detected. Decreased sleep duration combined with elevated resting HR indicates delayed sleep onset.';
  } else if (heartRate > 80 || (duration < 6.5 && steps < 4000 && stress >= 7)) {
    diagnosis = 'Sleep Apnea (OSA Risk)';
    confidence = Math.min(97.2, 89 + (heartRate * 0.08));
    severityClass = 'cyan-text';
    badgeIcon = '🚨';
    details = 'Polysomnography markers show repeated nocturnal awakenings, high AHI proxy index, and intermittent oxygen desaturation.';
  }

  const resultContainer = document.getElementById('sleep-sim-result');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 10px;">
        <span style="font-size: 2rem;">${badgeIcon}</span>
        <div>
          <h4 style="font-size: 1.25rem; font-weight: 800;" class="${severityClass}">${diagnosis}</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary);">${details}</p>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 10px; margin-top: 10px;">
        <span style="font-size: 0.84rem; color: var(--text-muted);">Ensemble Accuracy: <strong style="color: var(--accent-cyan);">${confidence.toFixed(1)}%</strong></span>
        <span style="font-size: 0.84rem; color: var(--text-muted);">Classifiers: <strong>Random Forest + XGBoost</strong></span>
      </div>
    `;
  }
}

// --- 3. AWS CLOUD ARCHITECTURE SIMULATION ---
function runAwsWorkflow() {
  const steps = [
    { id: 'aws-step-1', text: 'EC2 Auth: Verifying JWT & IAM role...', duration: 250 },
    { id: 'aws-step-2', text: 'S3 Multipart: Encrypted bucket upload complete (AES-256)...', duration: 400 },
    { id: 'aws-step-3', text: 'Lambda Trigger: Generating image thumbnails & metadata...', duration: 350 },
    { id: 'aws-step-4', text: 'RDS MySQL: Record indexed and distributed successfully!', duration: 300 }
  ];

  const logBox = document.getElementById('aws-live-log');
  if (!logBox) return;

  logBox.innerHTML = '<span style="color: var(--accent-cyan);">🚀 Initializing AWS Distributed Pipeline...</span><br>';
  
  steps.forEach((step, index) => {
    setTimeout(() => {
      const node = document.getElementById(step.id);
      if (node) {
        node.style.borderColor = 'var(--accent-emerald)';
        node.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
      }
      logBox.innerHTML += `<span style="color: #a5b4fc;">[+${index * 300 + 100}ms]</span> ${step.text}<br>`;
      logBox.scrollTop = logBox.scrollHeight;

      if (index === steps.length - 1) {
        logBox.innerHTML += '<span style="color: var(--accent-emerald); font-weight: 700;">✔ Pipeline Completed: File available with signed CloudFront URL.</span>';
      }
    }, (index + 1) * 450);
  });
}

// Attach listeners on load
document.addEventListener('DOMContentLoaded', () => {
  // Crop inputs
  ['crop-n', 'crop-p', 'crop-k', 'crop-rain'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        const valEl = document.getElementById(id + '-val');
        if (valEl) valEl.textContent = e.target.value;
        runCropPredictor();
      });
    }
  });

  // Sleep inputs
  ['sleep-duration', 'sleep-hr', 'sleep-stress', 'sleep-steps'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        const valEl = document.getElementById(id + '-val');
        if (valEl) valEl.textContent = e.target.value;
        runSleepClassifier();
      });
    }
  });
});
