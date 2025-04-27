function showTab(tab) {
    document.getElementById("checker").classList.add("hidden");
    document.getElementById("generator").classList.add("hidden");
    document.getElementById("checkerBtn").classList.remove("active");
    document.getElementById("generatorBtn").classList.remove("active");
  
    document.getElementById(tab).classList.remove("hidden");
    document.getElementById(tab + "Btn").classList.add("active");
  }
  
  
  // Password strength checker (now 4 segments)
  function checkStrength() {
    const pwd = document.getElementById("passwordInput").value;
    const segs = [
      document.getElementById("seg1"),
      document.getElementById("seg2"),
      document.getElementById("seg3"),
      document.getElementById("seg4")
    ];
    const text = document.getElementById("strengthText");
  
    // calculate strength 0–4
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
  
    // colors & labels
    const colors = ["#ddd", "#e74c3c", "#f39c12", "#27ae60", "#2ecc71"];
    const labels = ["", "Weak", "Fair", "Strong", "Very Strong"];
  
    // update segments
    segs.forEach((seg, i) => {
      // fill all segments up to score with the final color
      seg.style.backgroundColor = i < score ? colors[score] : colors[0];
    });
  
    // update text
    text.innerText = labels[score];
    text.style.color = colors[score] || "#fff";
  }
  
  // wire up live checking
  document.getElementById("passwordInput")
          .addEventListener("input", checkStrength);
  
  
  // Password generator (unchanged)
  function generatePassword() {
    const length = +document.getElementById("length").value;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeNumbers   = document.getElementById("numbers").checked;
    const includeSymbols   = document.getElementById("symbols").checked;
  
    const lower   = "abcdefghijklmnopqrstuvwxyz";
    const upper   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
    let chars = lower;
    if (includeUppercase) chars += upper;
    if (includeNumbers)   chars += numbers;
    if (includeSymbols)   chars += symbols;
  
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    document.getElementById("generatedPassword").value = pwd;
    document.getElementById("lengthDisplay").innerText = length;
  }
  
  // initial run
  window.addEventListener("DOMContentLoaded", () => {
    generatePassword();
    checkStrength();
  });  
