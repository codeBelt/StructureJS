/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 *
 * @class Point
 * @module StructureJS
 * @submodule geom
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class Point
{
    /**
     * The horizontal coordinate of the point.
     *
     * @property x
     * @type {number}
     * @public
     */
    public x:number = 0;

    /**
     * The vertical coordinate of the point.
     *
     * @property y
     * @type {number}
     * @public
     */
    public y:number = 0;

    constructor(x:number = 0, y:number = 0)
    {
        this.x = x;
        this.y = y;
    }

}

export default Point;