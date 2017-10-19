$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * @description Check existance of key.
         * @param {Object} obj
         * @param {String} key
         */
        function existKey(obj, key){
            return obj.hasOwnProperty(key);
        }

        /**
         * @description Check existance of url value.
         * @param {Object} obj 
         * @param {String} key
         */
        function hasVale(obj, key){
            return obj[key] !== '';
        }

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it ('url fefined and the value is not empty', function(){
            expect(allFeeds.every(obj => existKey(obj, 'url'))).toBe(true);
            expect(allFeeds.every(obj => hasVale(obj, 'url'))).toBe(true);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it ('name fefined and the value is not empty', function(){
            expect(allFeeds.every(obj => existKey(obj, 'name'))).toBe(true);
            expect(allFeeds.every(obj => hasVale(obj, 'name'))).toBe(true);
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function(){

        /* Write a test that ensures the menu element is
         * hidden by default. 
         */
        it ('has menu hidden', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. 
         * This test should have two expectations: 
         * 1. does the menu display when clicked 
         * 2. does it hide when clicked again
         */
        it ('changes visibility when the menu ison is clicked', function(){
            $('.icon-list').click();
            expect($('.menu-hidden').length).toBe(0);
            $('.icon-list').click();
            expect($('.menu-hidden').length).toBe(1);
        });
    });

    
    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });
        
        it ('There is at least a single .entry', function(done){
            expect($('.feed .entry').length).toBeGreaterThan(1);
            done();
        });
    });

    
    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var feedFirst = "";
        var feedSecond = "";
        
        // Setting up initial state
        beforeEach(function(done){
            loadFeed(0, function(){
                feedFirst = $('.feed .entry-link')[0].href; // Get contents URL
                done();
            });
        });

        it ('the content actually changes', function(done){

            // Setting up secondary state
            loadFeed(1, function(){
                feedSecond = $('.feed .entry-link')[1].href; // Get contents URL
                done();
            });
            
            // Compare contents URL and should be diffrent.
            expect(feedFirst !== feedSecond).toBe(true);
        });
    });
}());
