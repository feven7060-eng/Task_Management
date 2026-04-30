function drawSparkline(canvas, values, color) {
  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * 2;
  canvas.height = height * 2;
  ctx.scale(2, 2);

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = width / (values.length - 1);

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  values.forEach((value, index) => {
    const x = step * index;
    const y = height - ((value - min) / span) * (height - 4) - 2;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

function drawCostChart(canvas) {
  const ctx = canvas.getContext("2d");
  const budget = [400, 450, 510, 560, 610, 670, 730, 800];
  const actual = [360, 410, 470, 520, 600, 690, 740, 790];
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const tooltip = document.createElement("div");
  tooltip.className = "chart-tooltip";
  tooltip.style.display = "none";
  document.body.appendChild(tooltip);

  function render(activeIndex = -1) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(2, 2);

    const min = 300;
    const max = 850;
    const pad = 22;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;
    const step = plotW / (budget.length - 1);

    function yMap(v) {
      return pad + plotH - ((v - min) / (max - min)) * plotH;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i += 1) {
      const y = pad + (plotH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(width - pad, y);
      ctx.stroke();
    }

    function draw(data, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = pad + step * i;
        const y = yMap(v);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    draw(budget, "#06b6d4");
    draw(actual, "#8b5cf6");

    if (activeIndex >= 0) {
      const x = pad + step * activeIndex;
      const yBudget = yMap(budget[activeIndex]);
      const yActual = yMap(actual[activeIndex]);

      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, pad);
      ctx.lineTo(x, height - pad);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#06b6d4";
      ctx.beginPath();
      ctx.arc(x, yBudget, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#8b5cf6";
      ctx.beginPath();
      ctx.arc(x, yActual, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function getNearestIndex(clientX) {
    const rect = canvas.getBoundingClientRect();
    const width = canvas.clientWidth;
    const pad = 22;
    const plotW = width - pad * 2;
    const step = plotW / (budget.length - 1);
    const x = Math.max(pad, Math.min(width - pad, clientX - rect.left));
    return Math.round((x - pad) / step);
  }

  canvas.addEventListener("mousemove", (event) => {
    const index = getNearestIndex(event.clientX);
    render(index);
    tooltip.style.display = "block";
    tooltip.textContent = `${labels[index]}  Budget: ${budget[index]}M  Actual: ${actual[index]}M`;
    tooltip.style.left = `${event.clientX + 12}px`;
    tooltip.style.top = `${event.clientY - 28}px`;
    canvas.style.cursor = "crosshair";
  });

  canvas.addEventListener("mouseleave", () => {
    render(-1);
    tooltip.style.display = "none";
    canvas.style.cursor = "default";
  });

  render(-1);
}

function drawBarChart(canvas) {
  const ctx = canvas.getContext("2d");
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * 2;
  canvas.height = h * 2;
  ctx.scale(2, 2);

  const inflow = [500, 530, 540, 560, 590, 690, 620];
  const outflow = [430, 470, 480, 510, 520, 560, 500];
  const max = 750;
  const barW = 12;
  const gap = 14;
  const startX = 18;
  const baseY = h - 18;

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
  for (let i = 0; i < 4; i += 1) {
    const y = 18 + i * ((h - 36) / 3);
    ctx.beginPath();
    ctx.moveTo(8, y);
    ctx.lineTo(w - 8, y);
    ctx.stroke();
  }

  inflow.forEach((value, i) => {
    const x = startX + i * (barW * 2 + gap);
    const h1 = ((value / max) * (h - 40));
    const h2 = ((outflow[i] / max) * (h - 40));
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(x, baseY - h1, barW, h1);
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(x + barW + 4, baseY - h2, barW, h2);
  });
}

function animateBudgetDonut() {
  const donut = document.querySelector(".donut");
  if (!donut) return;

  let start = null;
  const duration = 1200;

  function step(timestamp) {
    if (start === null) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    donut.style.setProperty("--fill", progress.toFixed(3));
    if (progress < 1) requestAnimationFrame(step);
  }

  donut.style.setProperty("--fill", "0");
  requestAnimationFrame(step);
}

document.querySelectorAll(".sparkline").forEach((canvas) => {
  const values = (canvas.dataset.values || "")
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => !Number.isNaN(value));
  const color = canvas.dataset.color || "#3b82f6";
  if (values.length > 1) drawSparkline(canvas, values, color);
});

const costChart = document.querySelector("#costChart");
if (costChart) drawCostChart(costChart);
const barChart = document.querySelector("#barChart");
if (barChart) drawBarChart(barChart);
animateBudgetDonut();

const shell = document.querySelector(".dash-shell");
const menuToggle = document.querySelector("#menuToggle");
if (shell && menuToggle) {
  menuToggle.addEventListener("click", () => {
    shell.classList.toggle("sidebar-open");
  });
}
