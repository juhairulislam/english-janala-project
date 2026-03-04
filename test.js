const crateElement = (arr) => {
    const htmlElements = arr.map(el =>`<span class='btn'>${el}</span>`) ;
    console.log(htmlElements.join(' '))

}


const synonyms = ['hi' , 'hello' , 'chopo'] ;
crateElement(synonyms)
