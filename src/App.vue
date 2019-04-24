<template>
  <v-app id="inspire">
    <Modal :dialog="dialog" v-bind:modalTitle="this.modalTitle"/>

    <!-- LEFT NAV DRAWER -->
    <v-navigation-drawer fixed clipped app>
      <LeftNavigation></LeftNavigation>
    </v-navigation-drawer>

    <!-- OMNIBAR / MD-TOOLBAR-->
    <v-toolbar dark fixed app clipped-right clipped-left color="primary">
      <v-toolbar-title>App Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :close-on-click="false"
        :nudge-bottom="36"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            label="Search, or type / to see a list of actions"
            solo
            flat
            solo-inverted
            v-on="on"
            v-model="searchInput"
            v-on:input="logme()"
            class="mt-2"
          ></v-text-field>
        </template>
        <v-card class="mx-auto" v-if="showDropdown">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-toolbar flat>
                <v-toolbar-title>Quick Actions</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="closeQuickActions()">
                  <v-icon>clear</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-tile
                    v-for="item in actions"
                    :key="item.title"
                    @click="checkAction(item.title)"
                  >
                    <v-list-tile-action>
                      <v-icon color="indigo">{{item.iconName}}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-toolbar flat>
                <v-btn icon class="hidden-xs-only" @click="backToOne()">
                  <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title>Back</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-tile
                    v-for="item in adds"
                    :key="item.title"
                    @click="launchModal(item.title)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon v-if="item.icon" color="indigo">{{item.iconName}}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <v-toolbar flat>
                <v-btn icon class="hidden-xs-only" @click="backToOne()">
                  <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title>Back</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-tile
                    v-for="item in updates"
                    :key="item.title"
                    @click="launchModal(item.title)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon v-if="item.icon" color="indigo">{{item.iconName}}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="4">
              <v-toolbar flat>
                <v-btn icon class="hidden-xs-only" @click="backToOne()">
                  <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title>Back</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-tile
                    v-for="item in views"
                    :key="item.title"
                    @click="launchModal(item.title)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon v-if="item.icon" color="indigo">{{item.iconName}}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="5">
              <v-toolbar flat>
                <v-btn icon class="hidden-xs-only" @click="backToOne()">
                  <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title>Back</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-tile
                    v-for="item in approves"
                    :key="item.title"
                    @click="launchModal(item.title)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon v-if="item.icon" color="indigo">{{item.iconName}}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="6">
              <v-toolbar flat>
                <v-btn icon class="hidden-xs-only" @click="backToOne()">
                  <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title>Back</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-tile
                    v-for="item in changes"
                    :key="item.title"
                    @click="launchModal(item.title)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon v-if="item.icon" color="indigo">{{item.iconName}}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="7">
              <v-toolbar flat>
                <v-btn icon class="hidden-xs-only" @click="backToOne()">
                  <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title>Back</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-tile
                    v-for="item in creates"
                    :key="item.title"
                    @click="launchModal(item.title)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon v-if="item.icon" color="indigo">{{item.iconName}}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-window-item>
          </v-window>
        </v-card>
      </v-menu>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fill-height>
        <v-layout row wrap></v-layout>
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
  data() {
    return {
      menu: false,
      dropdown: false,
      searchInput: null,
      dialog: null,
      showDropdown: false,
      modalTitle: "WOOHOO",
      actions: [
        { icon: true, iconName: "add", title: "Add" },
        { icon: true, iconName: "update", title: "Update" },
        { icon: true, iconName: "remove_red_eye", title: "View" },
        { icon: true, iconName: "check_circle", title: "Approve" },
        { icon: true, iconName: "change_history", title: "Change" },
        { icon: true, iconName: "create", title: "Create" }
      ],
      adds: [
        { icon: true, iconName: "open_in_browser", title: "Add Journal" },
        { icon: true, iconName: "open_in_new", title: "Add AP Invoice" },
        { icon: true, iconName: "open_in_new", title: "Add Address" },
        { icon: true, iconName: "open_in_new", title: "Add Code Case" },
        { icon: true, iconName: "open_in_new", title: "Add Requisition" },
        { icon: true, iconName: "open_in_new", title: "Add Work Order" },
        { icon: true, iconName: "open_in_new", title: "Add Employee" }
      ],
      updates: [
        { icon: true, iconName: "open_in_browser", title: "Update AP Invoice" },
        { icon: true, iconName: "open_in_new", title: "Update Address" },
        { icon: true, iconName: "open_in_new", title: "Update Code Case" },
        { icon: true, iconName: "open_in_new", title: "Update Requisition" },
        { icon: true, iconName: "open_in_new", title: "Update Work Order" }
      ],
      views: [
        { icon: true, iconName: "open_in_browser", title: "View Budget" },
        { icon: true, iconName: "open_in_new", title: "View Employees" },
        { icon: true, iconName: "open_in_new", title: "View Workflow" }
      ],
      approves: [
        {
          icon: true,
          iconName: "open_in_browser",
          title: "Approve Requisition"
        },
        { icon: true, iconName: "open_in_new", title: "Approve Work Order" },
        { icon: true, iconName: "open_in_new", title: "Approve PO" },
        { icon: true, iconName: "open_in_new", title: "Approve My Approvals" }
      ],
      changes: [
        { icon: true, iconName: "open_in_browser", title: "Change AP Invoice" },
        { icon: true, iconName: "open_in_new", title: "Change Address" },
        { icon: true, iconName: "open_in_new", title: "Change Code Case" },
        { icon: true, iconName: "open_in_new", title: "Change Requisition" },
        { icon: true, iconName: "open_in_new", title: "Change Work Order" }
      ],
      creates: [
        { icon: true, iconName: "open_in_browser", title: "Create Journal" },
        { icon: true, iconName: "open_in_new", title: "Create AP Invoice" },
        { icon: true, iconName: "open_in_new", title: "Create Address" },
        { icon: true, iconName: "open_in_new", title: "Create Code Case" },
        { icon: true, iconName: "open_in_new", title: "Create Requisition" },
        { icon: true, iconName: "open_in_new", title: "Create Work Order" },
        { icon: true, iconName: "open_in_new", title: "Create Employee" }
      ],
      step: 1
    };
  },

  watch: {},
  mounted: function() {
    this.$eventBus.$on("close-modal", data => {
      this.dialog = !this.dialog;
    });
  },
  methods: {
    closeQuickActions() {
      this.showDropdown = false;
      this.searchInput = "";
    },
    backToOne(v) {
      this.step = 1;
    },
    logme() {
      var t = this.searchInput;
      var n = t.startsWith("/");

      if (n == true) {
        this.showDropdown = true;
      }
      else {
        this.showDropdown = false;
      }
    },
    launchModal(val) {
      this.modalTitle = val;
      this.dialog = !this.dialog;
    },
    checkAction(val) {
      switch (val) {
        case "Add":
          this.step = 2;
          break;

        case "Update":
          this.step = 3;
          break;

        case "View":
          this.step = 4;
          break;

        case "Approve":
          this.step = 5;
          break;

        case "Change":
          this.step = 6;
          break;

        case "Create":
          this.step = 7;
          break;

        default:
          console.log("SOMEHOW YOU HIT THE DEFAULT!!");
      }
    }
  }
};
</script>
