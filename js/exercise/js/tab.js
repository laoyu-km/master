import tools from './utils.js';
import tpl from './tpl.js';
const doc = document;

class Tab {
    constructor(el, attr) {
        this.el = doc.getElementsByClassName(el)[0];
        this.data = JSON.parse(attr ? this.el.getAttribute(attr) : null);
        this._index = 0;

        this._init();
    }

    _init() {
        this._render();
        this._bindEvent();
    }

    _render() {
        let tabWrapper = doc.createElement('div'),
            pageWrapper = doc.createElement('div'),
            oFrag = doc.createDocumentFragment();

        tabWrapper.className = 'tab-wrapper';
        pageWrapper.className = 'page-wrapper';

        this.data.forEach((item, index) => {
            tabWrapper.innerHTML += tools.tabRepalce(tpl.tab('tab'), {
                tab: item.tab,
                currentName: !index ? 'current' : ''
            })
            pageWrapper.innerHTML += tools.tabRepalce(tpl.tab('page'), {
                page: item.page,
                currentName: !index ? 'current' : ''
            })
        });

        oFrag.appendChild(tabWrapper);
        oFrag.appendChild(pageWrapper);

        this.el.appendChild(oFrag);
    }

    _bindEvent() {
        let doms = {
            tabs: doc.querySelectorAll('.tab-item'),
            pages: doc.querySelectorAll('.page-item')
        }

        this.el.addEventListener('click', this._handleTabClick.bind(this, doms), false);
    }

    _handleTabClick() {
        let _doms = arguments[0],
            tar = arguments[1].target,
            tarClassName = tar.className;

        if (tarClassName.trim() === 'tab-item') {
            _doms.tabs[this._index].className = 'tab-item';
            _doms.pages[this._index].className = 'page-item';
            this._index = [].slice.call(_doms.tabs).indexOf(tar);
            tar.className += ' current';
            _doms.pages[this._index].className += ' current';
        }
    }

}

export { Tab };