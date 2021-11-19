window.onload = function() {;
    (() => {
        const oContent = document.getElementById('content'),
            oBtn = document.getElementById('btn'),
            oList = document.getElementsByClassName('log-list')[0];

        let log = [];
        it = generator(log); // 迭代器

        const init = () => {
            bindEvent();
        }

        function bindEvent() {
            oBtn.addEventListener('click', handleBtnClick, false)
        }

        // 一般事件命名可以用onBtn 或者 handleBtn
        function handleBtnClick() {
            const value = oContent.value;

            log.push({
                value,
                dateTime: new Date()
            });

            _addlog(it.next().value);
        }

        function _addlog(log) {
            const oLi = document.createElement('li');
            oLi.innerHTML = `
            <p>增加一项操作: ${log.value}。</p>
            <p>操作事件: ${log.dateTime}</p>
            `;

            oList.appendChild(oLi);
        }

        // 生成器
        function* generator(arr) {
            for (let item of arr) {
                yield item;
            }

        }

        init();
    })();
}