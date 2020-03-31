"use strict";
let menuContent = document.getElementById('template-menu').content;
Array.from(document.getElementsByClassName('menu'))
    .forEach(div => {
    let expand = false;
    div.append(menuContent.cloneNode(true));
    let spans = div.getElementsByTagName('span');
    let ul = div.getElementsByTagName('ul')[0];
    div.addEventListener('click', event => {
        if (event.target.tagName == 'SPAN') {
            if (expand) {
                expand = false;
                spans[0].style.display = '';
                spans[1].style.display = 'none';
                ul.style.display = 'none';
            }
            else {
                expand = true;
                spans[0].style.display = 'none';
                spans[1].style.display = '';
                ul.style.display = '';
            }
        }
    });
});
//# sourceMappingURL=menu.js.map