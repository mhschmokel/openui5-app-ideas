sap.ui.define([
    "com/appIdeas/appIdeas/controller/BaseController",
    "sap/ui/model/json/JSONModel",
 ], function (Controller, JSONModel) {
    "use strict";
    const _apiKey = '';

    return Controller.extend("sap.ui.demo.walkthrough.controller.Weatherapp", {
      onSearch: async function() {
         const oInput = this.byId('cityNameId');
         const cityName = oInput.mProperties.value.trim();
            
         if (cityName === '') {
            console.log('City name is empty')
            return;
         }
         
         const oData = await this._loadData(cityName);
         
         if (oData.length < 1) {
            console.log('oData is null');
            return;
         }

         const aData = this._cityDataTransform(oData);

         if(oData.length == 1) {
            console.log('Apenas 1 cidade retornou')
            return;
         }

         this._setCityListModel(aData);
         
         


      },
      _loadData: async function(cityName){
         
         try {

            const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${_apiKey}&q=${cityName}`);

            const oData = await response.json();
            return oData;

         } catch(e) {
            console.log(e)
            return;
         }
      },
      _cityDataTransform: function(oData) {
         
         const aCityData = [];
         
         for (let i = 0; i < oData.length; i++){
            aCityData.push({
               key : oData[i].Key,
               localizedName : oData[i].LocalizedName,
               countryId : oData[i].Country.ID,
               countryName : oData[i].Country.LocalizedName,
               stateId : oData[i].AdministrativeArea.ID,
               stateName : oData[i].AdministrativeArea.LocalizedName
            });
         }

         return aCityData;

      },
      _setCityListModel: function(aData) {
         const oList = this.byId('cityListId');
         const oBoxList = this.byId('listBoxId');
         
         const jsonModel = new JSONModel(aData);
         oList.setModel(jsonModel);

         oBoxList.setVisible(true);
      },
      onSelectCity: async function(oEvent) {
         const oItem = oEvent.getSource();
         const oBoxList = this.byId('listBoxId');
         
         //oBoxList.setVisible(false);

         const aData = await this._loadSelectedCity(oItem.mProperties.intro);
         const oData = this._weatherDataTransform(aData);
         this._setWeatherModel(oData);
         
      },
      _loadSelectedCity: async function(selectedCityId) {
         try {
            
            const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${selectedCityId}?apikey=${_apiKey}&details=true`);
            const oData = await response.json();
            
            return oData;

         } catch (error) {
            console.log(error);
            return;
         }
      },
      _weatherDataTransform: function(aData) {
         const weatherData = {
            temperature: {
               value: aData[0].Temperature.Metric.Value,
               unit: aData[0].Temperature.Metric.Unit,
            },
            hasPrecipitation: aData[0].HasPrecipitation,
            isDayTime: aData[0].IsDayTime,
            dateTime: aData[0].LocalObservationDateTime,
            relativeHumidity: aData[0].RelativeHumidity,
            uvIndex: aData[0].UVIndex,
            uvIndexText: aData[0].UVIndexText,
            weatherText: aData[0].WeatherText
         };

         return weatherData;
         
      },
      _setWeatherModel: function(oData){
         const jsonModel = new JSONModel(oData);
         
         this.getView().setModel(jsonModel);
      }
    });
 });