'use strict';

page('/index.html', '/');

page('/', () => {
    render(template('home'));
    const stripeBg = new Stripes();
})

page('/about', () => {
    render(template('about'));
})

page();

function render(html) {
    let outlet = document.getElementById('router-outlet').innerHTML = html;
}

function template(name) {
    return document.getElementById(name + '-template').innerHTML;
}
