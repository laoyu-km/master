class Footer {
  constructor(parent) {
    this.parent = parent;
  }

  add() {
    const footer = document.createElement('h6');
    const str = 'this is footer';
    footer.innerHTML = str;
    this.parent.appendChild(footer);
  }
}

export default Footer;
