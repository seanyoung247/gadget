
const buildURL = (fileURL, baseUrl) => 
    new URL(fileURL, baseUrl).href;

const loadResource = (url, builder) => fetch(url)
    .then(response => response.text())
    .then(builder);

const createFragment = html => 
    document.createRange().createContextualFragment(html);


export const build = {
    /**
     * Creates a HTML template from the provided HTML string
     * @param {String} html     - String of HTML nodes
     * @returns {HTMLElement}   - The created HTML template
     */
    template: html => {
        const template = createFragment(html).firstElementChild;

        // The root of the HTML is expected to be a template tag
        if (template.tagName != 'TEMPLATE') {
            const temp = document.createElement('template');
            temp.content.appendChild(template);
            return temp;
        }
    
        return template
    },

    /**
     * Creates a stylesheet object from string css styles
     * @param {String} css      - String of CSS style rules
     * @returns {Object}        - compiled StyleSheet
     */
    stylesheet: css => {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        return sheet;
    }
}    

export const load = {
    /**
     * Imports HTML template from external html file.
     * @param {String} url          - relative path to HTML template file
     * @param {String} baseUrl      - url of calling file, eg. import.meta.url
     * @returns {Promise} HTML Template
     */
    html: (url, baseUrl) => loadResource(
        buildURL(url, baseUrl), 
        build.template
    ),

    /**
     * Imports CSS stylesheet from external css file.
     * @param {String} url          - relative path to CSS file
     * @param {String} baseUrl      - url of calling file, eg. import.meta.url
     * @returns {Promise} CSS Stylesheet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
     */
    css: (url, baseUrl) => loadResource(
        buildURL(url, baseUrl),
        build.stylesheet
    ),

    /**
     * Imports HTML template and stylesheet from external files.
     * @param {String} htmlUrl      - relative path to HTML template file
     * @param {String} cssUrl       - relative path to CSS file
     * @param {String} baseUrl      - url of calling file, eg. import.meta.url 
     * @returns {Promise} [HTML template, CSS spreadsheet]
     */
    htmlAndCss: (htmlUrl, cssUrl, baseUrl) => Promise.all([
        load.html(htmlUrl, baseUrl),
        load.css(cssUrl, baseUrl)
    ])
};

