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

module.exports = {
    tagList,
    tagValidator
}