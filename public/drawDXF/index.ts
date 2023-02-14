const Drawing = require("dxf-writer");
const fs = require("fs");
const path_a = require("path");

const DrawDXF = () => {
    let d = new Drawing();

    d.setUnits("Decimeters");
    d.drawText(10, 0, 10, 0, "Hello World"); // draw text in the default layer named "0"

    // separate
    d.addLayer("l_green", Drawing.ACI.GREEN, "CONTINUOUS");
    d.setActiveLayer("l_green");
    d.drawText(20, -70, 10, 0, "go green!");

    //or fluent
    d.addLayer("l_yellow", Drawing.ACI.YELLOW, "DOTTED")
        .setActiveLayer("l_yellow")
        .drawCircle(50, -30, 25);

    const filePath = path_a.join(__dirname, getRandomStr() + ".dxf");
    console.log(11, filePath);

    fs.writeFileSync(filePath, d.toDxfString());
};

const getRandomStr = (n = 6) => {
    let str = "";
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (let i = 0; i < n; i += 1) {
        str += chars.charAt(Math.floor(Math.random() * 62));
    }
    return str;
};

module.exports = DrawDXF;
