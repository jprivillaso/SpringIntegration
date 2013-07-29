(function() {
	brite.registerView("MainView", {emptyParent : true}, {
		create : function() {
			return render("tmpl-MainView");
		},
			
		postDisplay : function() {
		},
		
		events : {
			"click; .sendBtn" : function(event) {
				this.$el.trigger("DO_SELECT_BUTTON");
				$('.sendBtn').fadeOut(0);
			},
		},
		
		docEvents : {
			"DO_SELECT_BUTTON" : function(event) {
				var view = this;
				brite.display("MainContainer", view.$el.find(".MainView-MainContainer"));
				brite.display("TableContainer", view.$el.find(".MainView-TableContainer"));
			}
		}
	});
})();
