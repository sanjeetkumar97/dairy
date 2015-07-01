import { dairies,DairyCollection} from './collection';
import {itemDetailModel} from './model';

var tempDairies = dairies;

class CommonView extends Backbone.View {
	constructor(options){
		this.events = {
	     'click #submitEntry':'submitEntry',
	     'click .dairy-detail':'showDairyDetail',
	     'click #byLabel':'filterByLabel',
	     'click #byText':'filterByText',
	     'click #byDate':'filterByDate',
	     'click #recentEntry':'getRecentEntry'
	    }

		this.source = $('#common-template').html();
		super(options);
	}
	getRecentEntry(){
		$('#popup').empty();
    	var spinnerView = new SpinnerView();
   		$('#popup').html(spinnerView.render().$el);

		//alert('latest Entry');
		jQuery.get('/api/recentEntry',function(data,textStatus,jqXHR){
			
			data.id = data._id;
			
		//	myTodo.set("title", "Title attribute set through Model.set().");
			itemDetailModel.set('id',data.id);

			var myDate = data.date;
			var year = myDate.slice(0,4);
			var month = myDate.slice(5,7);
		    var dat = myDate.slice(8,10);
			data.date = dat+"-"+month+"-"+year;


			itemDetailModel.set('date',data.date);
			itemDetailModel.set('label',data.label);
			itemDetailModel.set('text',data.text);

			 $('#popup').empty();
	         var itemDetailView = new ItemDetailView({model:itemDetailModel});
	   		 $('#popup').html(itemDetailView.render().$el);

		});
	}
	filterByLabel(){
		$('#box').empty();
    	var spinnerView = new SpinnerView();
   		$('#box').html(spinnerView.render().$el);

		document.getElementById("byText").checked = false;
		document.getElementById("byDate").checked = false;

		$('#text').val('');
		$('#sDate').val('');
		$('#eDate').val('');
		
		if(document.getElementById("byLabel").checked == true)
		{
			var label = $('#label').val();
			jQuery.ajax({
            url:'/api/label',
            type:"POST",
            data:{
              'label':label
            },
            success:function(data,textStatus,jqXHR){ 
              $('#box').empty();
              for(var i=0;i<data.length;i++){
                data[i].id = data[i]._id;
              }
              dairies.reset([]);
              dairies.add(data);
              console.log(dairies);
            }
          });  
		}
		else
		{
			$('#box').empty();
			dairies.reset([]);
		   $('#label').val('');
		   dairies.fetch(); 
		}
	}

	filterByText(){
		$('#box').empty();
    	var spinnerView = new SpinnerView();
   		$('#box').html(spinnerView.render().$el);

		if(document.getElementById("byText").checked == true)
		{
			document.getElementById("byLabel").checked = false;
			document.getElementById("byDate").checked = false;

			$('#label').val('');
			$('#sDate').val('');
			$('#eDate').val('');

			var text = $('#text').val();
			jQuery.ajax({
            url:'/api/text',
            type:"POST",
            data:{
              'text':text
            },
            success:function(data,textStatus,jqXHR){ 
            	$('#box').empty();
              for(var i=0;i<data.length;i++){
                data[i].id = data[i]._id;
              }
              dairies.reset([]);
              dairies.add(data);
              console.log(dairies);
            }
          });  
		}
		else
		{
			$('#box').empty();
			dairies.reset([]);
		   $('#text').val('');
		   dairies.fetch(); 
		}
	}

	filterByDate(){
		$('#box').empty();
    	var spinnerView = new SpinnerView();
   		$('#box').html(spinnerView.render().$el);

		if(document.getElementById("byDate").checked == true)
		{
			document.getElementById("byLabel").checked = false;
			document.getElementById("byText").checked = false;

			$('#label').val('');
			$('#text').val('');

			var sDate = $('#sDate').val();
			var eDate = $('#eDate').val();

			jQuery.ajax({
            url:'/api/date',
            type:"POST",
            data:{
              'sDate':sDate,
              'eDate':eDate
            },
            success:function(data,textStatus,jqXHR){ 
              $('#box').empty();
              for(var i=0;i<data.length;i++){
                data[i].id = data[i]._id;
              }
              dairies.reset([]);
              dairies.add(data);
              console.log(dairies);
            }
          });  
		}
		else
		{
		   $('#box').empty();
		   dairies.reset([]);
		   $('#sDate').val('');
		   $('#eDate').val('');
		   dairies.fetch(); 
		}
	}

	submitEntry(e){
		e.preventDefault();	
		$('#box').empty();
    	var spinnerView = new SpinnerView();
   		$('#box').html(spinnerView.render().$el);

		//var entryDate = $('#entryDate').val();
		var entryDate = document.getElementById('entryDate').value;
		var entryLabel = $('#entryLabel').val();
		var entryText = $('#entryText').val();
		jQuery.post('/api/dairies',{
		'date':entryDate,
		'label':entryLabel,
		'text':entryText
	    },function(data,textStatus,jqXHR){
		$('#box').empty();
		
		data.id = data._id;
		console.log(data.date);

		var myDate = data.date;
	
		var year = myDate.slice(0,4);
		var month = myDate.slice(5,7);
	    var dat = myDate.slice(8,10);

		data.date = dat+"-"+month+"-"+year;
		
		dairies.add(data);
		
		$('#entryDate').val('');
		$('#entryLabel').val('');
		$('#entryText').val('');

	});
	   
	}

	showDairyDetail(e){

	    e.preventDefault();
	    var id = $(e.currentTarget).data("id");
	    itemDetailModel = dairies.get(id);
	   // console.log( itemDetailModel);
	    $('#popup').empty();
	    var itemDetailView = new ItemDetailView({model:itemDetailModel});
	    $('#popup').html(itemDetailView.render().$el);
 	 }

	render(){
		var template = Handlebars.compile(this.source);
		var html = template(this.model.toJSON());
		this.$el.html(html);
		return this;
	}
}

class DairyView extends Backbone.View {
	constructor(options){
		super(options);
		this.source = $('#dairy-template').html();
   	   
   	    this.listenTo(this.collection, 'add', this.render);
   	    this.listenTo(this.collection, 'reset', this.render);
   	    this.listenTo(this.collection, 'sync', this.render);

   	    
	}
	render(){
		var template = Handlebars.compile(this.source);
		var html = template(this.collection.toJSON());
		this.$el.html(html);
		return this;
	}
}

class ItemDetailView extends Backbone.View {
  constructor(options){
    this.events = {
      'click #close-Detail':'closeDetail'
    }
    this.source = $('#item-detail-template').html();
    super(options);
  }
  closeDetail (){
    this.remove();
  }
  render (){
    var template = Handlebars.compile(this.source);
    var html = template(this.model.toJSON());
    this.$el.html(html);
    return this;
  }
}

class SpinnerView extends Backbone.View{
  constructor(options){
    super(options);
    this.source = $('#spinner-template').html();
  }
  render () {
    var template = Handlebars.compile(this.source);
    var html = template();
    this.$el.html(html);
    return this;
  }
}

export {CommonView, DairyView};