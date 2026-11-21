const canvas = document.querySelector('#bridge');
const ink = canvas.getContext('2d');
const { width, height } = canvas;

function shape(color, points) {
  ink.fillStyle = color;
  ink.beginPath();
  ink.moveTo(...points[0]);
  for (const point of points.slice(1)) ink.lineTo(...point);
  ink.closePath();
  ink.fill();
}

function line(color, thickness, points) {
  ink.strokeStyle = color;
  ink.lineWidth = thickness;
  ink.beginPath();
  ink.moveTo(...points[0]);
  for (const point of points.slice(1)) ink.lineTo(...point);
  ink.stroke();
}

function disc(x, y, radius, color) {
  ink.fillStyle = color;
  ink.beginPath();
  ink.arc(x, y, radius, 0, 2 * Math.PI);
  ink.fill();
}

let seed = 20112026;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}

const sky = ink.createLinearGradient(62, 0, 946, 188);
sky.addColorStop(0, '#172a44');
sky.addColorStop(.36, '#4c6875');
sky.addColorStop(.65, '#a69b7e');
sky.addColorStop(1, '#dfb778');
ink.fillStyle = sky;
ink.fillRect(0, 0, width, height);

disc(783, 99, 61, '#f6cc70');
ink.save();
ink.beginPath();
ink.arc(783, 99, 61, 0, Math.PI * 2);
ink.clip();
for (let y = 57; y < 166; y += 6) {
  line('#e5b262', 1, [[711, y], [858, y - 1]]);
}
ink.restore();

shape('#887e6d', [[421, 183], [514, 148], [584, 153], [618, 132], [652, 148], [703, 114], [730, 139], [755, 126], [801, 160], [850, 146], [905, 166], [952, 146], [952, 203], [421, 203]]);
shape('#b18b63', [[486, 190], [540, 168], [608, 175], [673, 157], [711, 171], [765, 160], [838, 184], [881, 167], [952, 174], [952, 207], [486, 207]]);
shape('#4d5f62', [[0, 161], [102, 155], [169, 170], [208, 154], [274, 149], [359, 166], [414, 157], [504, 176], [615, 177], [659, 190], [0, 217]]);

for (let x = 3; x < 525; x += 10 + random() * 13) {
  const rooftop = 153 + random() * 27;
  const span = 7 + random() * 17;
  ink.fillStyle = x > 320 ? '#465959' : '#283f50';
  ink.fillRect(x, rooftop, span, 198 - rooftop);
  if (random() > .58) {
    shape('#283f50', [[x - 2, rooftop + 2], [x + span / 2, rooftop - 5], [x + span + 2, rooftop + 2]]);
  }
  ink.fillStyle = '#c6aa71';
  ink.globalAlpha = .45;
  ink.fillRect(x + 3, rooftop + 7, 1.8, 2);
  ink.globalAlpha = 1;
}

const water = ink.createLinearGradient(0, 191, 0, 280);
water.addColorStop(0, '#607e83');
water.addColorStop(1, '#183449');
ink.fillStyle = water;
ink.fillRect(0, 193, width, 91);
for (let i = 0; i < 525; i++) {
  const x = random() * width;
  const y = 194 + random() * 90;
  const warmReflection = Math.abs(783 - x) < (y - 158) * .69;
  ink.globalAlpha = .07 + random() * .23;
  line(warmReflection ? '#f6c56a' : '#bed3cc', .7 + random() * 1.2, [[x, y], [x + 3 + random() * 43, y]]);
}
ink.globalAlpha = 1;

shape('#9d674a', [[830, 183], [952, 173], [952, 247], [911, 228], [862, 211], [787, 216]]);
shape('#d1a065', [[830, 181], [952, 173], [952, 211], [914, 207], [856, 197], [787, 215]]);
shape('#f0d5a1', [[857, 180], [883, 161], [921, 167], [914, 184]]);
shape('#805b47', [[857, 180], [914, 184], [914, 193], [857, 190]]);
for (let x = 863; x < 910; x += 7) line('#211f25', 1.25, [[x, 182], [x, 188]]);

const steel = '#142737';
const deck = [[-5, 228], [557, 179], [674, 183]];
for (const [x, top, base] of [[167, 64, 264], [380, 105, 221]]) {
  const deckY = 228 - x * 49 / 557;
  for (let step = 1; step < 8; step++) {
    const run = step * (x < 200 ? 19 : 14);
    line('#e4cda2', 1.18, [[x - 4, top + step * 6], [x - run, deckY + run * 49 / 557]]);
    line('#e4cda2', 1.18, [[x + 4, top + step * 6], [x + run, deckY - run * 49 / 557]]);
  }
  shape(steel, [[x - 7, top], [x + 5, top - 2], [x + 9, base], [x - 11, base + 4]]);
  line('#b4a47f', 1.4, [[x + 4, top + 1], [x + 6, base]]);
}
line(steel, 12, deck);
line('#d4b380', 1.7, [[0, 225], [557, 175], [674, 179]]);
shape('#182f3f', [[0, 238], [46, 245], [81, 266], [105, 284], [0, 284]]);

for (let i = 0; i < 12600; i++) {
  const x = random() * width;
  const y = random() * height;
  ink.fillStyle = random() > .53 ? 'rgba(254,223,167,.12)' : 'rgba(11,28,41,.13)';
  ink.fillRect(x, y, .4 + random() * 1.7, .5 + random() * .9);
}
