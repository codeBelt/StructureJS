jest
    .dontMock('jquery')
    .dontMock('../../js/display/Stage')
    .dontMock('../../js/display/DOMElement')
;


//var jQuery = require('jquery');
//
//jQuery.fn.appendInput = function(id) {
//    jQuery(id).append("<input type='text' id='module' />");
//};
//
//describe('AppendInput jquery plugin', function() {
//    beforeEach(function(){
//        jQuery(document.body).append('<div id="content"></div>');
//    });
//    it("append input into content", function(){
//        jQuery.fn.appendInput("#content");
//        expect(jQuery('#content').find('#module').length).toBe(1);
//    });
//});

describe("DOMElement", function() {

    it("Added to DOM", function() {
// Set up our document body
        document.body.innerHTML =
            '<div class="js-stage">' +
            '  <span id="username" />' +
            '  <button id="button" />' +
            '</div>';


        //var html = require('fs').readFileSync('__tests__/display/app.html').toString();//http://www.phpied.com/jest-jquery-testing-vanilla-app/
        //console.log("html", html);


        //var jQuery = require('jquery');
        //var DOMElement = require('../../js/display/DOMElement');
        //var Stage = require('../../js/display/Stage');
        //
        //var app = new Stage();
        //app.appendTo('.js-stage');

        //console.log("app", app);
        console.log("document.body.innerHTML", document.body.innerHTML);

    });

});




//
//var DOMElement = require('../../js/display/DOMElement');
//
//describe("DOMElement", function() {
//
//    var view = new DOMElement();
//    var child = new DOMElement();
//
//    it("isEnabled", function() {
//        expect(child.isEnabled).toEqual(false);
//    });

    //it("addChild()", function() {
    //    view.addChild(child);
    //    expect(view.children[0]).toEqual(child);
    //});
    //
    //it("isEnabled", function() {
    //    expect(child.isEnabled).toEqual(true);
    //});
    //
    //it("numChildren", function() {
    //    expect(view.numChildren).toEqual(1);
    //});
    //
    //
    //
    ////        $element
    ////        _params
    ////        _type
    ////        checkCount
    ////        children
    ////        cid
    ////        element
    ////        height
    ////        numChildren
    ////        parent
    ////        unscaledHeight
    ////        unscaledWidth
    ////        width
    ////        x
    ////        y
    //
    ////        addChild
    ////        addChildAt
    ////        addEventListener
    ////        alpha
    ////        contains
    ////        createChildren
    ////        createComponents
    ////        destroy
    ////        disable
    ////        dispatchEvent
    ////        enable
    ////        getChild
    ////        getChildAt
    ////        getChildByCid
    ////        getChildIndex
    ////        getChildren
    ////        getEventListeners
    ////        getQualifiedClassName
    ////        layoutChildren
    ////        removeChild
    ////        removeChildAt
    ////        removeChildren
    ////        removeEventListener
    ////        swapChildren
    //
    //
    //it("isEnabled", function() {
    //    expect(child.isEnabled).toEqual(true);
    //});
    //
    //it("disable()", function() {
    //    child.disable();
    //    expect(child.isEnabled).toEqual(false);
    //});
    //
    //it("contains()", function() {
    //    expect(view.contains(child)).toEqual(true);
    //});
    //
    //it("getChildAt()", function() {
    //    expect(view.getChildAt(0)).toEqual(child);
    //});
    //
    //it("getChild()", function() {
    //    expect(view.getChild(child)).toEqual(child);
    //});
    //
    //it("getChildIndex()", function() {
    //    expect(view.getChildIndex(child)).toEqual(0);
    //});
    //
    //it("getChildByCid()", function() {
    //    expect(view.getChildByCid(child.cid)).toEqual(child);
    //});
    //
    //it("getQualifiedClassName()", function() {
    //    expect(view.getQualifiedClassName()).toEqual('DOMElement');
    //});



//});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/