class Content {
  constructor(parent) {
    this.parent = parent;
  }

  add() {
    const content = document.createElement('h2');
    const str =
      '天下风云出我辈，一入江湖岁月催，黄土霸业谈笑中，不胜人生一场醉。提剑跨骑挥鬼雨，白骨如山鸟惊飞，尘世如潮人如水，只叹江湖几人回';
    const pre = str
      .match(/[\u4e00-\u9fa5]+/g)
      .reduce((pre, cur, index, arr) => {
        pre += cur + '\n';
        return pre;
      }, '');
    content.innerHTML = pre;
    this.parent.appendChild(content);
  }
}

export default Content;
