(function  () {
	
	window.App = {
		Views : {},
		Models: {},
		Collections: {}
	}

	App.Models.Note = Backbone.Model.extend({

	});

	App.Collections.Notes = Backbone.Collection.extend({
		model: App.Models.Note,

		initialize: function(models, options){
			this.doc = options.doc;
		},

		url: function(){
			return this.doc.url() + "/notes";
		}



	});

	App.Models.Document = Backbone.Model.extend({
		initialize: function() {
			this.notes = new App.Collections.Notes([],{doc:this})
		},

		addNote: function  (text_str) {
			//this.note = new App.Models.Note({title: text_str});

			this.notes.create({ title: text_str });

		}
		
	});

	App.Collections.Documents = Backbone.Collection.extend({
		model: App.Models.Document,
		url  : '/documents',

		initialize: function  () {
			this.on("reset", this.getNotes, this);
		},

		getNotes: function  () {
			this.each(function(doc){
				doc.notes = new Notes([],{doc:doc});
				doc.notes.fetch();
			})
		}
	});



	App.documents = new App.Collections.Documents();
	App.documents.fetch();
	
})();