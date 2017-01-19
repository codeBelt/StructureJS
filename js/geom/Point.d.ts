/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 *
 * @class Point
 * @module StructureJS
 * @submodule geom
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
declare class Point {
    /**
     * The horizontal coordinate of the point.
     *
     * @property x
     * @type {number}
     * @public
     */
    x: number;
    /**
     * The vertical coordinate of the point.
     *
     * @property y
     * @type {number}
     * @public
     */
    y: number;
    constructor(x?: number, y?: number);
}
export default Point;
