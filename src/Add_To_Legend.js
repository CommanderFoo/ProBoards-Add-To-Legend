(class {

	static init(){
		this.PLUGIN_ID = "pd_add_to_legend";
		this.items = [];
		this.route = pb.data("route");

		this.setup();

		if(this.items.length > 0){
			$(this.ready.bind(this));
		}
	}

	static ready(){
		let $legend = $(".container.legend");

		if($legend.length == 1){
			let $tr = $legend.find("tr:last");

			for(let i = 0; i < this.items.length; ++ i){
				$tr.append("<td><img src='" + this.items[i].image + "' /> <span>" + this.items[i].text + "</span></td>");
			}
		}
	}

	static setup(){
		let plugin = pb.plugin.get(this.PLUGIN_ID);

		if(plugin && plugin.settings){
			let settings = plugin.settings;

			if(settings.items.length){
				for(let i = 0; i < settings.items.length; ++ i){
					let home_check = ((this.route.name == "forum" || this.route.name == "home") && settings.items[i].location.indexOf("1") > -1);
					let board_check = (this.route.name == "board" && settings.items[i].location.indexOf("2") > -1);

					if(home_check || board_check){
						this.items.push(settings.items[i]);
					}
				}
			}
		}
	}

}).init();