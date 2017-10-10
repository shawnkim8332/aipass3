angular.module('frontApp')
.controller('ProductController',function(){
	this.products=boxs;
});

var boxs=[
	{
	name:'Pizza Box',
	price:10,
	description:'Our Classic Box is packed with beautiful fresh produce and all the fresh meats.',
      item1: [{ing:"pizza base",
               quantity:1
     }],
    item2: [{ing:"onion",
        quantity:200,
        unit:"g"
    }],
    item3: [{ing:"Shaved Ham",
        quantity:100,
        unit:"g"
    }],
    item4: [{ing:"Cheese",
        quantity:100,
        unit:"g"
    }],
      item5: [{ing:"Tomato Paste",
          quantity:140,
          unit:"g"
      }],
	canPurchase:true,
	images:[{
		one:'../images/pizza1.jpg',
	}],
	},
	{
	name:'Spaghetti',
	price:12,
	description:'Origin of the Bloodstone is unknown, hence its low value. It has a very high shine and 12 sides.',
		item1: [{ing:"Spaghetti",
          quantity:200,
          unit:"g"
      }],
      item2: [{ing:"Bacon",
          quantity:100,
          unit:"g"
      }],
      item3: [{ing:"onion",
          quantity:50,
          unit:"g"
      }],
      item4: [{ing:"Cheese",
          quantity:100,
          unit:"g"
      }],
      item5: [{ing:"Light Cream",
          quantity:300,
          unit:"g"
      }],
	canPurchase:true,
	images:[{
	one:'../images/pizza2.jpg',
	}],
	},
	{
	name:'Fruits Box',
	price:14,
	description:'Get your bright eye and bushy tail on. Delicious seasonal fruit for the whole week.',
		      item1: [{ing:"Banana",
          quantity:4,
          unit:""
      }],
      item2: [{ing:"Kiwi",
          quantity:8,
          unit:""
      }],
      item3: [{ing:"Apple",
          quantity:4,
          unit:""
      }],
      item4: [{ing:"Blueberry",
          quantity:200,
          unit:"g"
      }],
      item5: [{ing:"Strawberry",
          quantity:300,
          unit:"g"
      }],
	canPurchase:true,
	images:[{
	one:'../images/pizza3.jpg',
	}],
	}
];