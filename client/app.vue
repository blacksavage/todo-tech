<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!--<router-link to="/app">app</router-link>-->
    <!--<router-link to="/login">login</router-link>-->
    <!--<todo></todo>-->
    <transition name="fade">
      <router-view/>
    </transition>
    <button @click="notify">chick me</button>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  // import Todo from './views/todo/todo.vue'
  import Footer from './layout/footer.jsx'

  export default {
    metaInfo: {
      title: '嘿嘿嘿'
    },
    mounted () {
    },
    methods: {
      notify () {
        this.$notify({
          content: '提示'
        })
      }
    },
    components: {
      Header,
      // Todo,
      Footer
    }
  }
</script>

<style lang="stylus" scoped>
  #app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }

  #cover {
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
  }
</style>
