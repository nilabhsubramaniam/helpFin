angular.module('perspective').service('callApiServices', function ($http) {
    //this.domain = "http://ai.perspective.com.co/back/";
    this.domain = "http://ec2-13-126-101-120.ap-south-1.compute.amazonaws.com/back/";

    //LogIn
    this.login = function (credentials) {
        return $http({
            method: "POST",
            url: this.domain + 'api-token-auth/',
            data: credentials,
            headers: {
                "Content-Type": "application/json"
            }
        })
    };

    //Product
    this.getProducts = function (token, limit,offset,ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'products/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        });
    };

    this.getQuestionsById = function (token, prod_id, limit, offset, ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'products/' + prod_id + '/questions/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        })
    };

    this.getChoicesById = function (token, prod_id, quest_id, limit, offset,ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/choices/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        })
    };
    this.getProductRulesById = function (token, prodRule_id, limit, offset, ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'products/' + prodRule_id  + '/rules/?limit=' + limit +'&offset=' + offset + '&ordering=' + ordering,
            headers: {
                'Authorization': token
            }
        })
    };


    //Get list of all choices
    this.getChoicesByStatus = function(token){
        return $http({
            method: "GET",
            url: this.domain + 'choices/?status=1',
            headers: {
                'Authorization': token
            }
        })
    };

    this.updateProduct = function (token, prod_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'products/' + prod_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.updateQuestion = function (token, prod_id, quest_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.updateChoice = function (token, prod_id, quest_id, choice_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/' + choice_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };
    this.deleteProduct = function (token, prod_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'products/' + prod_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };

    this.deleteQuestion = function (token, prod_id, quest_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };

    this.deleteChoice = function (token, prod_id, quest_id, choice_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/' + choice_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };


    this.addProduct = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'products/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.addQuestion = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'questions/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.addChoice = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'choices/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    // Type
    //Retrieving Type
    this.getType = function (token,limit,offset,ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'types/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        })
    };
    //Retrieving Category
    this.getCategoryById = function (token, type_id) {
        return $http({
            method: "GET",
            url: this.domain + 'types/' + type_id + '/categorys/',
            headers: {
                'Authorization': token
            }
        })
    };

    this.getCategory = function(token){
        return $http({
            method: "GET",
            url: this.domain + 'categorys/?limit=50&offset=0',
            headers: {
                'Authorization': token
            }
        })
    };
    //Retrieving Category level
    this.getCategoryLevelById = function (token, type_id, category_id ){
        return $http({
            method: "GET",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/levels/',
            headers: {
                'Authorization': token
            }
        })
    };

    this.getCategoryLevel = function(token){
       return $http({
           method: "GET",
           url: this.domain + 'category-levels/?limit=500&offset=0',
           headers: {
               'Authorization': token
           }
       })
    }
    //Updating Type
    this.updateType = function (token, type_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'types/' + type_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };
    //Updating Category
    this.updateCategory = function (token, type_id, category_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };
    //Updating Category Level
    this.updateCategoryLevel = function (token, type_id, category_id, categoryLevel_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/' + categoryLevel_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };
    //Delete Type
    this.deleteType = function (token, type_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'types/' + type_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };
    //delete category
    this.deleteCategory = function (token, type_id, category_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };
    //Delete category Level
    this.deleteCategoryLevel = function (token, type_id, category_id, categoryLevel_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/' + categoryLevel_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };
    //Add type
    this.addType = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'types/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.addCategory = function (token, type_id, data) {
        return $http({
            method: "POST",
            url: this.domain + 'types/' + type_id + '/categorys/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.addCategoryLevel = function (token, type_id, category_id, data) {
        return $http({
            method: "POST",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/levels/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    //Venues
    this.getVenues = function(token,limit,offset,ordering){
        return $http({
            method: "GET",
            url: this.domain + 'venues/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        })
    };

    //Add Venue
    this.addVenue = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'venues/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    //Update Venue
    this.updateVenue = function (token, venue_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'venues/' + venue_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    //Delete Venue
    this.deleteVenue = function (token, venue_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'venues/' + venue_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };
    this.updateOpeningHours = function (token, opening_hour_id, data){
        return $http({
            method:"PUT",
            url :this.domain + 'opening-hours/' +  opening_hour_id + '/',
            data: data,
            headers :{
                'Authorization':token
            }
        })
    };
    //Update venue Extra
    this.updateVenueExtra = function (token, venue_id, data ){
        return $http({
            method:"PUT",
            url :this.domain + 'venues/' +  venue_id + '/extra/',
            data: data,
            headers :{
                'Authorization':token
            }
        })
    };
    //venue opening hours
    this.getOpeningHours = function (token){
      return $http({
          method :"GET",
          url :this.domain + 'opening-hours/',
          headers : {
              'Authorization':token
          }
      })
    };
    //venue_Extra
    this.getVenueExtra = function (token){
        return $http({
            method :"GET",
            url : this.domain + 'venue-extras/',
            headers : {
                'Authorization': token
            }
        })
    };
    //Get list of rules
    this.getRules = function(token){
        return $http({
            method: "GET",
            url: this.domain + 'rules/',
            headers: {
                'Authorization': token
            }
        })
    };

    //Add Rules
    this.addRule = function(token, data){
        return $http({
            method: "POST",
            url: this.domain + 'rules/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    //Update Rule
    this.updateRule = function(token, rule_id, data){
        return $http({
            method: "PUT",
            url: this.domain + 'rules/' + rule_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        });
    };

    //Delete Rule
    this.deleteRule = function (token, rule_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'rules/' + rule_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };

    //Common function for get request with token
    this.get = function(token, url){
        console.log('Url:', url)
        return $http({
            method: "GET",
            url: this.domain + url,
            headers: {
                'Authorization': token
            }
        });
    };

});
