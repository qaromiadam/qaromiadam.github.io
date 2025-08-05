let fedMeter = 0;
const maxFedMeter = 100;
const acidX = 78;
const acidY = 42;
const meterX = 42;
const meterTopY = 16;
const meterBottomY = 42;
const meterHeight = meterBottomY - meterTopY + 1;

function safeChangePixel(x, y, element) {
    if (
        x >= 0 && y >= 0 &&
        x < width && y < height &&
        pixelMap[y] &&
        pixelMap[y][x] &&
        !pixelMap[y][x].dead
    ) {
        const pixel = pixelMap[y][x];
        if (pixel.element !== element) {
            pixel.element = element;
            pixelTempCheck(pixel);
        }
    }
}

mod = {
    runAfterTick: function () {
        let human = null;
        for (const p of currentPixels) {
            if (p && p.element === "hungry_human") {
                human = p;
                break;
            }
        }

        if (human && human.x === acidX && human.y === acidY) {
            fedMeter = Math.min(fedMeter + 10, maxFedMeter);
        } else {
            fedMeter = Math.max(fedMeter - 1, 0);
        }

        const fillRatio = fedMeter / maxFedMeter;
        const filledHeight = Math.floor(meterHeight * fillRatio);
        let color = "green";
        if (fedMeter >= maxFedMeter || fedMeter <= maxFedMeter * 0.2) {
            color = "red";
        }

        for (let y = meterTopY; y <= meterBottomY; y++) {
            safeChangePixel(meterX, y, "gray");
        }

        for (let i = 0; i < filledHeight; i++) {
            const y = meterBottomY - i;
            safeChangePixel(meterX, y, color);
        }
    }
};
