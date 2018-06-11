/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Ensures that each feed in allFeeds has a URL defined
         * and that the URL is not empty.
         */
         it('has a defined and valid URL', function(){
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });

        /* Loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
         it('has a defined and valid name', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    describe('The menu', function() {

        // Ensures the menu element is hidden by default.
         it('has to be hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         // Ensures the menu changes visibility when the menu icon is clicked.
          it('has to change visibility when the button is clicked', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    describe('Initial Entries', function(){

      beforeEach(function(done){
        loadFeed(0,function(){
          done();
        });
      });
        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
         it('should be properly loaded', function(done){
           expect($('.feed').length).toBeGreaterThan(0);
           done();
         });

         });

    describe('New Feed Selection', function() {
      let oldFeed, newFeed;
      beforeEach(function(done){
        oldFeed = $('.feed').children().html();
        let feeds = $('.feed-list').find('a');
        let id = 1 + Math.floor(Math.random()*(feeds.length - 1));
        loadFeed(id,function(){
          done();
        });
      });
        /* Ensures that when a new feed is loaded by the loadFeed function,
         * the content actually changes.
         */
         it('should trigger a change in the content', function(done) {
          newFeed = $('.feed').children().html();
          /* Compares the two first elements of the content. If they are
           * different, the content has necessarily changed.
           */
          expect(newFeed).not.toEqual(oldFeed);
          done();
         });
       });
}());
