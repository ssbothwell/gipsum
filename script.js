window.onload = () => {
  var data = document.getElementById("right");
  var p_up = document.getElementById('paragraphUp');
  var p_down = document.getElementById('paragraphDown');
  var w_up = document.getElementById('wordUp');
  var w_down = document.getElementById('wordDown');
  var paragraphs = document.getElementById('paragraphTotal');
  var paraCount = parseInt(paragraphs.innerHTML);
  var wordTotal = document.getElementById('wordTotal');
  var lang = document.getElementById('lang');
  var clear = document.getElementById('clear');
  const spiceEng =  ['alkanet'
                  ,'fennel'
                  ,'asafoetida'
                  ,'chili'
                  ,'cardamom'
                  ,'white pepper'
                  ,'black pepper'
                  ,'peppercorn'
                  ,'cumin'
                  ,'capers'
                  ,'capsicum'
                  ,'bay leaf'
                  ,'celery'
                  ,'cinnamon buds'
                  ,'citric acid'
                  ,'cloves'
                  ,'coriander'
                  ,'cubeb'
                  ,'fennel seed'
                  ,'fenugreek'
                  ,'garcinia'
                  ,'ginger'
                  ,'bedellium'
                  ,'gooseberry'
                  ,'kalpasi'
                  ,'licorice'
                  ,'mango'
                  ,'mint'
                  ,'mustard'
                  ,'nigella'
                  ,'nutmeg'
                  ,'mase'
                  ,'basil'
                  ,'pomegranate seed'
                  ,'poppy'
                  ,'saffron'
                  ,'salt'
                  ,'sesame'
                  ,'star anise'
                  ,'tamarind'
                  ,'carom'
                  ,'thymol'
                  ,'turmeric'
                  ,'basil'
                  ,'gum tragacanth'
                  ,'inknut'
                  ,'red chili powder'
                  ]
  const spiceInd =  ['radhuni'
                    ,'charoli'
                    ,'hing'
                    ,'lal mirch'
                    ,'kali elaichi'
                    ,'safed mirchi'
                    ,'kali mirchi'
                    ,'shah jeera'
                    ,'kachra'
                    ,'shimla mirch'
                    ,'ajmud'
                    ,'chironji'
                    ,'tej patta'
                    ,'nag kesar'
                    ,'dalchini'
                    ,'nimbu phool'
                    ,'lavang'
                    ,'dhaniya'
                    ,'kabab chini'
                    ,'panch phoron'
                    ,'garam masala'
                    ,'jeera'
                    ,'karipatta'
                    ,'sanchal'
                    ,'kasuri methi'
                    ,'methi dhana'
                    ,'kudampuli'
                    ,'kokum'
                    ,'lahasun'
                    ,'adarak'
                    ,'sonth'
                    ,'chhoti elaichi'
                    ,'gugal'
                    ,'amla'
                    ,'patthar ke phool'
                    ,'jethimadh'
                    ,'pippali'
                    ,'kamiki'
                    ,'aamchur'
                    ,'pudina'
                    ,'sarson'
                    ,'rai'
                    ,'kalonji'
                    ,'jaiphal'
                    ,'tulsi'
                    ,'panch phoran'
                    ,'anardana'
                    ,'khas khas'
                    ,'namak'
                    ,'til'
                    ,'badal phool'
                    ,'imli'
                    ,'ajwain'
                    ,'haldi'
                    ,'tulasi'
                    ,'hara dhaniya'
                    ,'mirch'
                    ,'katira goond'
                    ,'harad'
                    ,'lal mirchi'  
                    ]
  
  var randomIntRange = (min, max) => {
    // Returns a random integer in specificed range
    return Math.floor(Math.random() * (max-min) + min)  
  }
  
  var capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  var generateWords = (wordCount) => {
    let length = wordCount;
    let wordMap = [];
    for (let i = 0; i < length; i++) {
      wordMap.push(randomIntRange(0,spiceInd.length));
    }
    return wordMap;
  }
  
  var generateSentences = (wordMap) => {
    let result = []
    while (wordMap.length > 0) {
      let sentence = [];
      if (wordMap.length < 25) {
        sentence.concat(wordMap);
        break;
      }
      let length = randomIntRange(5,14);
      for (let i = 0; i < length; i++) {
        sentence.push(wordMap.pop());  
      }
      result.push(sentence);
    }  
    return result;
  }
  
  var generateParagraphs = (pCount, sentences) => {
    let pLength = Math.floor(sentences.length / pCount);
    var sentencesCopy = sentences.slice();
    let essay = [];
  
    for (let i = 0; i < pCount; i++) {
      let paragraph = [];
      for (let j = 0; j < pLength; j++){
        paragraph.push(sentencesCopy.pop());
      }
      if (i == pCount - 1 && sentencesCopy > 0) {
        paragraph.push(sentencesCopy);
      }
      essay.push(paragraph);
    }
    return essay;
  }
  
  var mapSentence = (sentence, lang) => {
    // Returns a list of spices corresponding
    // to sentence key list
    result = [];
    for (let i = 0; i < sentence.length; i++) {
      if (i == 0) {
        result.push(capitalizeString(lang[sentence[0]]))
      } else if (i == sentence.length -1) {
        result.push(lang[sentence[i]].concat('.'));
      } else {
        result.push(lang[sentence[i]]);
      }
    }
    console.log(result.length);
    return result;
  }
  
  var mapEssay = (essay, lang) => {
    // Applys mapSentence to to essay
    essay = essay.map(paragraph => {
      return paragraph.map(sentence => {
        return mapSentence(sentence, lang).join(' ');
      }).join(' ');
    });
  
    return essay;
  }
  
  var loadEssay = (essay) => {
    // Loads an essay array into the dom
   
    while (data.firstChild) {
      data.removeChild(data.firstChild);
    }  
    let essayNode = document.createElement("DIV");
    for (let i = 0; i < essay.length; i++) {
      let pnode = document.createElement("P");
      let textNode = document.createTextNode(essay[i]);
      pnode.appendChild(textNode);
      essayNode.appendChild(pnode);
    }
    data.appendChild(essayNode);
  }
  
  
  
  
  // Control Interface
  p_up.onclick = () => {
    paragraphs.innerHTML++;
    paraCount = parseInt(paragraphs.innerHTML);
    loadEssay(mapEssay(generateParagraphs(paraCount,sentenceMap), spiceInd));
  }
  
  p_down.onclick = () => {
    paraCount = parseInt(paragraphs.innerHTML);
    if (paraCount > 1) {
      paragraphs.innerHTML--;
      paraCount = parseInt(paragraphs.innerHTML);
    }
    loadEssay(mapEssay(generateParagraphs(paraCount,sentenceMap), spiceInd));
  }
  
  w_up.onclick = () => {
    wordTotal.innerHTML = parseInt(wordTotal.innerHTML) + 10;
    paraCount = parseInt(paragraphs.innerHTML);
    let wordCount = parseInt(wordTotal.innerHTML);
    loadEssay(mapEssay(generateParagraphs(paraCount,generateSentences(generateWords(wordCount))), spiceInd));
  }
  
  w_down.onclick = () => {
    let wordCount = parseInt(wordTotal.innerHTML);
    if (wordCount > 0) {
      wordTotal.innerHTML = parseInt(wordTotal.innerHTML) - 10;
      wordCount = parseInt(wordTotal.innerHTML);
    }
    paraCount = parseInt(paragraphs.innerHTML);
    loadEssay(mapEssay(generateParagraphs(paraCount,generateSentences(generateWords(wordCount))), spiceInd));
  }
  
  lang.onclick = () => {
    lang.innerHTML == 'E' ? lang.innerHTML = 'IN' : lang.innerHTML = 'E';
  }
  
  clear.onclick = () => {
    while (data.firstChild) {
      data.removeChild(data.firstChild);
    }  
  }
  // Initial Render
  var sentenceMap = generateSentences(generateWords(500));
  var paras = generateParagraphs(5,generateSentences(generateWords(500)));
  loadEssay(mapEssay(paras, spiceInd));
}
