<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="tabValue" @change="handleChangeTab">
        <tab label="tab1" index="1">
          <div>slot1</div>
        </tab>
        <tab index="2">
          <span slot="label" style="color: red;">tab2</span>
          <div>slot2</div>
        </tab>
        <tab label="tab3" index="3">
          <div>slot3</div>
        </tab>
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    />
    <item
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
    />
    <helper
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    ></helper>
  </section>
</template>

<script>
  import Item from './item.vue'
  import Helper from './tabs.vue'

  let id = 0
  export default {
    // beforeRouteEnter (to, from, next) {
    //   console.log(this)
    //   next()
    // },
    // beforeRouteUpdate (to, from, next) {
    //   console.log(this)
    //   next()
    // },
    data () {
      return {
        todos: [],
        filter: 'all',
        tabValue: '1'
      }
    },
    // props: ['id'],
    computed: {
      filteredTodos () {
        if (this.filter === 'all') {
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    mounted () {
      // console.log(this.$route)
      // console.log(this.id)
    },
    methods: {
      addTodo (e) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        })
        e.target.value = ''
      },
      deleteTodo (id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      toggleFilter (state) {
        this.filter = state
      },
      clearAllCompleted () {
        this.todos = this.todos.filter(todo => !todo.completed)
      },
      handleChangeTab (value) {
        this.tabValue = value
      }
    },
    components: {
      Item,
      Helper
    }
  }
</script>

<style lang="stylus" scoped>
  .real-app {
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
  }

  .add-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }

  .tab-container
    background-color #fff
    padding 0 15px
</style>
