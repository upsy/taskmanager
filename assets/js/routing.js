var App = {};

vent =  _.extend({},Backbone.Events);

Router = Backbone.Router.extend({

	routes: {
		"": "showIndex", 
		"company": "showAllCompanies",
		"company/:id": "showCompanyByID"
	},

	showIndex: function(){
		console.log(">> show main index page!");
	},

	showAllCompanies: function() {
		console.log(">> show all companies");
	},

	showCompanyByID: function(c_id) {
		console.log(">> show company id: "+ c_id);
	}

});

new Router();
Backbone.history.start();

console.log("hey!");



//jquery.pnotify

App.Notifier =  Backbone.View.extend({
	initialize: function  () {
		console.log("init");
		vent.bind("notification:show", this.showNotif, this);
	},

	showNotif: function  ( pam_obj ) {
		console.log(" >> showNotify: ", pam_obj)
		$.pnotify( pam_obj );
	}

});

notifier = new App.Notifier();


//notifier = new App.Notifier();

vent.trigger("notification:show", 
				{ 
					title:"Text Demo.. ", 
					text: "Lorem ipsum laboris ex eu et deserunt aute sint aliquip aute esse cillum labore id fugiat in. ", 
					type: "success" 
				}
			);

// vent.trigger("notification:info", "Info Demo.. ");
// vent.trigger("notification:error", "Error Demo.. ");
// vent.trigger("notification:success", "Success Demo.. ");
// STSBU-01N091
