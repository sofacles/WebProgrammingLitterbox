function* get_Chars(word) {
    for (var i = 0; i < word.length; i++) {
        yield word[i];
    }
}

var myIterator = get_Chars("Smithers");

for (let c of myIterator) {
    console.log(c);
}

// console.log(myIterator.next());
// console.log(myIterator.next());
// console.log(myIterator.next());

