interface JQuery
{
    addEventListener(type:string, selector?:any, data?:any, handler?:(eventObject:JQueryEventObject) => any, scope?:any): JQuery;
    addEventListener(type:string, selector?:any, handler?:(eventObject:JQueryEventObject) => any, scope?:any): JQuery;

    removeEventListener(type?:string, selector?:any, data?:any, handler?:(eventObject:JQueryEventObject) => any, scope?:any): JQuery;
    removeEventListener(type?:string, selector?:any, handler?:(eventObject:JQueryEventObject) => any, scope?:any): JQuery;
    removeEventListener(type?:string, handler?:(eventObject:JQueryEventObject) => any, scope?:any): JQuery;
}
