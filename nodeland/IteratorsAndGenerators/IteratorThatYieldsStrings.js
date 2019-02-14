function* stringGenerator() {
    yield "apple";
    yield "banana";
    yield "cherry";
}

var myIterator = stringGenerator();

for (let c of myIterator) {
    console.log(c);
}