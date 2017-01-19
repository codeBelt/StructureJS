import DisplayObjectContainer from './DisplayObjectContainer';
declare class Sprite extends DisplayObjectContainer {
    constructor();
    create(): void;
    renderCanvas(): any;
    addChild(child: any): any;
    removeChild(child: any, destroy?: boolean): any;
}
export default Sprite;
