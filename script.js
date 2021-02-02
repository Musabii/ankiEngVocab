const makeButton = $('#makeButton');
let wordsInput = $('#wordsInput');

makeButton.click(function() {
    let words = wordsInput.val().split("\n");
    let notes = makeNotes(words);
    //download(notes.join("\n"), "words", ".txt")
    })

function makeNotes(words) {
    let notes = []
    words.forEach( (e, i) => {
        console.log(getData(e))
    })
    definitions = notes
    examples = definitions
    tags = examples
}

function getData(word) {
    let link = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    defs = "", exes = "", tags = "", note = "";

    $.getJSON(link, data => {    
        console.log(data[0].meanings.length)
        if (data[0].meanings.length == 0) return null
        data[0].meanings.forEach( e => {    
            e.definitions.forEach( (e, i) => {
                defs += i+1 + "." + " " + e.definition + "\n\n";
                exes += i+1 + "." + " " + e.example + "\n\n";
            })
            tags += e.partOfSpeech + " ";
        });
        note = defs + "\t" + exes + "\t" + tags;
        return note;
    })
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