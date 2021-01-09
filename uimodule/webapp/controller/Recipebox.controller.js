sap.ui.define([
    "com/appIdeas/appIdeas/controller/BaseController"
 ], function (Controller) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Recipebox", {
      onNavCategory: function(oEvent) {
         const oItem = oEvent.getSource();
         const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("foodcategory", {
            foodCategory: oItem.getTitle()
			});
      }
    });
 });