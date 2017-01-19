import DisplayObjectContainer from './DisplayObjectContainer';
/**
 * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM.
 *
 * @class DOMElement
 * @param type [any=null] Either a jQuery object or JavaScript template string reference you want to use as the view. Check out the examples below.
 * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
 * @extends DisplayObjectContainer
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires DisplayObjectContainer
 * @requires BaseEvent
 * @requires TemplateFactory
 * @requires ComponentFactory
 * @requires jQuery
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     // Example: Using DOMElement without extending it.
 *     let aLink = new DOMElement('a', {text: 'Google', href: 'http://www.google.com', 'class': 'externalLink'});
 *     this.addChild(aLink);
 *
 *     // Example: A view passing in a jQuery object.
 *     let view = new CustomView($('.selector'));
 *     this.addChild(view);
 *
 *     // Example: A view extending DOMElement while passing in a jQuery object.
 *     class ClassName extends DOMElement {
 *
 *          constructor($element) {
 *              super($element);
 *          }
 *
 *          create() {
 *              super.create();
 *
 *              // Create and add your child objects to this parent class.
 *          }
 *
 *          enable() {
 *              if (this.isEnabled === true) { return; }
 *
 *              // Enable the child objects and add any event listeners.
 *
 *              super.enable();
 *          }
 *
 *          disable() {
 *              if (this.isEnabled === false) { return; }
 *
 *              // Disable the child objects and remove any event listeners.
 *
 *              super.disable();
 *          }
 *
 *          layout() {
 *              // Layout or update the child objects in this parent class.
 *          }
 *
 *          destroy() {
 *              this.disable();
 *
 *              // Destroy the child objects and references in this parent class to prevent memory leaks.
 *
 *              super.destroy();
 *          }
 *
 *     }
 *
 *     // Example: A view extending DOMElement with a precompiled JavaScript template reference passed in.
 *     class ClassName extends DOMElement {
 *
 *          constructor() {
 *              _super();
 *          }
 *
 *          create() {
 *              super.create('templates/home/homeTemplate', {data: 'some data'});
 *
 *              // Create and add your child objects to this parent class.
 *          }
 *
 *          enable() {
 *              if (this.isEnabled === true) { return; }
 *
 *              // Enable the child objects and add any event listeners.
 *
 *              super.enable();
 *          }
 *
 *          disable() {
 *              if (this.isEnabled === false) { return; }
 *
 *              // Disable the child objects and remove any event listeners.
 *
 *              super.disable();
 *          }
 *
 *          layout() {
 *              // Layout or update the child objects in this parent class.
 *          }
 *
 *          destroy() {
 *              this.disable();
 *
 *              // Destroy the child objects and references in this parent class to prepare for garbage collection.
 *
 *              super.destroy();
 *          }
 *
 *     }
 */
