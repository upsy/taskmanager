var ttip = {
	o: '',
	t: 5000,
	setinit: function(name) {
		this.o = name;
		this.check();
	},
	add: function(message) {
		$(this.o).show();
		var i = $(this.o).find('div').length;
		if (i>0) i = eval($(this.o).find('div:last').attr('id')) + 1;
		$(this.o).append('<div id="'+i+'">'+message+'</div>');
		setTimeout(function(){ $(ttip.o).find('div#'+i).slideUp('slow', function(){ $(this).remove(); ttip.check(); }); }, ttip.t);
	},

	load: function(message){
		$(this.o).show();
		var i = $(this.o).find('div').length;
		var e = $(this.o).find('div[name="loading"]').length;
		if (i>0) i = eval($(this.o).find('div:last').attr('id')) + 1;
		if (e==0) 
			$(this.o).append('<div id="'+i+'" name="loading" style="background-color:green;">'+message+'</div>');
// 		setTimeout(function(){ $(ttip.o).find('div#'+i).slideUp('slow', function(){ $(this).remove(); ttip.check(); }); }, ttip.t);
	},

	label: function(message){
		$(this.o).show();
		var i = $(this.o).find('div').length;
		var e = $(this.o).find('div[name="label"]').length;
		if (i>0) i = eval($(this.o).find('div:last').attr('id')) + 1;
		if (e>0)
			$(this.o).find('div[name="label"]').remove(); 
		$(this.o).append('<div id="'+i+'" name="label" style="background-color:blue;">'+message+'</div>');
		setTimeout(function(){ $(ttip.o).find('div[name="label"]').slideUp('slow', function(){ $(this).remove(); ttip.check(); }); }, ttip.t);
		
	},

	unload: function(){
		$(this.o).find('div[name="loading"]').delay(500).slideUp('slow', function(){ $(this).remove(); ttip.check(); });
	},

	check: function(){
		if ($(this.o).find('div').length==0) {
			$(this.o).hide();
		} else {
			$(this.o).show();
		}
	}
}

//ttip.setinit($("#ttip"));
