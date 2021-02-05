const makeButton = $('#makeButton');
let wordsInput = $('#wordsInput');

makeButton.click(function() {
    let words = wordsInput.val().split("\n");
    makeNotes(words, downloadStuff);
})

function makeNotes(words, callback) {
    let notes = [], fails = [];
    words.forEach( (word, i) => {
        let link = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
        let defs = "", exes = "", tags = "";

        $.getJSON(link, data => {
            if (data[0].meanings.length == 0) return fails.push(word);
            data[0].meanings.forEach( e => {
            e.definitions.forEach( (e, i) => {
                defs += i+1 + "." + " " + e.definition + " ";
                exes += i+1 + "." + " " + e.example + " ";
            })
            tags += e.partOfSpeech + " ";
            })
        
            notes.push(word + "\t" + defs + "\t" + exes + "\t" + tags);
        })
        .fail(() => {
            fails.push(word);
            if (words.length == i+1) callback(notes, fails);
        })
        .done(() => {
            if (words.length == i+1) callback(notes, fails);
        })
    })
    
}

let downloadStuff = function(notes, fails) {
    console.log(notes, fails);
    download(notes.join("\n"), "ankiNotes", ".txt");
    download(fails.join("\n"), "failedWords", ".txt");
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