import DisplayObjectContainer from './DisplayObjectContainer';
import BaseEvent from '../event/BaseEvent';
import TemplateFactory from '../util/TemplateFactory';
import ComponentFactory from '../util/ComponentFactory';
import jQuery from '../plugin/jquery.eventListener';

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
class DOMElement extends DisplayObjectContainer
{
    /**
     * Tracks number of times an element's width has been checked
     * in order to determine if the element has been added
     * to the DOM.
     *
     * @property checkCount
     * @type {number}
     * @public
     */
    public checkCount:number = 0;

    /**
     * A cached reference to the DOM Element
     *
     * @property element
     * @type {HTMLElement}
     * @default null
     * @public
     */
    public element:HTMLElement = null;

    /**
     * A cached reference to the jQuery DOM element
     *
     * @property $element
     * @type {JQuery}
     * @default null
     * @public
     */
    public $element:JQuery = null;

    /**
     * If a jQuery object was passed into the constructor this will be set as true and
     * this class will not try to add the view to the DOM since it already exists.
     *
     * @property _isReference
     * @type {boolean}
     * @protected
     */
    protected _isReference:boolean = false;

    /**
     * Holds onto the value passed into the constructor.
     *
     * @property _type
     * @type {string}
     * @default null
     * @protected
     */
    protected _type:string = null;

    /**
     * Holds onto the value passed into the constructor.
     *
     * @property _params
     * @type {any}
     * @default null
     * @protected
     */
    protected _params:any = null;

    constructor(type:any = null, params:any = null)
    {
        super();

        if (type instanceof jQuery)
        {
            this.$element = type;
            this.element = this.$element[0];
            this._isReference = true;
        }
        else if (type)
        {
            this._type = type;
            this._params = params;
        }
    }

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
    public create(type:string = 'div', params:any = null):any
    {
        // Use the data passed into the constructor first else use the arguments from create.
        type = this._type || type;
        params = this._params || params;

        if (this.isCreated === true)
        {
            throw new Error('[' + this.getQualifiedClassName() + '] You cannot call the create method manually. It is only called once automatically during the view lifecycle and should only be called once.');
        }

        if (this.$element == null)
        {
            const html:string = TemplateFactory.create(type, params);
            if (html)
            {
                this.$element = jQuery(html);
            }
            else
            {
                this.$element = jQuery("<" + type + "/>", params);
            }
        }

        this.element = this.$element[0];

        this.width = this.$element.width();
        this.height = this.$element.height();
        this.setSize(this.width, this.height);

        return this;
    }

    /**
     * @overridden DisplayObjectContainer.addChild
     * @method addChild
     * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
     * @returns {any} Returns an instance of itself.
     * @chainable
     * @example
     *     this.addChild(domElementInstance);
     */
    public addChild(child:DOMElement):any
    {
        if (this.$element == null)
        {
            throw new Error('[' + this.getQualifiedClassName() + '] You cannot use the addChild method if the parent object is not added to the DOM.');
        }

        super.addChild(child);

        // If an empty jQuery object is passed into the constructor then don't run the code below.
        if (child._isReference === true && child.$element.length === 0)
        {
            return this;
        }

        if (child.isCreated === false)
        {
            child.create();// Render the item before adding to the DOM
            child.isCreated = true;
        }

        // If the child object is not a reference of a jQuery object in the DOM then append it.
        if (child._isReference === false)
        {
            this.$element.append(child.$element);
        }

        this._onAddedToDom(child);

        return this;
    }

    /**
     * Adds the sjsId to the DOM element so we can know what what Class object the HTMLElement belongs too.
     *
     * @method _addClientSideId
     * @param child {DOMElement} The DOMElement instance to add the sjsId too.
     * @protected
     */
    protected _addClientSideId(child:DOMElement):void
    {
        let type:any = child.$element.attr('data-sjs-type');
        let id:any = child.$element.attr('data-sjs-id');

        if (type === void 0) {
            // Make them array's so the join method will work.
            type = [child.getQualifiedClassName()];
            id = [child.sjsId];
        } else {
            // Split them so we can push/add the new values.
            type = type.split(',');
            id = id.split(',');

            type.push(child.getQualifiedClassName());
            id.push(child.sjsId);
        }
        // Updated list of id's and types
        child.$element.attr('data-sjs-id', id.join(','));
        child.$element.attr('data-sjs-type', type.join(','));
    }

