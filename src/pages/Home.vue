<template>
  <span class="headline">Home</span>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        drawerRight: null,
        dialog: false,
        loading: false,
        items: [],
        search: null,
        select: null,
        states: [
          '/Action one',
          '/Action two',
          '/Action 3',
          '/Action 4',
          
        ]
      }
    },
    mounted: function() {
    this.$eventBus.$on('toggle-right-sidenav', data => {
            this.drawerRight = !this.drawerRight;
        });
  },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      }
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      }
    }
  }
</script>
