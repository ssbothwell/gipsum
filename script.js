window.onload = () => {
  var data = document.getElementById("right");
  var p_up = document.getElementById('paragraphUp');
  var p_down = document.getElementById('paragraphDown');
  var w_up = document.getElementById('wordUp');
  var w_down = document.getElementById('wordDown');
  var paragraphs = document.getElementById('paragraphTotal');
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
      let length = randomIntRange(14,25);
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
  
  // var generateSentence = (lang) => {
  //   // Generate a random length for sentence
  
  //   let length = randomIntRange(14,25);
  //   let sentence = [];
  //   for (let i = 0; i < length; i++) {
  //     // Pick a random index
  //     let j = randomIntRange(0,lang.length);
  //     let word = lang[j];
  //     // Capitalize if this is the first word
  //     if (i == 0){ word = capitalizeString(word); }
  //     sentence.push(word)
  //   }
  //   // Return joined array appended with a period
  //   return sentence.join(' ').concat('.');
  // }
  
  // var generateParagraph = () => {
  //   // Generate a random length for paragraph
  //   let length = randomIntRange(3,5);
  //   let paragraph = [];
  //   for (let i = 0; i < length; i++) {
  //     if (lang.innerHTML == "E"){
  //       var sentence = generateSentence(spiceEng);
  //     } else {
  //       var sentence = generateSentence(spiceInd);  
  //     }
      
  //     paragraph.push(sentence);
  //   }
  //   return paragraph.join(' ').concat(String.fromCharCode(13));
  // }
  
  // var generateEssay = (paragraphs) => {
  //   // Generate randomized collection of paragraphs
  //   let length = paragraphs;
  //   let essay = [];
  //   for (let i = 0; i < length; i++) {
  //     let paragraph = generateParagraph();
  //     essay.push(paragraph);
  //   }
  //   return essay;
  // }
  
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
  
  
  var sentenceMap = generateSentences(generateWords(500));
  var paras = generateParagraphs(5,sentenceMap);
  loadEssay(mapEssay(paras, spiceInd));
  
  
  // Control Interface
  //p_up.onclick = () => {
  //  paragraphs.innerHTML++;
  //  let paraCount = parseInt(paragraphs.innerHTML);
  //  let sentenceMap = generateSentences(generateWords(500));
  //  loadEssay(mapEssay(generateParagraphs(5,sentenceMap), spiceInd));
  //}
  
  // p_down.onclick = () => {
  //   paragraphs.innerHTML--;
  //   let paraCount = parseInt(paragraphs.innerHTML);
  //   let sentenceMap = generateSentences(generateWords(500));  
  //   loadEssay(mapEssay(generateParagraphs(paraCount,sentenceMap), spiceInd));
  // }
  
  // w_up.onclick = () => {
  //   wordTotal.innerHTML = parseInt(wordTotal.innerHTML) + 10;
  // }
  
  // w_down.onclick = () => {
  //   wordTotal.innerHTML = parseInt(wordTotal.innerHTML) - 10;
  // }
  
  // lang.onclick = () => {
  //   lang.innerHTML == 'E' ? lang.innerHTML = 'IN' : lang.innerHTML = 'E';
  //   loadEssay(generateEssay(paragraphs.innerHTML));  
  // }
  
  // clear.onclick = () => {
  //   while (data.firstChild) {
  //     data.removeChild(data.firstChild);
  //   }  
  // }
  
  // loadEssay(generateEssay(paragraphs.innerHTML));
}
