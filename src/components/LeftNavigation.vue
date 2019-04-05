<template>
    <div>
        <v-toolbar flat v-if="leftNavHeader">
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="subtitle">
                        Left Sidebar Header
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-divider v-if="leftNavHeader"></v-divider>
    
        <v-container pa-2 mt-0>
            <v-list class="pt-0">
                <v-list-tile v-for="item in navItems" :key="item.title" :to="item.route">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
    
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({
            leftNavHeader: true,
            navItems: [{
                    title: 'Home',
                    icon: 'home',
                    route: '/'
                },
                {
                    title: 'About',
                    icon: 'info',
                    route: '/about',
                },
                {
                    title: 'Another Page',
                    icon: 'accessibility_new',
                    route: '/anotherpage',
                },
                {
                    title: 'Dummy Link',
                    icon: 'face',
                    route: '/dummylink',
                },
            ],
        }),
    }
</script>

<style>
    
</style>
