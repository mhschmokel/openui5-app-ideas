sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/ui/Device",
  "com/appIdeas/appIdeas/model/models"
], function(UIComponent, JSONModel, Device, models) {
  "use strict";

  return UIComponent.extend("com.appIdeas.appIdeas.Component", {

    metadata: {
      manifest: "json"
    },
    init: function() {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      const oData = {
        converted: {
          dec: ""
        }
      }

      const oModel = new JSONModel(oData);
      this.setModel(oModel);
      
      // create the views based on the url/hash
			this.getRouter().initialize();
    }
  });
});
