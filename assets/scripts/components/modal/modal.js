
import { Enso, load } from "../enso/enso.js";

const[template, styles] = await load.htmlAndCss('modal.html', 'modal.css', import.meta.url);

Enso.define({

    tagName: 'modal-dialog',
    component: 
    class extends Enso {
        static get _attributes() {
            return {
                'show': {type: Boolean, default: false},    // Is the modal shown?
                'static': {type: Boolean, default: false}   // Does clicking outside the modal close it?
            }
        }
    
        onStart() {
            this._refs.container.onclick = () => this.show = this.static;
            this._refs['modal-close'].onclick = () => this.show = false;
        }
    },
    template, styles
    
});