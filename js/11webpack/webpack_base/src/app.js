import Header from './header.js';
import Content from './content.js';
import Footer from './footer.js';
import { createLogo } from './createLogo.js';

import doudou from './images/doudou01.jpg';
import styles from './css/app.scss';

const dou = new Image();
dou.src = doudou;
dou.className = `${styles.logo}`;

const container = document.createElement('div');
container.className = styles.container;
container.appendChild(dou);

const parent = document.getElementById('app');

parent.appendChild(container);
new Header(parent).add();
createLogo();
new Content(parent).add();
new Footer(parent).add();

const oIcon = document.createElement('div');
// oIcon.innerHTML = '<div class="iconfont icon-yuanbao"></div>';
oIcon.className = `${styles.iconfont} ${styles.iconYuanbao}`;
console.log(styles.iconYuanbao);
parent.appendChild(oIcon);
