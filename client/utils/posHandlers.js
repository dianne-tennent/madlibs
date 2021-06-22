// let words = new pos.Lexer().lex('This is some sample text. This text can contain multiple sentences.');
// console.log(words)
// let tagger = new pos.Tagger();
// let taggedWords = tagger.tag(words);
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
    pos: 'noun-singular'
},
{
    tag: 'NNS',
    pos: 'noun-plural'
},
{
    tag: 'RB',
    pos: 'adverb'
},
{
    tag: 'VB',
    pos: 'verb-base-form'
},
{
    tag: 'VBP',
    pos: 'verb-present'
},
{
    tag: 'VBD',
    pos: 'verb-past-tense'
},
{
    tag: 'VBG',
    pos: 'verb-gerund'
}]

function wordTagger(word, wordList, storyArray) {
    let error = ''
    let newWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    console.log(newWord)
    if(wordList.find(item => item.word == newWord)) {
        error = "You've already chosen that word"
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
            error = "Sorry, you can only choose nouns, verbs, adjectives and adverbs."
            return error
        } else {
            let partOfSpeech = tagList.find(item => item.tag === posTag)
            error = ''
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



module.exports = {
    wordTagger
}