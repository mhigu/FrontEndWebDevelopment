$(function(){
    const model = [
        {
            name: 'cat1',
            src: 'img/cat1.jpg',
            counter: 0
        },
        {
            name: 'cat2',
            src: 'img/cat2.jpg',
            counter: 0
        }
    ];

    const octopus = {
        getAllCats: function(){
            return model;
        },
        
        getCatByIndex: function(index){
            return model(index);
        },

        incrementCatCounter: function(index){
            model(index).counter++;
        },

        init: function(){
            catListview.init();
            catDisplayView.init();
        }
    };

    const catListview = {
        init: function(){
            let catList = $('.cat-list');
            const cats = octopus.getAllCats();
            console.log(cats);
            cats.forEach(cat => {
                console.log(cat);
                catList.append(`<ul>${cat.name}</ul>`);
            });
        }
    };

    const catDisplayView = {
        init: function(){
            console.log('display view init() called.');
        },

        render: function(index){
            console.log('function render() called.');
            octopus.incrementCatCounter(index);
        }

    };

    octopus.init();
});