# Shaik Moushik — Personal Developer Portfolio

An ultra-modern, high-performance portfolio website crafted with semantic HTML5, pure CSS3 design systems, and modular vanilla JavaScript.

![Portfolio Preview](assets/images/moushik-avatar.jpg)

## 🌟 Key Features

- **Futuristic Glassmorphic Dark & Light Theme**: Seamless toggle with local storage persistence and fluid transitions.
- **Dynamic Interactive Background Canvas**: Real-time particle constellation with gentle cursor repulsion.
- **Interactive Project Simulators**:
  - 🌱 **Crop Recommendation AI Simulator**: Adjust soil N-P-K nutrient sliders and rainfall to see live algorithmic crop suitability ranking.
  - 🩺 **Sleep Disorder Classifier Demo**: Adjust sleep duration, heart rate, and stress to view real-time Random Forest / XGBoost predictions with confidence scoring.
  - ☁️ **AWS Distributed Architecture Visualizer**: Live animated telemetry simulating multi-part upload through S3, EC2, Lambda thumbnailing, and RDS MySQL database persistence.
- **Interactive ATS Resume Modal**: Built-in formatted resume with instant one-click **"Print / Save as PDF"** functionality with clean print stylesheet.
- **One-Click Quick Copy**: Instant copy-to-clipboard for email (`itsmoushikshaik@gmail.com`) and phone (`+91 90141 67767`) with dynamic toast notifications.
- **Zero Build Dependencies**: Pure HTML/CSS/JS that works immediately upon double-clicking `index.html` or deploying to GitHub Pages, Netlify, or Vercel.

---

## 📁 Project Structure

```text
my portfolio/
├── index.html               # Main single-page application
├── css/
│   ├── style.css            # Custom CSS design tokens, components, responsive grid
│   └── print.css            # Specialized print stylesheet for clean ATS resume output
├── js/
│   ├── main.js              # Theme switcher, typewriter, modal logic, contact form
│   ├── canvas-bg.js         # Interactive background constellation canvas
│   └── project-demos.js     # Live interactive project simulators
├── assets/
│   ├── images/              # High-definition visual cards & avatar
│   │   ├── moushik-avatar.jpg
│   │   ├── crop-ai.jpg
│   │   ├── sleep-disorder.jpg
│   │   └── aws-storage.jpg
│   └── favicon.svg          # Custom glowing SVG favicon
├── package.json             # Optional dev server scripts
└── README.md                # Project documentation
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening (No Install Needed)
Simply double click `index.html` in your file explorer to open it in your default web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Using Node / npx
```bash
npm run dev
# or
npx serve -l 3000 .
```
Then open `http://localhost:3000` in your browser.

### Option 3: Using Python
```bash
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## 🌐 Free 1-Click Deployment to GitHub Pages

1. Initialize git in this directory (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Create a repository on GitHub named `moushikshaik.github.io` (or any repository name).
3. Push your code:
   ```bash
   git remote add origin https://github.com/moushikshaik/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Settings > Pages** on your GitHub repo, select the `main` branch, and click **Save**. Your site will be live instantly!

---

## 📬 Contact Information

- **Name:** Shaik Moushik
- **Email:** [itsmoushikshaik@gmail.com](mailto:itsmoushikshaik@gmail.com)
- **Phone:** [+91 90141 67767](tel:+919014167767)
- **LinkedIn:** [linkedin.com/in/moushik-shaik-060b96373](https://linkedin.com/in/moushik-shaik-060b96373)
- **GitHub:** [github.com/moushikshaik](https://github.com/moushikshaik)
- **Location:** Nellore, Andhra Pradesh, India
