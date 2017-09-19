// Code goes here

(function() {
  var app = angular.module('gemStore', ['store-directives']);

  app.controller('GalleryController', function() {
    this.imageIndex = 0;
    this.currentImageChange = function(imageNumber) {
      console.log(imageNumber);
      this.imageIndex = imageNumber || 0;
    };
  });

  app.controller('StoreController', function() {
    this.products = gems;
  });


  app.controller("ReviewController", function(){

    this.review = {};

    this.addReview = function(product){
      this.review.createdOn = Date.now();
      product.reviews.push(this.review);
      this.review = {};
    };

  });

  var gems = [{
    name: 'Pizza Box',
    description: "Our Classic Box is packed with beautiful fresh produce and all the fresh meats.",
      price: 11.66,
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
    images: [
      "img1/pizza1.jpg",
      "img1/pizza2.jpg",
      "img1/pizza3.jpg"
    ],
    reviews: [{
      stars: 5,
      body: "I love this meal!",
      author: "joe@thomas.com",
      createdOn: 1397490980837
    }, {
      stars: 1,
      body: "This box sucks.",
      author: "tim@hater.com",
      createdOn: 1397490980837
    }]
  }, {
    name: 'Bacon Spaghetti',
    description: "Origin of the Bloodstone is unknown, hence its low value. It has a very high shine and 12 sides.",
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
      price: 11.66,
    images: [
        "img1/pasta1.jpg",
        "img1/pasta2.jpg",
        "img1/pasta3.jpg"
    ],
    reviews: [{
      stars: 3,
      body: "I think this box was just OK, could honestly be yummy, IMO.",
      author: "JimmyDean@sausage.com",
      createdOn: 1397490980837
    }, {
      stars: 4,
      body: "It is very delicious",
      author: "gemsRock@alyssaNicoll.com",
      createdOn: 1397490980837
    }]
  }, {
    name: 'Fruits',
    description: "Get your bright eye and bushy tail on. Delicious seasonal fruit for the whole week. ",
    price:11.00,
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
    images: [
        "img1/fruit1.jpg",
        "img1/fruit2.jpg",
        "img1/fruit3.jpg"
    ],
    reviews: [{
      stars: 5,
      body: "It is awesome",
      author: "turtleguyy@zdn.me",
      createdOn: 1397490980837
    }, {
      stars: 5,
      body: "It just so easy",
      author: "LouisW407@gmail.com",
      createdOn: 1397490980837
    }, {
      stars: 5,
      body: "Big thumbs up",
      author: "nat@flatland.com",
      createdOn: 1397490980837
    }]
  }];

})();
