/*
 UMD Stuff
 @export TransitionType
 */
/**
 * TODO: YUIDoc_comment
 *
 * @class TransitionType
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class TransitionType
{
    /**
     * TODO: YUIDoc_comment
     *
     * @property NONE
     * @type {string}
     * @public
     * @final
     * @static
     */
    public static NONE:string = 'none';

    /**
     * TODO: YUIDoc_comment
     *
     * @property PUSH_LEFT
     * @type {string}
     * @public
     * @final
     * @static
     */
    public static PUSH_LEFT:string = 'pushLeft';

    /**
     * TODO: YUIDoc_comment
     *
     * @property PUSH_RIGHT
     * @type {string}
     * @public
     * @final
     * @static
     */
    public static PUSH_RIGHT:string = 'pushRight';

    /**
     * TODO: YUIDoc_comment
     *
     * @property PUSH_UP
     * @type {string}
     * @public
     * @final
     * @static
     */
    public static PUSH_UP:string = 'pushUp';

    /**
     * TODO: YUIDoc_comment
     *
     * @property PUSH_DOWN
     * @type {string}
     * @public
     * @final
     * @static
     */
    public static PUSH_DOWN:string = 'pushDown';

    /**
     * TODO: YUIDoc_comment
     *
     * @property CROSSFADE
     * @type {string}
     * @public
     * @final
     * @static
     */
    public static CROSSFADE:string = 'crossFade';

    /**
     * TODO: YUIDoc_comment
     *
     * @property FADE_OUT_AND_IN
     * @type {string}
     * @public
     * @final
     * @static
     */
    public static FADE_OUT_AND_IN:string = 'fadeOutAndIn';

    constructor()
    {
        throw new Error('[TransitionType] Do not instantiate the TransitionType class because it is a static class.');
    }
}

export = TransitionType;