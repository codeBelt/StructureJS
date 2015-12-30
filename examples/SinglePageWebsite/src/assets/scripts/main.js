import App from './App';

let app = new App();
app.appendTo('body');   // Need to specify what area our code has control over.
                        // The App.js class extends Stage which has the appendTo method.

