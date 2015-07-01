import {DairyModel} from './model';

class DairyCollection extends Backbone.Collection{
	constructor(options){
		super(options);
		this.model = DairyModel;
		this.url = '/api/dairies';
	}
}

var dairies = new DairyCollection();
    dairies.toJSON();
    dairies.fetch();


export {dairies,DairyCollection};