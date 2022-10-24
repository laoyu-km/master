# 认识Vue以及组件化构建

- vue组件化 -> 核心 组件系统

- Vue利用ES模块化 -> Vue组件系统的构建

## 组件化 -> 抽象小型，独立，可预先定义配置的，可复用的组件

- 小型 -> 页面构成拆分成一个一个的小单元

- 独立 -> 每一个小单元尽可能都独立开发

- 预先定义 -> 小单元都可以先定义号，在需要的时候导入使用

- 预先配置 -> 小单元可以接受一些在使用的时候需要的一些配置

- 可复用 -> 小单元可以在多个地方使用

## 组件可复用性要适当的考量

- 组件最大的作用是独立开发，预先配置 -> 为了更好的维护和扩展

- 有些组件确实是不需要复用

- 可配置性越高，功能性越强

```js
// 示例 todoList
const todoList = {
  data() {
    return {
      listdata: [
        {
          id: 1,
          content: 'Jayden James',
          completed: false,
        },
        {
          id: 2,
          content: 'Alexis Texas',
          completed: false,
        },
        {
          id: 3,
          content: 'Wicky Angel',
          completed: false,
        },
      ],
    };
  },
  template: `
      {{ listdata }} 

      <todo-input
        @add-list-data="addTodoListData"        
      ></todo-input>

      <todo-list
        v-for="item of listdata"
        :key="item.id"
        :todo="item"
        @change-completed="changeTodoListData"
        @remove-data="removeTodoListData"
      ></todo-list>
  `,
  methods: {
    addTodoListData(inputValue) {
      this.listdata.push({
        id: new Date().getTime(),
        content: inputValue,
        completed: false,
      });
    },
    changeTodoListData(id) {
      this.listdata = this.listdata.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
    removeTodoListData(completed, id) {
      if (completed) {
        this.listdata = this.listdata.filter((item) => {
          if (item.id !== id) {
            return item;
          }
        });
      }
    },
  },
};

const app = Vue.createApp(todoList);

app.component('TodoInput', {
  data() {
    return {
      newInput: null,
    };
  },
  template: `
    <input type="text" placeholder="请输入" v-model="newInput" />
    <button @click="addListData">提交</button>
  `,
  emits: ['add-list-data'],
  methods: {
    addListData() {
      if (this.newInput !== null) {
        this.$emit('add-list-data', this.newInput);
      }
      this.newInput = null;
    },
  },
});

app.component('TodoList', {
  props: ['todo'],
  template: `
    <li>
      <input 
        type="checkbox" 
        :checked="todo.completed" 
        @click="changeCompleted(todo.id)"
      />
      <span
        :style="{
          textDecoration: todo.completed ? 'line-through' : 'none'
        }"
      >{{ todo.content }}</span>
      <button @click="removeData(todo.completed, todo.id)">删除</button>
    </li>
  `,
  methods: {
    changeCompleted(id) {
      this.$emit('change-completed', id);
    },
    removeData(completed, id) {
      this.$emit('remove-data', completed, id);
    },
  },
});

app.mount('#app');

```
