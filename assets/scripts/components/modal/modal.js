
import Enso, { load } from "../enso/enso.js";

const [template, styles] = await load.external(import.meta.url, 'modal.html', 'modal.css');

Enso.component({

    tag: 'modal-dialog',
    attributes: {
        'show': {type: Boolean, default: false},    // Is the modal shown?
        'static': {type: Boolean, default: false}   // Does clicking outside the modal close it?
    },
    template, styles
    
});