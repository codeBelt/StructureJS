///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../event/BaseEvent.ts'/>
///<reference path='../event/native/MouseEvents.ts'/>
///<reference path='../display/DOMElement.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TabComponent
 * @extends EventDispatcher
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class TabComponent extends EventDispatcher
    {
        /**
         * YUIDoc_comment
         *
         * @property _$container
         * @type {JQuery}
         * @private
         */
        private _$container:JQuery = null;

        /**
         * YUIDoc_comment
         *
         * @property _tabButtonAttributeName
         * @type {string}
         * @private
         */
        private _tabButtonAttributeName:string = null;

        /**
         * YUIDoc_comment
         *
         * @property _$tabButtons
         * @type {JQuery}
         * @private
         */
        private _$tabButtons:JQuery = null;

        /**
         * YUIDoc_comment
         *
         * @property _tabContentAttributeName
         * @type {string}
         * @private
         */
        private _tabContentAttributeName:string = null;

        /**
         * YUIDoc_comment
         *
         * @property _$tabContent
         * @type {JQuery}
         * @private
         */
        private _$tabContent:JQuery = null;

        /**
         * YUIDoc_comment
         *
         * @property activeClassName
         * @type {string}
         * @public
         */
        public activeClassName:string = 'active';

        constructor($container:JQuery, tabName:string = 'tabbutton', tabContent:string = 'tabcontent')
        {
            super();

            this._tabButtonAttributeName = tabName;
            this._tabContentAttributeName = tabContent;

            this._$container = $container;
            this._$tabButtons = this._$container.find('[data-' + this._tabButtonAttributeName + ']');
            this._$tabContent = this._$container.find('[data-' + this._tabContentAttributeName + ']');
        }

        /**
         * @overridden BaseObject.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this._$tabButtons.addEventListener(MouseEvents.TAP, this.onTabClick, this);

            super.enable();
        }

        /**
         * @overridden BaseObject.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._$tabButtons.removeEventListener(MouseEvents.TAP, this.onTabClick, this);

            super.disable();
        }

        /**
         * @overridden EventDispatcher.destroy
         */
        public destroy():void
        {
            super.destroy();
        }

        public changeTabByIndex(index:number):void
        {
            this.changeTab(index);
            this.showContent(index);
        }

        private onTabClick(event:JQueryEventObject):void
        {
            event.preventDefault();

            var $currentTarget = jQuery(event.currentTarget);
            var tabIndex:number = $currentTarget.data(this._tabButtonAttributeName);
            this.changeTab(tabIndex);
            this.showContent(tabIndex);
        }

        private changeTab(index:number):void
        {
            this._$tabButtons.removeClass(this.activeClassName);

            var $tabButton = this._$tabButtons.siblings('[data-' + this._tabButtonAttributeName + '=' + index + ']');
            $tabButton.addClass(this.activeClassName);
        }

        private showContent(index:number):void
        {
            this._$tabContent.hide();

            var $contentForTabButton = this._$tabContent.siblings('[data-' + this._tabContentAttributeName + '=' + index + ']');
            $contentForTabButton.show();

            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
        }
    }
}