    /**
     * Removes the sjsId and class type from the HTMLElement.
     *
     * @method _removeClientSideId
     * @param child {DOMElement} The DOMElement instance to add the sjsId too.
     * @protected
     * @return {boolean}
     */
    protected _removeClientSideId(child):boolean
    {
        const type:string = child.$element.attr('data-sjs-type');
        const id:string = child.$element.attr('data-sjs-id');

        // Split them so we can remove the child sjsId and type.
        const typeList:Array<string> = type.split(',');
        const idList:Array<number> = id.split(',').map(Number);// Convert each item into a number.
        const index:number = idList.indexOf(child.sjsId);

        if (index > -1) {
            // Remove the id and type from the array.
            typeList.splice(index, 1);
            idList.splice(index, 1);
            // Updated list of id's and types
            child.$element.attr('data-sjs-type', typeList.join(','));
            child.$element.attr('data-sjs-id', idList.join(','));
        }

        return idList.length === 0;
    }

    /**
     * Called when the child object is added to the DOM.
     * The method will call {{#crossLink "DOMElement/layout:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED_TO_STAGE event.
     *
     * @method _onAddedToDom
     * @protected
     */
    protected _onAddedToDom(child:DOMElement)
    {
        child.checkCount++;

        if (child.$element.width() === 0 && child.checkCount < 5)
        {
            setTimeout(() =>
            {
                this._onAddedToDom(child);
            }, 100);
            return;
        }

        this._addClientSideId(child);

        child.width = child.$element.width();
        child.height = child.$element.height();
        child.setSize(child.width, child.height);
        child.enable();
        child.layout();
        child.dispatchEvent(new BaseEvent(BaseEvent.ADDED_TO_STAGE));
    }

    /**
     * @overridden DisplayObjectContainer.addChildAt
     */
    public addChildAt(child:DOMElement, index:number):any
    {
        const children = this.$element.children();
        const length = children.length;

        // If an empty jQuery object is passed into the constructor then don't run the code below.
        if (child._isReference === true && child.$element.length === 0)
        {
            return this;
        }

         if (index < 0 || index >= length)
        {
            // If the index passed in is less than 0 and greater than the total number of children then place the item at the end.
            this.addChild(child);
        }
        else
        {
            // Else get the child in the children array by the index passed in and place the item before that child.

            if (child.isCreated === false)
            {
                child.create();// Render the item before adding to the DOM
                child.isCreated = true;
            }

            // Adds the child at a specific index but also will remove the child from another parent object if one exists.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }
            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;
            child.parent = this;

            // Adds the child before any child already added in the DOM.
            jQuery(children.get(index)).before(child.$element);

            this._onAddedToDom(child);
        }

        return this;
    }

    /**
     * @overridden DisplayObjectContainer.swapChildren
     */
    public swapChildren(child1:DOMElement, child2:DOMElement):any
    {
        const child1Index = child1.$element.index();
        const child2Index = child2.$element.index();

        this.addChildAt(child1, child2Index);
        this.addChildAt(child2, child1Index);

        return this;
    }

    /**
     * @overridden DisplayObjectContainer.getChildAt
     */
    public getChildAt(index:number):DOMElement
    {
        return <DOMElement>super.getChildAt(index);
    }

