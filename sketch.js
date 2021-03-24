let width = 600;
let height = 600;
let data = [];
let w = 5;
let nums = 0;
let low;
let high;

function setup() {
  createCanvas(width, height);
  nums = floor(width / w);
  for (let i = 0; i < nums; i++) {
    data.push(floor(random(1) * height));
  }
  qs(0, data.length);
}

function draw() {
  draw_bar();
}

function draw_bar() {
  background(51);
  for (let i = 0; i < nums; i++) {
    if (i >= low && i <= high) {
      fill(0, 255, 0);
    } else {
      fill(255);
    }
    rect(i * w, height - data[i], w, data[i]);
  }
}

async function partition(l, h) {
  var pivot = data[l];
  var i = l;
  var j = h;
  while (i < j) {
    do {
      i++;
    } while (data[i] <= pivot);
    do {
      j--;
    } while (data[j] > pivot);
    if (i < j) {
      await swap(i, j);
    }
  }
  await swap(j, l);

  return j;
}
async function qs(l, h) {
  low = l;
  high = h;
  if (l < h) {
    var j = await partition(l, h);
    await qs(l, j);
    await qs(j + 1, h);
  }
}

async function swap(a, b) {
  await sleep(200);
  var temp = data[a];
  data[a] = data[b];
  data[b] = temp;
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
