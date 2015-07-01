class CommonModel extends Backbone.Model{
	defaults(){
		return {
			//email:'mymail@gmail.com'
		}
	}
}

class DairyModel extends Backbone.Model{
	defaults() {
	    return {
	      id : 0,
	      date: '0000-00-00',
	      label: 'some dairy label',
	      text:'some dairy text'
	    };
  	}

  	parse(response,xhr){
			response.id = response._id;

			var myDate = response.date;
			var year = myDate.slice(0,4);
			var month = myDate.slice(5,7);
		    var dat = myDate.slice(8,10);
			response.date = dat+"-"+month+"-"+year;


			return response;
		}
	
}

class ItemDetailModel extends Backbone.Model{
	defaults() {
	    return {
	      id : 0,
	      date: '0000-00-00',
	      label: 'some dairy label',
	      text:'some dairy text'
	    };
  	}
	
}

var itemDetailModel = new ItemDetailModel();


//--------------------------
export {CommonModel,DairyModel,itemDetailModel};