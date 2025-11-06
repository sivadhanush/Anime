import "./style.css";
import baseSvg from "/base.svg";
import starSvg from "/star.svg";
import textSvg from "/text.svg";

const FRAMES = 4; // 0,1,2,3

document.querySelector("#app").innerHTML = `
  <div class="animation-container">
    <div class="grouped-elements">
      <img src="${starSvg}" class="star" alt="Star" />
      <div class="base-wrapper">
        <img src="${baseSvg}" class="base" alt="Base" />
        // <div class="base-fill"></div>
      </div>
    </div>
    <img src="${textSvg}" class="text" alt="Text" />
  </div>
  <div class="controls" style="margin-bottom:16px;">
    <label>
      <input type="checkbox" id="loop" checked /> Loop
    </label>
    <button id="restart">Restart</button>
    <input type="range" id="timeline" min="0" max="${
      FRAMES - 1
    }" step="1" value="0" style="width:200px;vertical-align:middle;">
    <span id="frame-label">Frame: 0</span>
  </div>
`;
let currentFrame = 0;
let animTimeouts = [];
let isLooping = true;

function setFrame(frame) {
  currentFrame = frame;
  document.getElementById("timeline").value = frame;
  document.getElementById("frame-label").textContent = `Frame: ${frame}`;

  const star = document.querySelector(".star");
  const baseFill = document.querySelector(".base-fill");
  const grouped = document.querySelector(".grouped-elements");
  const text = document.querySelector(".text");
  const container = document.querySelector(".animation-container");

  // Reset all classes
  star.className = "star";
  baseFill.className = "base-fill";
  grouped.className = "grouped-elements";
  text.className = "text";
  container.className = "animation-container";

  // Apply classes based on frame
  if (frame >= 1) {
    star.classList.add("animate-star");
    baseFill.classList.add("fill-animate");
  }
  if (frame >= 2) {
    grouped.classList.add("move-up");
    star.classList.add("grow");
    text.classList.add("reveal");
  }
  if (frame >= 3) {
    container.classList.add("fade-out");
  }
}

function clearAnimTimeouts() {
  animTimeouts.forEach((t) => clearTimeout(t));
  animTimeouts = [];
}

function playAnimation() {
  setFrame(0);
  clearAnimTimeouts();
  animTimeouts.push(setTimeout(() => setFrame(1), 100));
  animTimeouts.push(setTimeout(() => setFrame(2), 1000));
  animTimeouts.push(setTimeout(() => setFrame(3), 2500));
  animTimeouts.push(
    setTimeout(() => {
      if (isLooping) location.reload();
    }, 3200)
  );
}

document.getElementById("loop").addEventListener("change", (e) => {
  isLooping = e.target.checked;
});

document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});

document.getElementById("timeline").addEventListener("input", (e) => {
  clearAnimTimeouts();
  setFrame(Number(e.target.value));
});

window.addEventListener("load", playAnimation);
