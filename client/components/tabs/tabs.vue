<script>
  export default {
    name: 'Tabs',
    data () {
      return {
        panes: []
      }
    },
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    methods: {
      onChange (index) {
        this.$emit('change', index)
      }
    },
    render () {
      const contents = this.panes.map(pane => {
        return pane.active ? pane.$slots.default : null
      })
      return (
        <div class='tabs'>
          <ul class='tabs-header'>
            {this.$slots.default}
          </ul>
          <div class='tab-content'>
            {contents}
          </div>
        </div>
      )
    }
  }
</script>

<style lang="stylus" scoped>
  .tabs-header
    display flex
    list-style none
    margin 0
    padding 0
    border-bottom 2px solid #ededed
</style>
