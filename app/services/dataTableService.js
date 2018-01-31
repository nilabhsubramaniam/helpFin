angular.module('perspective').service('dataTableService', function ($window, callApiServices) {
    var pageNo = 0;
    var headerTxt = 'Products';
    var headerType = 'Type of Venues';
    var prodHeaderRule ='Rule';
    var prodTxt = null;
    var questTxt = null;
    var prodId = null;
    var prodRuleId = null;
    var questId = null;
    var typeTxt = null;
    var categoryTxt = null;
    var typeId = null;
    var categoryId = null;
    var venueType = null;
    var venueCat = null;
    var venueCatLvl = null;
    var ruleType= null;
    //var token = $window.localStorage.getItem('token');
    var token= null;
    var products = {
        list: [
            {
                _id: 0,
                "text": "Type 1",
                "product": 1
            },
            {
                _id: 1,
                "text": "Type 2",
                "product": 2
            }
        ],
        isProd: true,
        isQuest: false,
        isChoice: false
    };

    var questions = {
        list: [
            {
                _id: 0,
                "text": "checked ",
                "active": "yes",
                "order": 5,
                "quest": 1
            },
            {
                _id: 1,
                "text": "Not checked ",
                "active": "no",
                "order": 7,
                "quest": 2
            }
        ],
        isProd: false,
        isQuest: true,
        isChoice: false
    };

    var choices = {
        list: [
            {
                _id: 0,
                "text": "choice1",
                "active": "yes",
                "questNo": 1
            },
            {
                _id: 1,
                "text": "choice2",
                "active": "no",
                "questNo": 1
            }
        ],
        isProd: false,
        isQuest: false,
        isChoice: true
    };

    /*callApiServices.getProducts(token)
    .then(function(response){
        console.log("products", response);
    }, function(error){
        console.log("error products", error);
    })*/

    this.getPageNo = function () {
        return pageNo;
    };

    this.setPageNo = function (num) {
        pageNo = num;
    };

    this.getHeader = function (isProd) {
        var id = this.getPageNo();
        if (id == 0) {
            if(isProd){
                return headerTxt;
            }else{
                return headerType;
            }
        }
        else if (id == 1) {
            if(isProd){
                return prodTxt;
            }else{
                return typeTxt;
            }
        }
        else if (id == 3){
            if(isProd){
                return prodHeaderRule;
            }
        }
        else{
            if(isProd){
                return questTxt;
            }else{
                return categoryTxt;
            }
        }
    };

    this.setHeader = function (id, text, isProd) {
        //headerTxt = text;
        var pageId = this.getPageNo();

        if (pageId == 0) {
            if (isProd) {
                prodTxt = text;
                prodId = id;
                prodHeaderRule = text;
                prodRuleId = id;
            }
            else {
                typeTxt = text;
                typeId = id;
            }

        }
        else if (pageId == 1) {
            if (isProd) {
                questTxt = text;
                questId = id;
            }
            else {
                categoryTxt = text;
                categoryId = id;
            }
        }
    };

    this.getAddTxt = function (isProd) {
        var id = this.getPageNo();
        if (id == 0){
            if(isProd){
                return 'Product';
            }else{
                return 'Type';
            }
        }
        else if (id == 1) {
            if(isProd){
                return 'Question';
            }else{
                return 'Category';
            }
        }
        else if(id == 2) {
            if(isProd){
                return 'Current Question Choice';
            }else{
                return 'Interval';
            }
        }
        else{
            if(isProd){
                return 'Rule';
            }
        }
    };

    this.getData = function (pageNum,isProd) {
        if (pageNum == 0) return products;
        else if (pageNum == 1) return questions;
        else if (pageNum == 3) return rules;
        else return choices;
    };

    this.setData = function (data) {
        var id = this.getPageNo();
        if (id == 0) products.list.push(data);
        else if (id == 1) questions.list.push(data);
        else choices.list.push(data);
    };

    this.updateData = function (data) {
        var id = this.getPageNo();
        if (id == 0) products = data;
        else if (id == 1) questions = data;
        else choices = data;
    };

    this.getToken = function () {
        var token = $window.localStorage.getItem('token');
        return token;
    };

    this.setToken = function(value){
        token = value;
    };

    this.getProdId = function () {
        return prodId;
    };
    this.getProdRuleId = function(){
        return prodRuleId;
    };

    this.getQuestId = function () {
        return questId;
    };

    this.getTypeId = function () {
        return typeId;
    };
    this.getCategoryId = function () {
        return categoryId;
    };

    //Venues
    this.getVenueType = function(){
        return venueType;
    };

    this.getVenueCat = function(){
        return venueCat;
    };

    this.getVenueCatLvl = function(){
        return venueCatLvl;
    };

    this.setVenueType = function(id){
        venueType = id;
    };

    this.setVenueCat = function(id){
        venueCat = id;
    };

    this.setVenueCatLvl = function(id){
        venueCatLvl = id;
    };
    //Rules
    this.getRuleType = function(){
        return ruleType;
    };
    this.setRuleType = function(id){
        ruleType = id;
    };
});
