$(document).ready(function(event){
	console.log('doc ready -- start app');

	App = Ember.Application.create();

	// use fixture store for now
	App.ApplicationAdapter = DS.FixtureAdapter;


	// MODELS
	App.List = DS.Model.extend({
		name: DS.attr(),
		list_items: DS.attr()
	});


	// ROUTES

	App.Router.map(function() {
		this.resource('lists');
		this.resource('list', {path: '/list/:list_id'});
	});

	App.IndexRoute = Ember.Route.extend({
	});

	App.ListsRoute = Ember.Route.extend({
		model: function() {
			return this.get('store').find('list');
		}
	});

	App.ListRoute = Ember.Route.extend({
		model: function(params) {
			return this.get('store').find('list', params.list_id);
		},
		
		actions: {
			delete_item: function(item_id) {
				console.log('delete item! but which one??? id:'+item_id);
				this.get('controller').delete(item_id);
			}
		}
	});

	// CONTROLLERS

	App.ListController = Ember.ObjectController.extend({
		itemCount: function() {
			return this.get('list_items.length')
		}.property('list_items.length'),
		
		delete: function(item_id) {
			console.log('delete an item id:'+item_id);
			var found = this.get('list_items').findBy('id', item_id);
			console.log(found.name+' at index '+this.get('list_items').indexOf(found));
			
			var new_list_items = this.get('list_items').without(found);
			this.set('list_items', new_list_items);
		}
	});



	// FIXTURES

/*
	App.List.FIXTURES = [
		{
			id: 10001,
			name: 'Gift List 10001',
			list_items: [
				{id: 900, name: 'Fine Whiskey', price: 42.99},
				{id: 901, name: '1952 Bordeaux', price: 123.00},
			]
		},
		{
			id: 10002,
			name: 'Gift List 10002',
			list_items: [
				{id: 900, name: 'Fine Whiskey', price: 42.99},
				{id: 907, name: 'Expensive Scotch', price: 400.00},
				{id: 911, name: 'Cheap Beer', price: 2.90},
				{id: 922, name: 'Thunderbird', price: 4.95},
				{id: 999, name: 'PBR (Case)', price: 12.95},
			]
		}
	];
*/

	App.List.FIXTURES = [
	{
		"__type": "GiftListResult",
		"id": "C420C604-A5F6-49DD-B769-7827478C9979",
		"name": "Gifts for my family",
		"list_items": [{
			"item_id": 55071,
			"name": "Redhook Long Hammer I.P.A.",
			"price": 7.99,
			"image_url": "94.jpg"
		}, {
			"item_id": 55073,
			"name": "Redhook E.S.B.",
			"price": 7.99,
			"image_url": "97.jpg"
		}, {
			"item_id": 55075,
			"name": "Coors",
			"price": 11.49,
			"image_url": "101.jpg"
		}]
	},
	{
		"__type": "GiftListResult",
		"id": "C420C604-BEER-49DD-B769-7827478C9980",
		"name": "Office Party Needs",
		"list_items": [{
			"item_id": 9010,
			"name": "PBR Case",
			"price": 17.99,
			"image_url": "9010.jpg"
		}, {
			"item_id": 55073,
			"name": "Redhook E.S.B.",
			"price": 7.99,
			"image_url": "97.jpg"
		}, {
			"item_id": 9012,
			"name": "Bud Light 12 Pack",
			"price": 11.49,
			"image_url": "9012.jpg"
		}, {
			"item_id": 9013,
			"name": "Barefoot Shiraz",
			"price": 5.49,
			"image_url": "9013.jpg"
		}]
	}
];



});