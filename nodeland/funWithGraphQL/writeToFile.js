let fs = require("fs");

var fakeData = [[{ name: "apple" }, { name: "andesite" }, { name: "ardor" }, { name: "armor" }, { name: "actress" }, { name: "alpaca" }, { name: "Antwerp" }, { name: "ambiguous" }, { name: "alteration" }, { name: "acrimony" }],
[{ name: "bonobo" }, { name: "baker" }, { name: "banana" }, { name: "bun" }, { name: "borage" }, { name: "Bend" }, { name: "balloon" }, { name: "bottle" }, { name: "brake" }, { name: "break" }],
[{ name: "camber" }, { name: "cause" }, { name: "cayman" }, { name: "cereal" }, { name: "center" }, { name: "crow" }, { name: "crane" }, { name: "cone" }, { name: "core" }, { name: "cure" }],
[{ name: "day" }, { name: "denizen" }, { name: "derilect" }, { name: "detain" }, { name: "detract" }, { name: "dorsal" }, { name: "Dortmund" }, { name: "dory" }, { name: "doting" }, { name: "doyen" }],
[{ name: "ebb" }, { name: "echo" }, { name: "ectomorph" }, { name: "Ediacaran" }, { name: "eel" }, { name: "effect" }, { name: "ego" }, { name: "elbow" }, { name: "empty" }, { name: "end" }],
[{ name: "farthing" }, { name: "facile" }, { name: "farm" }, { name: "fen" }, { name: "fern" }, { name: "fester" }, { name: "frog" }, { name: "foundation" }, { name: "fur" }, { name: "Freiburg" }],
];

const roll_n_SidedDie = (n) => { return Math.floor(Math.random() * n) }

let fakeName = () => {
    return fakeData[roll_n_SidedDie(6)][roll_n_SidedDie(10)].name
};

function generateData(count, fileName = 'objects.txt') {
    var someObjects = [];
    var fileStream = fs.createWriteStream(fileName);
    fileStream.write("[\n");
    for (var i = 0; i < count; i++) {
        var someName = fakeName();
        var obj = {
            name: someName,
            price: `\$${(Math.random() * 50).toFixed(2)}`,
            assets: [4.25, 1.73]
        }
        fileStream.write(JSON.stringify(obj) + `${i !== count - 1 ? ',' : ''}\n`);
    }
    fileStream.write("]\n");
    fileStream.close();
}

generateData(100);