import { usereactive, createApp } from '../MVVM/';

function createObj() {
  const states = usereactive({
    count: 0,
    name: 'jayden',
  });

  const add = function (num) {
    states.count += num;
  };

  const minus = function (num) {
    states.count -= num;
  };

  const changeName = function (newName) {
    states.name = newName;
  };

  const template = `
  <div>
    <h3>{{ name }}</h3>
    <h1>{{ count }}</h1>
    <button onClick="add(2)">+</button>
    <button onClick="minus(1)">-</button>
    <button onClick="changeName('alexis')">changeName</button>
  </div>
  `;

  return {
    template,
    states,
    methods: {
      add,
      minus,
      changeName,
    },
  };
}

createApp(document.getElementById('app'), createObj());
