import sharp from 'sharp';

const COLOR_TOLERANCE = 68;
const EDGE_FEATHER = 18;

function colorDistance(red, green, blue, target) {
  const dr = red - target[0];
  const dg = green - target[1];
  const db = blue - target[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function getBorderColor(data, width, height, channels) {
  const bins = new Uint32Array(4096);
  const step = Math.max(1, Math.floor(Math.min(width, height) / 250));
  const sample = (x, y) => {
    const offset = (y * width + x) * channels;
    if (channels === 4 && data[offset + 3] < 250) return;
    const bucket = ((data[offset] >> 4) << 8) | ((data[offset + 1] >> 4) << 4) | (data[offset + 2] >> 4);
    bins[bucket] += 1;
  };

  for (let x = 0; x < width; x += step) {
    sample(x, 0);
    sample(x, height - 1);
  }
  for (let y = step; y < height - 1; y += step) {
    sample(0, y);
    sample(width - 1, y);
  }

  let dominant = 0;
  for (let index = 1; index < bins.length; index += 1) {
    if (bins[index] > bins[dominant]) dominant = index;
  }

  return [((dominant >> 8) & 15) * 16 + 8, ((dominant >> 4) & 15) * 16 + 8, (dominant & 15) * 16 + 8];
}

export async function removeSolidImageBackground(input) {
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const background = getBorderColor(data, width, height, channels);
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = new Uint32Array(total);
  let head = 0;
  let tail = 0;

  const enqueue = (index) => {
    if (visited[index]) return;
    visited[index] = 1;
    const offset = index * channels;
    if (data[offset + 3] >= 16 && colorDistance(data[offset], data[offset + 1], data[offset + 2], background) > COLOR_TOLERANCE) return;
    queue[tail] = index;
    tail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head];
    head += 1;
    const x = index % width;
    if (x > 0) enqueue(index - 1);
    if (x + 1 < width) enqueue(index + 1);
    if (index >= width) enqueue(index - width);
    if (index + width < total) enqueue(index + width);
  }

  for (let cursor = 0; cursor < tail; cursor += 1) {
    const offset = queue[cursor] * channels;
    const distance = colorDistance(data[offset], data[offset + 1], data[offset + 2], background);
    const alpha = Math.max(0, Math.min(1, (distance - EDGE_FEATHER) / (COLOR_TOLERANCE - EDGE_FEATHER)));
    data[offset + 3] = Math.round(data[offset + 3] * alpha);
  }

  return sharp(data, { raw: info }).png().toBuffer();
}
