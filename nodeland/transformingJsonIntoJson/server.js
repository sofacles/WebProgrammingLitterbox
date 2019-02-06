let http = require('http')

http.createServer((req, res) => {
    if (req.method == 'POST') {
        var body = '';
        req.on('data', chunk => {
            let p = chunk.toString();
            let arr = JSON.parse(p);
            let newStuff = arr.map((current, index) => {
                let { assets } = current;
                let newAssets = assets.map((t, i) => { return `${t} yards of silk` });
                return {
                    ...current,
                    assets: newAssets
                }
            });
            let newString = JSON.stringify(newStuff);
            body += newString;
        });
        req.on('end', () => {
            console.log(`About to pass ${body} 'end' event in the transforming service`);
            //not streaming
            res.end(body);
        });
    } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        let thing = { profit: 0 };
        res.end(JSON.stringify(thing))
    }

}).listen(8124);