const makeButton = $('#makeButton');
let wordsInput = $('#wordsInput');

makeButton.click(function() {
    let words = wordsInput.val().split("\n");
    let notes = makeNotes(words);
    let failed = listFails(words, notes)
    console.log(notes);
    //download(notes.join("\n"), "words", ".txt")
    });

function listFails(words, notes) {
    let fails = [];
    notes.forEach( (e, i) => {
        
    })
}

function makeNotes(words) {
    let notes = []
    words.forEach( (word, i) => {
        let link = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
        let defs = "", exes = "", tags = "";

        $.getJSON(link, data => {    
            console.log(data[0].meanings.length)
            if (data[0].meanings.length == 0) notes[i] = undefined;
            data[0].meanings.forEach( e => {
            e.definitions.forEach( (e, i) => {
                defs += i+1 + "." + " " + e.definition + " ";
                exes += i+1 + "." + " " + e.example + " ";
            })
            tags += e.partOfSpeech + " ";
        })
        notes[i] = null;
        notes[i] = word + "\t" + defs + "\t" + exes + "\t" + tags;
    })
    })
    return notes;
}

function getData(word) {
    
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}