sap.ui.define([
    "com/appIdeas/appIdeas/controller/BaseController"
 ], function (Controller) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Bin2dec", {
        onConvertBin2Dec: function(oControlEvent) {
            const input = oControlEvent.getSource();
            const binValue = oControlEvent.getParameters().newValue.trim();
            const binaryRegex = /^[01]+$/;

            if (binValue === '') {
                this.getView().getModel().setProperty('/converted/dec', '');
                input.setValueState(sap.ui.core.ValueState.None);
                input.mProperties.valueStateText = "";
                return;
            }

            if (!binaryRegex.test(binValue)) {
                
                input.setValueState(sap.ui.core.ValueState.Error);
                input.mProperties.valueStateText = "Insira um valor válido";
                
                this.getView().getModel().setProperty('/converted/dec', '');
                return;
            }
            
            input.setValueState(sap.ui.core.ValueState.None);
            input.mProperties.valueStateText = "";

            const decValue = parseInt(binValue, 2);
            this.getView().getModel().setProperty('/converted/dec', decValue);

        }
    });
 });