declare class DOMElement extends DisplayObjectContainer {
    /**
     * Tracks number of times an element's width has been checked
     * in order to determine if the element has been added
     * to the DOM.
     *
     * @property checkCount
     * @type {number}
     * @public
     */
    checkCount: number;
    /**
     * A cached reference to the DOM Element
     *
     * @property element
     * @type {HTMLElement}
     * @default null
     * @public
     */
    element: HTMLElement;
    /**
     * A cached reference to the jQuery DOM element
     *
     * @property $element
     * @type {JQuery}
     * @default null
     * @public
     */
    $element: JQuery;
    /**
     * If a jQuery object was passed into the constructor this will be set as true and
     * this class will not try to add the view to the DOM since it already exists.
     *
     * @property _isReference
     * @type {boolean}
     * @protected
     */
    protected _isReference: boolean;
    /**
     * Holds onto the value passed into the constructor.
     *
     * @property _type
     * @type {string}
     * @default null
     * @protected
     */
    protected _type: string;
    /**
     * Holds onto the value passed into the constructor.
     *
     * @property _params
     * @type {any}
     * @default null
     * @protected
     */
    protected _params: any;
    constructor(type?: any, params?: any);
    /**
     * The create function is intended to provide a consistent place for the creation and adding
     * of children to the view. It will automatically be called the first time that the view is added
     * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
     * their overridden methods.
     *
     * This method gets called once when the child view is added to another view. If the child view is removed
     * and added to another view the create method will not be called again.
     *
     * @method create
     * @param type [string=div] The HTML tag you want to create or the id/class selector of the template or the pre-compiled path to a template.
     * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
     * @returns {any} Returns an instance of itself.
     * @public
     * @chainable
     * @example
     *     // EXAMPLE 1: By default your view class will be a div element:
     *     create() {
     *          super.create();
     *
     *          this._childInstance = new DOMElement();
     *          this.addChild(this._childInstance);
     *     }
     *
     *     // EXAMPLE 2: But lets say you wanted the view to be a ul element:
     *     create() {
     *          super.create('ul');
     *     }
     *
     *     // Then you could nest other elements inside this base view/element.
     *     create() {
     *          super.create('ul', {id: 'myId', 'class': 'myClass anotherClass'});
     *
     *          let li = new DOMElement('li', {text: 'Robert is cool'});
     *          this.addChild(li);
     *     }
     *
     *     // EXAMPLE 3: So that's cool but what if you wanted a block of html to be your view. Let's say you had the below
     *     // inline Handlebar template in your html file.
     *     <script id="todoTemplate" type="text/template">
     *          <div id="htmlTemplate" class="js-todo">
     *              <div id="input-wrapper">
     *                  <input type="text" class="list-input" placeholder="{{ data.text }}">
     *                  <input type="button" class="list-item-submit" value="Add">
     *              </div>
     *          </div>
     *     </script>
     *
     *     // You would just pass in the id or class selector of the template which in this case is "#todoTemplate".
     *     // There is a second optional argument where you can pass data for the Handlebar template to use.
     *     create() {
     *          super.create('#todoTemplate', { data: this.viewData });
     *
     *     }
     *
     *     // EXAMPLE 4: Or maybe you're using grunt-contrib-handlebars, or similar, to precompile hbs templates
     *     create() {
     *          super.create('templates/HomeTemplate', {data: "some data"});
     *
     *     }
     */
    create(type?: string, params?: any): any;
    /**
     * @overridden DisplayObjectContainer.addChild
     * @method addChild
     * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
     * @returns {any} Returns an instance of itself.
     * @chainable
     * @example
     *     this.addChild(domElementInstance);
     */
    addChild(child: DOMElement): any;
    /**
     * Adds the sjsId to the DOM element so we can know what what Class object the HTMLElement belongs too.
     *
     * @method _addClientSideId
     * @param child {DOMElement} The DOMElement instance to add the sjsId too.
     * @protected
     */
    protected _addClientSideId(child: DOMElement): void;
    /**
     * Removes the sjsId and class type from the HTMLElement.
     *
     * @method _removeClientSideId
     * @param child {DOMElement} The DOMElement instance to add the sjsId too.
     * @protected
     * @return {boolean}
     */
    protected _removeClientSideId(child: any): boolean;
    /**
     * Called when the child object is added to the DOM.
     * The method will call {{#crossLink "DOMElement/layout:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED_TO_STAGE event.
     *
     * @method _onAddedToDom
     * @protected
     */
    protected _onAddedToDom(child: DOMElement): void;
    /**
     * @overridden DisplayObjectContainer.addChildAt
     */
    addChildAt(child: DOMElement, index: number): any;
    /**
     * @overridden DisplayObjectContainer.swapChildren
     */
    swapChildren(child1: DOMElement, child2: DOMElement): any;
    /**
     * @overridden DisplayObjectContainer.getChildAt
     */
    getChildAt(index: number): DOMElement;
    /**
     * Returns a DOMElement object with the first found DOM element by the passed in selector.
     *
     * @method getChild
     * @param selector {string} DOM id name, DOM class name or a DOM tag name.
     * @returns {DOMElement}
     * @public
     */
    getChild(selector: string): DOMElement;
    /**
     * Gets all the HTML elements children of this object.
     *
     * @method getChildren
     * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children of this parent element.
     * @returns {Array.<DOMElement>} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
     * If the 'data-sjs-id' property exists is on an HTML element a DOMElement will not be created for that element because it will be assumed it already exists as a DOMElement.
     * @public
     */
    getChildren(selector?: string): Array<DOMElement>;
    /**
     * Removes the specified child object instance from the child list of the parent object instance.
     * The parent property of the removed child is set to null and the object is garbage collected if there are no other references
     * to the child. The index positions of any objects above the child in the parent object are decreased by 1.
     *
     * @method removeChild
     * @param child {DOMElement} The DisplayObjectContainer instance to remove.
     * @returns {any} Returns an instance of itself.
     * @override
     * @public
     * @chainable
     */
    removeChild(child: DOMElement, destroy?: boolean): any;
    /**
     * Removes the child display object instance that exists at the specified index.
     *
     * @method removeChildAt
     * @param index {int} The index position of the child object.
     * @public
     * @chainable
     */
    removeChildAt(index: number, destroy?: boolean): any;
    /**
     * Removes all child object instances from the child list of the parent object instance.
     * The parent property of the removed children is set to null and the objects are garbage collected if no other
     * references to the children exist.
     *
     * @method removeChildren
     * @returns {DOMElement} Returns an instance of itself.
     * @override
     * @public
     * @chainable
     */
    removeChildren(destroy?: boolean): any;
    /**
     * @overridden DisplayObjectContainer.destroy
     */
    destroy(): void;
    /**
     * A way to instantiate view classes by found html selectors.
     *
     * Example: It will find all children elements of the {{#crossLink "DOMElement/$element:property"}}{{/crossLink}} property with the 'js-shareEmail' selector.
     * If any selectors are found the EmailShareComponent class will be instantiated and pass the found jQuery element into the contructor.
     *
     * @method createComponents
     * @param componentList (Array.<{ selector: string; component: DOMElement }>
     * @return {Array.<DOMElement>} Returns all the items created from this createComponents method.
     * @public
     * @chainable
     * @example
     *      create() {
     *          super.create();
     *
     *          this.createComponents([
     *              {selector: '.js-shareEmail', component: EmailShareComponent},
     *              {selector: '.js-pagination', component: PaginationComponent},
     *              {selector: '.js-carousel', component: CarouselComponent}
     *          ]);
     *      }
     */
    createComponents(componentList: Array<any>): Array<DOMElement>;
    /**
     * Only use this once per application and use used on your main application Class.
     * This selects HTML element that you want the application to have control over.
     * This method starts the lifecycle of the application.
     *
     * @method appendTo
     * @param type {any} A string value where your application will be appended. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
     * @param [enabled=true] {boolean} Sets the enabled state of the object.
     * @example
     * <b>Instantiation Example</b><br>
     * This example illustrates how to instantiate your main application or root class.
     *
     *      const app = new MainClass();
     *      app.appendTo('body');
     *
     */
    appendTo(type: any, enabled?: boolean): any;
}
export default DOMElement;
