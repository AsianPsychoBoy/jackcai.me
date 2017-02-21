'use strict';

let stripeBg;

page('/index.html', '/');

page('/', () => {
    if (stripeBg) stripeBg.clear();
    render(template('home'));
    stripeBg = new Stripes();
})

page('/about', () => {
    if (stripeBg) stripeBg.clear();
    render(template('about'));
    stripeBg = new Stripes({ colors: ['rgba(0, 20, 45, 0.5)', 'rgba(9, 35, 69, 0.5)', 'rgba(29, 86, 131, 0.5)', 'rgba(136, 187, 200, 0.5)', 'rgba(253, 209, 112, 0.5)'] });
})

page('/projects', () => {
    if (stripeBg) stripeBg.clear();
    render(template('projects'));
    stripeBg = new Stripes({ colors: ['rgba(255, 132, 38, 0.5)', 'rgba(244, 94, 29, 0.5)', 'rgba(219, 948, 21, 0.5)', 'rgba(188, 5, 5, 0.5)', 'rgba(23, 183, 208, 0.5)'] });
})

page('/skills', () => {
    if (stripeBg) stripeBg.clear();
    render(template('skills'));
    stripeBg = new Stripes({ colors: ['rgba(54, 107, 79, 0.5)', 'rgba(40, 139, 67, 0.5)', 'rgba(40, 174, 74, 0.5)', 'rgba(84, 179, 78, 0.5)', 'rgba(185, 229, 87, 0.5)'] });
})

page();

function render(html) {
    let outlet = document.getElementById('router-outlet').innerHTML = html;
}

function template(name) {
    return document.getElementById(name + '-template').innerHTML;
}
