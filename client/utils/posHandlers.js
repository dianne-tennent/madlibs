// let words = new pos.Lexer().lex('This is some sample text. This text can contain multiple sentences.');
// console.log(words)
// let tagger = new pos.Tagger();
// let taggedWords = tagger.tag(words); //takes a list of words
// console.log(taggedWords)

// for (let i=0; i < taggedWords.length ; i++) {
//     let taggedWord = taggedWords[i];
//     let word = taggedWord[0];
//     let tag = taggedWord[1];
//     if(tag.includes('VB')) {
//         console.log(word + " /" + tag);
//     }
// }

// JJ Adjective                big
// NN Noun, sing. or mass      dog
// NNS Noun, plural            dogs
// RB Adverb                   quickly
// VBD verb, past tense        ate
// VBG verb, gerund            eating
// VBP Verb, present           eat

let pos = require('pos');
let tagger = new pos.Tagger();

const tagList = [{
    tag: 'JJ',
    pos: 'adjective'
}, 
{
    tag: 'NN',
    pos: 'singular noun'
},
{
    tag: 'NNS',
    pos: 'plural noun'
},
{
    tag: 'RB',
    pos: 'adverb'
},
{
    tag: 'VB',
    pos: 'verb (base form, e.g. eat, sleep)'
},
{
    tag: 'VBP',
    pos: 'verb (present tense, e.g. eat, sleep)'
},
{
    tag: 'VBD',
    pos: 'verb (past tense, e.g. ate, slept)'
},
{
    tag: 'VBG',
    pos: 'verb (gerund, e.g. eating, sleeping)'
}]

function wordTagger(word, wordList, storyArray) {
    let error = {}
    let newWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    console.log(newWord)
    if(wordList.find(item => item.word == newWord)) {
        error.errorMessage = "You've already chosen that word"
        return error
    } else {
        let indexes = []
        storyArray.forEach((item, i) => {
            if(item === newWord) {
                indexes.push(i)
            }
        })
        let wordToTag = []
        wordToTag.push(newWord)
        let posTag = tagger.tag(wordToTag)[0][1]
        console.log("part of speech", posTag)
        let valid = tagValidator(posTag)
        console.log(valid)
        if(valid !== true) {
            error.errorMessage = "Sorry, you can only choose nouns, verbs, adjectives and adverbs."
            return error
        } else {
            let partOfSpeech = tagList.find(item => item.tag === posTag)
            error = {}
            console.log("index", indexes)
            let wordToAdd = {
                word: newWord, 
                storyArrayIndexes: indexes, 
                pos: partOfSpeech.pos
            }
            return wordToAdd
        }
    }
}
function tagValidator(pos) {
    let valid = false
    console.log("part of speech", pos)
    tagList.find(item => {
        if(item.tag === pos) {
            console.log("true")
            valid = true
        }
    })
    return valid
}

function turnTagIntoWord (tag, tagList) {
    let thisOne = tagList.find(element => element.tag === tag)
    console.log(thisOne.pos)
    return thisOne.pos
}



//check that the words the user has entered are the correct part of speech
function validateWordTypes(array) {
    let errors = []
//for each array item, check that the pos of item.word matches item.pos
for(let i=0; i < array.length; i++) {
    let wordToTag = []
    wordToTag.push(array[i].word)
    console.log(wordToTag)
    let posTag = tagger.tag(wordToTag)[0][1]
    console.log(posTag)
    let wordTag = turnTagIntoWord(posTag, tagList)
    console.log(wordTag)
    console.log(array[i].pos)
    if(wordTag === array[i].pos) {
        console.log("match!")
        return true
    } else {
        let errMessage = `Sorry, ${wordToTag} is not a ${array[i].pos}. Try again and make sure you enter a ${array[i].pos}!`
        errors.push(errMessage)
        return errors
    }
}
//if they don't match, then remove from list, send error message

}



module.exports = {
    tagValidator,
    wordTagger,
    validateWordTypes
}