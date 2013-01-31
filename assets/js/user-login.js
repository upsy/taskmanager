var serverPath = "http://localhost/taskmanager/inc/api"

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};




var App = {}

App.UserModel = Backbone.Model.extend({
	defaults: {
  		'user_name': '',
  		'user_email': '',
  		'user_password': ''
  	},
  	url: serverPath + "/user"
});


App.UserFormView = Backbone.View.extend({
	el: "#user-login",

	initialize: function(){
		this.$form = $("#form-user");
		this.$form.validate();
		console.log(">> start");
		console.log(this.$form);
	},

	render: {

	},

	events: {
		"click #submitButton": "submitForm"
	},

	submitForm: function(ev){
		console.log(">> click");
		ev.preventDefault();
		var $form = this.$form;
		var obj = $form.serializeObject();
		if ($form.valid()){
			console.log(">> sending form!");
			var userModel = new App.UserModel();
			userModel.set(obj);
			console.log(obj);
			console.log(userModel);
			userModel.save({},{
				wait: true,
				success: function(model,response){
					console.log(">> SAVE SUCCESFUL!");
					console.log(response);
				},

				error: function(model, response){
					console.log(">> ERROR");
					console.log(response);
				}
			})
		}

	}
});


App.userForm = new App.UserFormView();