const fileInput = document.getElementById('file-picker')
const canvas = document.getElementById('image-canvas')
const ctx = canvas.getContext('2d')
const downloadLink = document.getElementById('download');
const copyButton = document.getElementById('copy');

var textToCopy = '';

const emojis = [
    { emoji: '😀', color: [255, 223, 85] },      // yellow face
    { emoji: '😁', color: [254, 223, 85] },      // yellow face (slightly different)
    { emoji: '😂', color: [255, 222, 85] },      // yellow face (slightly different)
    { emoji: '😅', color: [255, 223, 84] },      // yellow face (slightly different)
    { emoji: '😉', color: [254, 222, 84] },      // yellow face (slightly different)
    { emoji: '😊', color: [253, 223, 86] },      // yellow face (slightly different)
    { emoji: '😍', color: [255, 224, 85] },      // yellow face (slightly different)
    { emoji: '😎', color: [255, 223, 86] },      // yellow face (slightly different)
    { emoji: '🤔', color: [254, 224, 85] },      // yellow face (slightly different)
    { emoji: '🙄', color: [255, 222, 86] },      // yellow face (slightly different)
    { emoji: '😢', color: [135, 206, 235] },     // blue tears
    { emoji: '😡', color: [255, 99, 71] },       // red face
    { emoji: '❤️', color: [220, 20, 60] },       // red heart
    { emoji: '💖', color: [255, 182, 193] },     // pink heart
    { emoji: '💚', color: [60, 179, 113] },      // green heart
    { emoji: '💙', color: [65, 105, 225] },      // blue heart
    { emoji: '⭐', color: [255, 215, 0] },        // gold star
    { emoji: '🔥', color: [255, 87, 34] },       // orange/red fire
    { emoji: '🌟', color: [255, 255, 102] },     // yellow star
    { emoji: '🌸', color: [255, 182, 192] },     // pink flower (slightly different)
    { emoji: '🌼', color: [255, 255, 101] },     // yellow flower (slightly different)
    { emoji: '🍎', color: [220, 20, 61] },       // red apple (slightly different)
    { emoji: '🍋', color: [255, 247, 1] },       // yellow lemon (slightly different)
    { emoji: '🍓', color: [255, 0, 81] },        // red strawberry (slightly different)
    { emoji: '🍊', color: [255, 165, 1] },       // orange (slightly different)
    { emoji: '🍇', color: [128, 0, 129] },       // purple grapes (slightly different)
    { emoji: '🍉', color: [255, 105, 181] },     // pink watermelon (slightly different)
    { emoji: '🌊', color: [64, 164, 224] },      // blue wave (slightly different)
    { emoji: '🌵', color: [34, 139, 35] },       // green cactus (slightly different)
    { emoji: '🌴', color: [35, 139, 34] },       // green palm (slightly different)
    { emoji: '🐶', color: [222, 184, 136] },     // brown dog (slightly different)
    { emoji: '🐱', color: [255, 222, 174] },     // light orange cat (slightly different)
    { emoji: '🐼', color: [254, 255, 255] },     // white panda (slightly different)
    { emoji: '🐸', color: [50, 205, 51] },       // green frog (slightly different)
    { emoji: '🐟', color: [100, 180, 221] },     // blue fish (slightly different)
    { emoji: '🦋', color: [138, 43, 227] },      // purple butterfly (slightly different)
    { emoji: '🎉', color: [255, 105, 179] },     // pink confetti (slightly different)
    { emoji: '🎈', color: [255, 1, 0] },         // red balloon (slightly different)
    { emoji: '⚽', color: [255, 255, 254] },     // white soccer ball (slightly different)
    { emoji: '🏀', color: [255, 140, 1] },       // orange basketball (slightly different)
    { emoji: '🖤', color: [1, 0, 0] },           // black heart (slightly different)
    { emoji: '🧡', color: [255, 140, 1] },       // orange heart (slightly different)
    { emoji: '💛', color: [255, 235, 60] },      // yellow heart (slightly different)
    { emoji: '💜', color: [155, 89, 183] },      // purple heart (slightly different)
    { emoji: '🤎', color: [121, 85, 73] },       // brown heart (slightly different)
    { emoji: '🤍', color: [245, 245, 244] },     // white heart (slightly different)
    { emoji: '💩', color: [110, 70, 41] },       // brown (poop) (slightly different)
    { emoji: '🌹', color: [221, 20, 60] },       // red rose (slightly different)
    { emoji: '🌻', color: [255, 215, 1] },       // sunflower (slightly different)
    { emoji: '🌲', color: [34, 140, 34] },       // green tree (slightly different)
    { emoji: '🌳', color: [60, 180, 113] },      // green tree (slightly different)
    { emoji: '🍏', color: [144, 238, 145] },     // green apple (slightly different)
    { emoji: '🍒', color: [222, 49, 100] },      // cherry (slightly different)
    { emoji: '🍑', color: [255, 160, 123] },     // peach (slightly different)
    { emoji: '🥑', color: [136, 176, 76] },      // avocado (slightly different)
    { emoji: '🥕', color: [255, 140, 41] },      // carrot (slightly different)
    { emoji: '🥦', color: [85, 108, 47] },       // broccoli (slightly different)
    { emoji: '🥔', color: [222, 184, 136] },     // potato (slightly different)
    { emoji: '🥚', color: [255, 255, 241] },     // egg (slightly different)
    { emoji: '🥥', color: [210, 181, 140] },     // coconut (slightly different)
    { emoji: '🍞', color: [245, 222, 180] },     // bread (slightly different)
    { emoji: '🍪', color: [210, 181, 140] },     // cookie (slightly different)
    { emoji: '🍯', color: [255, 223, 71] },      // honey (slightly different)
    { emoji: '🍵', color: [205, 255, 206] },     // green tea (slightly different)
    { emoji: '🍺', color: [255, 215, 1] },       // beer (slightly different)
    { emoji: '🍫', color: [123, 63, 1] },        // chocolate (slightly different)
    { emoji: '🦜', color: [0, 191, 254] },       // blue/yellow parrot (slightly different)
    { emoji: '🦚', color: [0, 206, 210] },       // turquoise peacock (slightly different)
    { emoji: '🦩', color: [255, 182, 194] },     // pink flamingo (slightly different)
    { emoji: '🦀', color: [255, 69, 1] },        // red crab (slightly different)
    { emoji: '🦑', color: [255, 99, 72] },       // tomato red squid (slightly different)
    { emoji: '🦒', color: [218, 165, 33] },      // yellow giraffe (slightly different)
    { emoji: '🦓', color: [221, 220, 220] },     // gray zebra (slightly different)
    { emoji: '🦔', color: [139, 69, 20] },       // brown hedgehog (slightly different)
    { emoji: '🦦', color: [160, 83, 45] },       // brown otter (slightly different)
    { emoji: '🦭', color: [176, 197, 222] },     // light blue seal (slightly different)
    { emoji: '🦢', color: [255, 254, 255] },     // white swan (slightly different)
]

