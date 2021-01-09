sap.ui.define([
  "com/appIdeas/appIdeas/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("com.appIdeas.appIdeas.controller.App", {

    onPress: function(oEvent, route) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      var item = oEvent.getSource();
      
      if (route === '') {
        console.log('Sem informações de destino');
        return;
      }

      oRouter.navTo(route);
    }

  });
});