    /**
     * Returns a DOMElement object with the first found DOM element by the passed in selector.
     *
     * @method getChild
     * @param selector {string} DOM id name, DOM class name or a DOM tag name.
     * @returns {DOMElement}
     * @public
     */
    public getChild(selector:string):DOMElement
    {
        // Get the first match from the selector passed in.
        const jQueryElement:JQuery = this.$element.find(selector).first();
        if (jQueryElement.length === 0)
        {
            throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
        }

        // Check to see if the element has a sjsId value and is a child of this parent object.
        const sjsId:number = parseInt(jQueryElement.attr('data-sjs-id'));
        let domElement:DOMElement = <DOMElement>this.getChildByCid(sjsId);

        // Creates a DOMElement from the jQueryElement.
        if (domElement == null)
        {
            // Create a new DOMElement and assign the jQuery element to it.
            domElement = new DOMElement();
            domElement.$element = jQueryElement;
            this._addClientSideId(domElement);
            domElement.element = jQueryElement[0];
            domElement.isCreated = true;

            // Added to the super addChild method because we don't need to append the element to the DOM.
            // At this point it already exists and we are just getting a reference to the DOM element.
            super.addChild(domElement);
        }

        return domElement;
    }

    /**
     * Gets all the HTML elements children of this object.
     *
     * @method getChildren
     * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children of this parent element.
     * @returns {Array.<DOMElement>} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
     * If the 'data-sjs-id' property exists is on an HTML element a DOMElement will not be created for that element because it will be assumed it already exists as a DOMElement.
     * @public
     */
    public getChildren(selector:string = ''):Array<DOMElement>
    {
        //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
        let $child:JQuery;
        let domElement:DOMElement;
        const $list:JQuery = this.$element.children(selector);

        const listLength:number = $list.length;
        for (let i:number = 0; i < listLength; i++)
        {
            $child = $list.eq(i);
            // If the jQuery element already has sjsId data property then it must be an existing DisplayObjectContainer (DOMElement) in the children array.
            if ($child.attr('data-sjs-id') === void 0)
            {
                domElement = new DOMElement();
                domElement.$element = $child;
                this._addClientSideId(domElement);
                domElement.element = $child.get(0);
                domElement.isCreated = true;
                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                super.addChild(domElement);
            }
        }

        return <Array<DOMElement>>this.children;
    }

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
    public removeChild(child:DOMElement, destroy:boolean = true):any
    {
        const remove:boolean = this._removeClientSideId(child);

        child.disable();

        // Checks if destroy was called before removeChild so it doesn't error.
        if (remove === true && child.$element != null) {
            child.$element.unbind();
            child.$element.remove();
        }

        if (destroy === true) {
            child.destroy();
        }

        super.removeChild(child);

        return this;
    }

    /**
     * Removes the child display object instance that exists at the specified index.
     *
     * @method removeChildAt
     * @param index {int} The index position of the child object.
     * @public
     * @chainable
     */
    public removeChildAt(index:number, destroy:boolean = true):any
    {
        this.removeChild(this.getChildAt(index), destroy);

        return this;
    }

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
    public removeChildren(destroy:boolean = true):any
    {
        while (this.children.length > 0)
        {
            this.removeChild(<DOMElement>this.children.pop(), destroy);
        }

        this.$element.empty();

        return this;
    }

    /**
     * @overridden DisplayObjectContainer.destroy
     */
    public destroy():void
    {
        // Note: we can't just call destroy to remove the HTMLElement because there could be other views managing the same HTMLElement.
        /*if (this.$element != null) {
             this.$element.unbind();
             this.$element.remove();
         }*/

        super.destroy();
    }

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
    public createComponents(componentList:Array<any>):Array<DOMElement>
    {
        let list:Array<DOMElement>;
        let createdChildren:Array<DOMElement> = [];
        const length:number = componentList.length;
        let obj:any;
        for (let i = 0; i < length; i++)
        {
            obj = componentList[i];
            list = <Array<DOMElement>>ComponentFactory.create(this.$element.find(obj.selector), obj.component, this);
            createdChildren = createdChildren.concat(list);
        }

        return createdChildren;
    }

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
    public appendTo(type:any, enabled:boolean = true):any
    {
        this.$element = (type instanceof jQuery) ? type : jQuery(type);

        this._addClientSideId(this);

        if (this.isCreated === false)
        {
            this.create();
            this.isCreated = true;

            if (enabled === false)
            {
                this.disable();
            }
            else
            {
                this.enable();
            }

            this.layout();
        }

        return this;
    }

}

export default DOMElement;
