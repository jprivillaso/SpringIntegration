(function() {
	brite.registerView("MainView", {emptyParent : true}, {
		/**
		 * Renders the view
		 * @returns
		 */
		create : function() {
			return render("tmpl-MainView");
		},
			
		postDisplay : function() {
		},
		
		/**
		 * Default Events
		 */
		events : {
			"click; .sendBtn" : function(event) {
				this.$el.trigger("DO_SELECT_BUTTON");
				$('.sendBtn').fadeOut(0);
			},
		},
		
		/**
		 * Custom Events
		 */
		docEvents : {
			"DO_SELECT_BUTTON" : function(event) {
				var view = this;
				brite.display("MainContainer", view.$el.find(".MainView-MainContainer"));
				brite.display("TableContainer", view.$el.find(".MainView-TableContainer"));
			}
		}
	});
})();
