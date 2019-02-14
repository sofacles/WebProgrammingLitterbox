function* countTo(numero) {
    for (var i = 1; i <= numero; i++) {
        yield i;
    }
    yield "You can yield a string.";
}

function* seriesOfCounts(n) {
    for (var i = 0; i < n; i++) {
        yield countTo(4);
    }
}

let myIterator = seriesOfCounts(3);

for (let subIterator of myIterator) {
    for (let n of subIterator) {
        console.log(n);
    }
}

