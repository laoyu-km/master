class Header {
  constructor(parent) {
    this.parent = parent;
  }

  add() {
    const header = document.createElement('h3');
    const str =
      '伤情最是晚凉天，憔悴斯人不堪怜，邀酒摧肠三杯醉，寻香惊梦五更寒。钗头凤斜卿有泪，荼蘼花寥我无缘，小楼寂寞新雨月，也难如钩也难圆。';
    const pre = str
      .match(/[\u4e00-\u9fa5]+/g)
      .reduce((pre, cur, idex, oriArr) => {
        pre += cur + '\n';
        return pre;
      }, '');

    header.innerHTML = pre;
    this.parent.appendChild(header);
  }
}

export default Header;
