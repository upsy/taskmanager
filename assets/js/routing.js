var App = {};
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



jquery.pnotify

notifier = new Backbone.View.extend({
	initialize: function  () {
		vent.bind("notification:show", this.showText, this);
	},

	showNotif: function  ( pam_obj ) {
		$.pnotify( pam_obj );
	}

});


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
STSBU-01N091
