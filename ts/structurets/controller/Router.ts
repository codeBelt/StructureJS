class Router
{
    private static WINDOW:Window = window;
    private static _isEnabled:boolean = false;

    constructor()
    {
        Router.enable();
    }

    /**
     * YUIDoc_comment
     *
     * @method add
     * @public static
     */
    public static add(route:string, callback:Function, scope:any):void {
        Router.enable();
        console.log("home", route);
        console.log("about/{name}", Router.getHash());
        //http://collectiveidea.com/blog/archives/2012/01/25/standalone-javascript-routing/
    }

    /**
     * Gets the hash url minus the # or #! symbol(s).
     * @example
     * //
     *
     * @method getHash
     * @public static
     * @return {string}
     */
    public static getHash():string {
        var hash:string = Router.WINDOW.location.hash;
        var strIndex:number = (hash.substr(0, 2) === '#!') ? 2 : 1;

        return hash.substring(strIndex); // Return everything after # or #!
    }

    public static enable() {
        if (Router._isEnabled === true) return;

        console.log("enable");
        if (Router.WINDOW.addEventListener) {
            Router.WINDOW.addEventListener('hashchange', Router.onHashChange, false);
        } else {
            Router.WINDOW.attachEvent('onhashchange', Router.onHashChange);
        }

        Router._isEnabled = true;
    }

    public static disable() {
        if (Router._isEnabled === false) return;

        if (Router.WINDOW.removeEventListener) {
            Router.WINDOW.removeEventListener('hashchange', Router.onHashChange);
        } else {
            Router.WINDOW.detachEvent('onhashchange', Router.onHashChange);
        }

        Router._isEnabled = false;
    }

    /**
     * YUIDoc_comment
     *
     * @method onHashChange
     * @param event {HashChangeEvent}
     * @private static
     */
    private static onHashChange(event):void {
        console.log("onhashchange", arguments);
    }

}
export = Router;