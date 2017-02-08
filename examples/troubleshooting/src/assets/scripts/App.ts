import CheckoutViewModel from './models/CheckoutViewModel';
/**
 * Initial application setup. Runs once upon every page load.
 *
 * @class App
 * @constructor
 */
class App {

    constructor() {
    }

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @public
     */
    init() {
        // Create your views here
        const asdf = new CheckoutViewModel({test: {id:-1}}, { expand: false });
        console.log(`CheckoutViewModel`, asdf);




        console.log(`!!!!!!! clone`);
        const clone = asdf.clone();
        console.log(`clone`, clone);
    }

}

export default App;
