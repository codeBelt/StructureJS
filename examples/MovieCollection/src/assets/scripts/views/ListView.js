import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';

/**
 * TODO: YUIDoc_comment
 *
 * @class ListView
 * @extends DOMElement
 * @constructor
 **/
class ListView extends DOMElement {

    constructor($element) {
        super($element);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method updateList
     * @public
     */
    updateList(movieModels) {
        let templateHtml = TemplateFactory.create('templates/precompile/ItemTemplate', movieModels);

        this.$element.html(templateHtml);

    }

}

export default ListView;
