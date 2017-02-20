'use strict';

let stripeBg;

page('/index.html', '/');

page('/', () => {
    render(template('home'));
    stripeBg = new Stripes();
})

page('/about', () => {
    if (stripeBg) stripeBg.clear();
    render(template('about'));
    stripeBg = new Stripes({ colors: ['rgba(0, 20, 45, 0.5)', 'rgba(9, 35, 69, 0.5)', 'rgba(29, 86, 131, 0.5)', 'rgba(136, 187, 200, 0.5)', 'rgba(253, 209, 112, 0.5)'] })
})

page();

function render(html) {
    let outlet = document.getElementById('router-outlet').innerHTML = html;
}

function template(name) {
    return document.getElementById(name + '-template').innerHTML;
}
