// ==UserScript==
// @name         Collab Helper
// @namespace    https://github.com/AseevGerman/collabHelper
// @homepageURL  https://github.com/AseevGerman/collabHelper
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://collab.sms-it.ru/ui
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sms-it.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/AseevGerman/collabHelper/main/collabHelper.js
// @downloadURL  https://raw.githubusercontent.com/AseevGerman/collabHelper/main/collabHelper.js
// ==/UserScript==

(function() {
    'use strict';
    var mainElement;
    var tm;

    var nextFileElement;
    var prevFileElement;
    var acceptElement;
    var returnElement;


    var findMainInterval = () => {
        //console.log("searching");
        //mainTable = $('table');
        var mainTable = document.getElementsByTagName('table')[0];
        if(mainTable){

            //clearInterval(tm);


            if(!mainTable.firstChild){
                return;
            }

            var elem = mainTable.firstChild;

            if(!elem.children && elem.children.length < 2){
                return;
            }

            elem = elem.children[1];
            if(!elem.firstChild){
                return;
            }

            elem = elem.firstChild;
            if(!elem.firstChild){
                return;
            }

            elem = elem.firstChild;

            var elems = Array.from(elem.children).filter(x => x.children && x.children.length>0 && Array.from(x.children).filter(x => x.localName == 'div').length == x.children.length);
            if(elems.length != 1 || !elems[0]){
                return;
            }
            elem = elems[0];

            elems = Array.from(elem.childNodes).filter(x => x.style.display != 'none');
            if(elems.length != 1 || !elems[0]){
                return;
            }
            mainElement = elems[0];
            clearInterval(tm);
            //console.log("main element found");
            //console.log(mainElement);
            var observer = new MutationObserver(function(mutations) {
                //console.log(mainElement.getElementsByTagName('a'));

                //console.log('Updated!');
                setTimeout(() => {
                prevFileElement= Array.from(mainElement.getElementsByTagName('a')).filter(x => x.title == 'Go to previous file')[0];
                //console.log(prevFileElement);
                nextFileElement= Array.from(mainElement.getElementsByTagName('a')).filter(x => x.title == 'Go to next file')[0];
                //console.log(nextFileElement);
                acceptElement=Array.from(document.getElementsByClassName('ccollab-ImageAnchor')).filter(x => x.title == 'Mark Accepted' || x.title == 'Already accepted this conversation')[0];

                returnElement=Array.from(document.getElementsByClassName('ccollab-ImageTextAnchor')).filter(x => x.title == 'Return to Review Summary Page')[0];
                }, 50);


            });

            observer.observe(mainElement, {
                attributes:    true,
                childList:     true,
                characterData: true
            });
        }
    };


        tm = setInterval(findMainInterval, 50);


       document.onkeydown = (event) => {
           if(!event || !mainElement){
               return;
           }

           if(!event.ctrlKey){return;}

           if(prevFileElement && event.keyCode == 37){
               //console.log("prevFileElement.click()");
               //console.log(prevFileElement);
               prevFileElement.click();
           }

           if(nextFileElement && event.keyCode == 39){
               //console.log("nextFileElement.click()");
               nextFileElement.click();
           }

           if(acceptElement &&  event.keyCode == 13){
             acceptElement.click();
           }

           if(returnElement &&  event.keyCode == 8){
             returnElement.click();
           }
       };


})();
