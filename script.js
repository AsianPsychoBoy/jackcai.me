'use strict';

page('/', () => {
    render(template('home'));
    const stripeBg = new Stripes();
})

page('/about', () => {
    console.log('show about');
    render('');
})

page();

function render(html) {
    let outlet = document.getElementById('router-outlet').innerHTML = html;
}

function template(name) {
    return document.getElementById(name + '-template').innerHTML;
}