const heartsOnly = [
    { emoji: '❤️', color: [220, 20, 60] },
    { emoji: '💖', color: [255, 182, 193] },
    { emoji: '💚', color: [60, 179, 113] },
    { emoji: '💙', color: [65, 105, 225] },
    { emoji: '💛', color: [255, 235, 60] },
    { emoji: '💜', color: [155, 89, 183] },
    { emoji: '🤎', color: [121, 85, 73] },
    { emoji: '🖤', color: [0, 0, 0] },
    { emoji: '🤍', color: [255, 255, 255] },
    { emoji: '💓', color: [255, 0, 151] },
]

const flowers = [
    { emoji: '🌸', color: [255, 182, 193] },      // cherry blossom pink
    { emoji: '🌹', color: [220, 20, 60] },        // rose red
    { emoji: '🌺', color: [255, 105, 180] },      // hibiscus pink
    { emoji: '🌻', color: [255, 215, 0] },        // sunflower yellow
    { emoji: '🌼', color: [255, 255, 150] },      // blossom yellow/white
    { emoji: '💮', color: [248, 248, 248] },      // white flower
    { emoji: '🏵️', color: [255, 165, 0] },        // rosette orange
    { emoji: '🌷', color: [255, 20, 147] },       // tulip pink
    { emoji: '💐', color: [255, 140, 180] },      // bouquet mixed/pink
    { emoji: '🥀', color: [139, 69, 19] },        // wilted flower brown
    { emoji: '🌱', color: [124, 252, 0] },        // seedling light green
    { emoji: '🪷', color: [219, 112, 147] },      // lotus pink/purple
    { emoji: '🪻', color: [138, 43, 226] },       // hyacinth purple
    { emoji: '🌿', color: [60, 179, 113] },       // herb green
    { emoji: '☘️', color: [46, 139, 87] },        // shamrock green
    { emoji: '🍀', color: [50, 205, 50] },        // four leaf clover green
    { emoji: '🪴', color: [34, 139, 34] },        // potted plant green
    { emoji: '🌵', color: [0, 128, 0] },          // cactus green
    { emoji: '🌾', color: [240, 230, 140] },      // sheaf of rice khaki
    { emoji: '🌲', color: [0, 100, 0] },          // evergreen tree dark green
    { emoji: '🌳', color: [107, 142, 35] },       // deciduous tree olive green
    { emoji: '🌴', color: [85, 107, 47] },        // palm tree dark olive green
    { emoji: '🍂', color: [205, 133, 63] },       // fallen leaf brown
    { emoji: '🍃', color: [144, 238, 144] },      // leaf fluttering light green
    { emoji: '🍁', color: [178, 34, 34] },        // maple leaf red
]

