/// definition of tracker modele: PixelPP which means pixel++
var app = angular.module('PixelPP',[]);

app.config(function(){

});
/**
* run the modules
*/
app.run(function(){
	/// automatically send page view actions
	$("body").append("<div id=\"ptrack-container\"></div>");
});

/// define some useful directives
app.service('TrackerService',['$location',function($location){
	this.serverUrl = "http://dev.ptrack.com/pixel.php";

	this.createPixelImage = function(getParams){
		var getRequestStr = "";
		angular.forEach(getParams,function(v,k){
			getRequestStr += ((getRequestStr == "" ? "?" :"&") + k + "=" + v); 
		});
		var imgSrcUrl = this.serverUrl + getRequestStr;
		var imgElement = "<img src=\"" + imgSrcUrl + "\" width=1 height=1 />";
		$("#ptrack-container").append(imgElement);
	};

	this.getUrlParts = function(){
		return {
			protocol: $location.protocol(),
			port: $location.port(),
			host: $location.host(),
			path: $location.path(),
			params: $location.search()
		};
	}

	/**
	* generate an event and send to server
	*/
	this.event = function(name,params){
		paramsJson = encodeURIComponent(angular.toJson(params));
		this.createPixelImage({name: name, param: paramsJson});
	}

	/// generate cookie id
	this.generateCookie = function(){
		
	}

	this.pageViewEvent = function(){
		var name = "PG";
		var params = this.getUrlParts();
		this.event(name,params);
	}

}]);

app.directive('pageView',['TrackerService',function(TrackerService){
	return function(scope,element,attrs){
		TrackerService.pageViewEvent();
	}
}]);

