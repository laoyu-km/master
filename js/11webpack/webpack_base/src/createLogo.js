import dou02 from './images/doudou04.jpg';
import styles from './css/app.scss';

export function createLogo() {
  const img = new Image();
  img.src = dou02;
  img.className = `${styles.logo}`;

  document.getElementById('app').appendChild(img);
}
