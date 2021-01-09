sap.ui.define([
    "com/appIdeas/appIdeas/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
 ], function (Controller, JSONModel, Fragment) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Foodsbycategory", {
      onInit: function () {
			const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.getRoute("foodcategory").attachPatternMatched(this._onObjectMatched, this);
         
         
         
         
		},
		_onObjectMatched: async function (oEvent) {
         
         const loadFoodsByCategory = async function() {
            try {
               const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data.strCategory}`);
               
               const foodsByCategory = await response.json();
               
               return foodsByCategory;

            } catch (e) {
               console.log(e);
            }
         }
         const data = {
            strCategory: oEvent.getParameter("arguments").foodCategory
         }
         const oModel = new JSONModel(data);
         this.getView().setModel(oModel);


         const jsonData = await loadFoodsByCategory();
         const jsonModel = new JSONModel(jsonData);
         const oList = this.byId('foodListId');
         
         oList.setModel(jsonModel);
			
      },
      onOpenFoodDialog: async function(oEvent) {
         //get item Id
         const oItemId = oEvent.getSource().mProperties.intro;

         //Retrieve food by id from API
         const foodData = async function() {
            
            try {
               const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${oItemId}`);
               
               const food = await response.json();
               
               return food;

            } catch (e) {
               console.log(e);
            }

         }
         const jsonData = await foodData();


         //Open dialog
         const oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
               name: "com.appIdeas.appIdeas.view.FoodDialog",
               controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
         } 

         const aMeasureIngredients = [];

         for (let i = 1; i <= 20; i++) {
            let ing = jsonData.meals[0][`strIngredient${i}`];
            let measure = jsonData.meals[0][`strMeasure${i}`];

            if (ing !== '' && ing !== null) {
               aMeasureIngredients.push(
               {
                  ingredient:ing,
                  measure:measure
               });
            }
         }
         
         // console.log(jsonData);
         const oData = {
            idMeal: jsonData.meals[0].idMeal,
            strMeal: jsonData.meals[0].strMeal,
            strCategory: jsonData.meals[0].strCategory,
            strArea: jsonData.meals[0].strArea,
            strInstructions: jsonData.meals[0].strInstructions,
            strMealThumb: jsonData.meals[0].strMealThumb,
            strTags: jsonData.meals[0].strTags,
            strYoutube: jsonData.meals[0].strYoutube,
            strMeasureIngredients: aMeasureIngredients,
         }

         const jsonModel = new JSONModel(oData);
         oView.setModel(jsonModel);

			this.pDialog.then(function(oDialog) {
				oDialog.open();
         });
         
      },

		onCloseFoodDialog : function () {
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
			this.byId("foodDialog").close();
		}
    });
 });