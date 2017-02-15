import CheckoutViewModel from './models/CheckoutViewModel';
import GuestViewModel from './models/GuestViewModel';
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
        // let checkoutViewModel = new CheckoutViewModel({test: {id:-1}}, { expand: false });
        // console.log(`1`, checkoutViewModel);
        //
        // checkoutViewModel = <CheckoutViewModel>checkoutViewModel.clone();
        // console.log(`2`, checkoutViewModel);
        //
        // checkoutViewModel = <CheckoutViewModel>checkoutViewModel.clone();
        // checkoutViewModel.update({pick: {id: 'asdfasdfas'}});
        // console.log(`3`, checkoutViewModel);

        let guestViewModel: GuestViewModel = new GuestViewModel();
        guestViewModel.validate();
console.log(`guestViewModel`, guestViewModel);
console.log(`clone`, guestViewModel.clone());
    }

}

export default App;