// fileInput.addEventListener('change', handleFileInput);

async function copyText() {
    await navigator.clipboard.writeText(textToCopy);
    alert('Copied to clipboard!');
}

function handleFileInput() {
    const file = fileInput.files[0]
    if (!file) {
        alert('Please select a file');
        return;
    }
    const img = new Image()
    img.onload = () => convertToEmojis(img);
    img.src = URL.createObjectURL(file);
}

function updateProgress(val) {
    let progressbar = document.getElementById('progress');
    progressbar.style.width = `${val * 100}%`;
    progressbar.innerText = `${Math.floor(val * 100)}%`;
}

async function convertToEmojis(img) {
    textToCopy = '';
    copyButton.ariaDisabled = true;
    copyButton.classList.remove('animated-btn');
    downloadLink.ariaDisabled = true;
    downloadLink.classList.remove('animated-btn');
    canvas.style.display = 'none';
    console.log('converting');
    let upscale = document.getElementById('upscale-factor').value;
    let blockSize = document.getElementById('blocksize').value;

    if (upscale < 1) {
        upscale = 1;
    }
    if (blockSize < 1) {
        blockSize = 1;
    }
    if (blockSize < 5) {
        alert('Block size too small, may impact performance');
    }

    if (img.width > 3000 || img.height > 3000) {
        alert('Image too large. May impact Performance. If conversion fails, try a smaller upscale factor.');
    }

    console.log(`upscale: ${upscale}, blockSize: ${blockSize}`);
    const h = Math.floor((img.height * upscale) / blockSize);
    const w = Math.floor((img.width * upscale) / blockSize);

    canvas.width = w * blockSize;
    canvas.height = h * blockSize;

    ctx.font = `${blockSize}px "Noto Color Emoji"`;
    ctx.textBaseline = 'top';

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (let y = 0; y < h; y++) {
        updateProgress(y / h);

        for (let x = 0; x < w; x++){
            const data = ctx.getImageData(x * blockSize, y * blockSize, blockSize, blockSize).data;
            let avg = getAvgColor(data);

            const {emoji} = findNearestEmoji(avg);
            ctx.clearRect(x * blockSize, y * blockSize, blockSize, blockSize);
            ctx.fillText(emoji, x * blockSize, y * blockSize);
            textToCopy += emoji;
        }

        if (y % 5 === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }
        textToCopy += '\n';
    }
    updateProgress(1);
    canvas.style.display = 'block';

    canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });

    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.ariaDisabled = false;
    downloadLink.classList.add('animated-btn');
    copyButton.ariaDisabled = false;
    copyButton.classList.add('animated-btn');

    // console.log('textToCopy', textToCopy);

    // console.log(canvas.toDataURL('image/png'));
    // console.log('url set')
}

function getAvgColor(data) {
    const avg = [0, 0, 0];
    for (let i = 0; i < data.length; i += 4) {
        avg[0] += data[i];
        avg[1] += data[i + 1];
        avg[2] += data[i + 2];
    }

    avg[0] /= (data.length / 4);
    avg[1] /= (data.length / 4);
    avg[2] /= (data.length / 4);
    return avg;
}

function findNearestEmoji(rgb) {
    const mode = document.getElementById('mode').value;
    let emoji_type = emojis; //todo: optimize this (move this check to convertToEmojis)
    if (mode === 'hearts') {
        emoji_type = heartsOnly;
    } else if (mode === 'flowers') {
        emoji_type = flowers;
    }
    let best = emoji_type[0];
    let minDist = Infinity;

    for (const item of emoji_type) {
        const d = distance(rgb, item.color);
        if (d < minDist) {
            minDist = d;
            best = item;
        }
    }

    return best;
}

function distance(a, b) {
    // console.log(`${a},${b}`)
    return Math.sqrt((a[0] - b[0])**2 + (a[1] - b[1])**2 + (a[2] - b[2])**2)
}