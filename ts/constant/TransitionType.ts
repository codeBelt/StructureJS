
/**
 * YUIDoc_comment
 *
 * @class TransitionType
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class TransitionType
    {
        public static NONE:string = 'none';
        public static PUSH_LEFT:string = 'pushLeft';
        public static PUSH_RIGHT:string = 'pushRight';
        public static PUSH_UP:string = 'pushUp';
        public static PUSH_DOWN:string = 'pushDown';
        public static CROSSFADE:string = 'crossFade';
        public static FADE_OUT_AND_IN:string = 'fadeOutAndIn';

        constructor()
        {
            throw new Error('[TransitionType] Do not instantiation the TransitionType class because it is a static class.');
        }
    }
}