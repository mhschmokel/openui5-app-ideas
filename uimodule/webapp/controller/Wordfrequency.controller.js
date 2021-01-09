sap.ui.define([
    "com/appIdeas/appIdeas/controller/BaseController",
    "sap/ui/model/json/JSONModel"
 ], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Wordfrequency", {
        onTranslate: function(oEvent) {
            
            const { value } = this.byId('textArea').mProperties
            const { selected } = this.byId('caseSensitiveId').mProperties;
            const data = {wordFrequency:[]};
            const table = this.byId('translatedText');
            const uniqueWords = [];
            const wordsFrequency = [];

            if (value === '') {
               const oModel = new JSONModel(data);
               table.setModel(oModel);
               return;
            }

            let wordsArray = [];

            if (selected) {
               wordsArray = value.trim().split(' ');
            } else {
               wordsArray = value.trim().toLowerCase().split(' ');
            }

            let idx = 0;
            let count = 1;
            for (let i = 0; i < wordsArray.length; i++) {
               idx = i + 1;

               idx = wordsArray.indexOf(wordsArray[i], idx);

               while(idx != -1) {
                  idx = wordsArray.indexOf(wordsArray[i], idx + 1);
                  count++;
               }

               if (!uniqueWords.includes(wordsArray[i])) {
                  uniqueWords.push(wordsArray[i]);
                  wordsFrequency.push(count);
                  data.wordFrequency.push({word: wordsArray[i], frequency: count});
               }

               count = 1;
               
            }

            data.wordFrequency.sort((a,b) => {
               if (a.frequency >= b.frequency) {
                  return -1;
               }

               return 1;
            });

            const oModel = new JSONModel(data);
            
            // Assign the model object to the SAPUI5 core
            table.setModel(oModel);

        },
        onClear: function(oEvent) {
         const textArea = this.byId('textArea');
         textArea.setValue('');
         this.onTranslate(oEvent);
        }
    });
 });