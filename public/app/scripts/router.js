
import {DairyView} from './view';
import {dairies} from './collection';

class Router extends Backbone.Router{
	constructor(){
		this.routes = {
			'': 'showDairy'
		}
		super();
	}
	
	showDairy(){
		var dairyView = new DairyView({collection:dairies});
		$('#wrapper').empty();
		$('#wrapper').html(dairyView.render().$el);
	}
	
}

export {Router} ;