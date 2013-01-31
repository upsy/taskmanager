var serverPathTest = "http://localhost/taskmanager/inc/api";


(function  () {
	
	window.App = {
		Views : {},
		Models: {},
		Collections: {}
	}

	App.Models.Item = Backbone.Model.extend({

		urlRoot: serverPathTest + "/item",
		parse: function ( response ) {
			return response.item;
		},

		toJSON: function () {
			return {item: this.attributes};
		}
	});



	App.Models.Book = Backbone.Model.extend({

	});

	App.Collections.Books = Backbone.Collection.extend({
		model: App.Models.Book,

		// comparator: function  (model) {
		// 	return model.get("year");
		// }

		comparator: function  (a, b) {
			var year = a.get("year") - b.get("year");
			if (year === 0){
				return a.get("title") < b.get("title") ? -1 : 1;
			} else {
				return year;
			}
		}
	});


	App.books = new App.Collections.Books();

	App.books.add({ title: "BOOK B", year: 2011 });
	App.books.add({ title: "BOOK A", year: 2009 });
	App.books.add({ title: "BOOK B", year: 2012 });
	App.books.add({ title: "BOOK C", year: 2012 });
	App.books.add({ title: "BOOK A", year: 2012 });
	App.books.add({ title: "BOOK C", year: 2010 });

})();


