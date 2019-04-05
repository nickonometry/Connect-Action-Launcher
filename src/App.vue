<template>
  <v-app id="inspire">
  
                  <!-- MODAL WINDOW COMPONENTS  -->
    <ModalOne :modalone="modalone" />
    <ModalTwo :modaltwo='modaltwo' />
    <ModalThree :modalthree='modalthree' />
    <ModalFour :modalfour='modalfour' />
  
    <!-- RIGHT NAV DRAWER!! -->
    <v-navigation-drawer v-model="drawerRight" fixed right clipped app disable-resize-watcher>
      <RightNavigation></RightNavigation>
    </v-navigation-drawer>
  
    <!-- LEFT NAV DRAWER -->
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <LeftNavigation></LeftNavigation>
    </v-navigation-drawer>
  
    <!-- OMNIBAR / MD-TOOLBAR-->
    <v-toolbar dark fixed app clipped-right clipped-left color="primary">
  
      <v-toolbar-title>App Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-autocomplete
      v-on:change="itemSelected(select)"
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      clearable
      class="mx-3"
      flat
      hide-no-data
      hide-details
      label="Search, or type '/' to see a list of actions"
      solo-inverted
    ></v-autocomplete>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
  
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap>
      
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="blue-grey" class="white--text" app>
      <span>Tyler Technologies</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        items: [],
        drawer: null,
        drawerRight: null,
        search: null,
        modalone: null,
        modaltwo: null,
        modalthree: null,
        modalfour: null,
        select: null,
        states: [
          '/Create an Incident',
          '/Delete a Customer',
          '/Add a Note',
          '/New Template',
          
        ]
      }
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
        }, 1500)
      },
      itemSelected (data){
        if (data == "/Create an Incident")
        {
          this.modalone = !this.modalone;
        };
        if (data == "/Delete a Customer")
        {
          this.modaltwo = !this.modaltwo;
        }
        if (data == "/Add a Note"){
          this.modalthree = !this.modalthree;
        }
        if (data == "/New Template"){
          this.modalfour = !this.modalfour;
        }
      }
    },
    mounted: function() {
        this.$eventBus.$on('close-modal-one', data => {
            this.modalone = !this.modalone;
        });
        this.$eventBus.$on('close-modal-two', data => {
            this.modaltwo = !this.modaltwo;
        });
        this.$eventBus.$on('close-modal-three', data => {
            this.modalthree = !this.modalthree;
        });
        this.$eventBus.$on('close-modal-four', data => {
            this.modalfour = !this.modalfour;
        });
  },
  }
</script>
