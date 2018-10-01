// Navbar controller
var navbar = new Vue(
    {
        el: "#navbar_1",
        data: {
            username: "Нуждин Вячеслав",
            welcomeMessage: "Привет, Вячеслав"
        }
    }
)

// Menu controller
var menu = new Vue(
    {
        el: "#main_menu",
        data: function () {
            // Load data into menu after 5 seconds
            setTimeout(function () {
                this.$http.get('/api/users').then(function(data){
                    this.nav_menu = data.body.users;
                    this.second_branch_menu = data.body.user_branches;
                    this.third_branch_menu = data.body.user_extra;
                    this.loader = false;
                })
            }.bind(this), 5000);

            // Send GET request to /api/users
            // This function runs every 15 seconds to get a new list of users
            setInterval(function () {
                this.$http.get('/api/users').then(function(data){
                    this.dynamicList = [
                        data.body.users,
                        data.body.user_branches,
                        data.body.user_extra
                    ];
                    this.newDataLoaded = true;
                })
            }.bind(this), 15000);

            return {
                selected: 0,
                clickOutside: 0,
                clickInside: 0,
                username: navbar.$data.username,
                loader: true,
                blurActive: false,
                show_branch: false,
                show_third_branch: false,
                newDataLoaded: false,
                savedUsers: [],
                nav_menu: [],
                second_branch_menu: [],
                third_branch_menu: [],
                dynamicList: []
            }
        },
        methods: {
            _getUserBranches: function (user, id) {
                var index = this.savedUsers.indexOf(user);
                if(this.savedUsers.length <= 1){
                    this.show_branch = false;
                    this.show_third_branch = false;
                }
                if (this.savedUsers.indexOf(user) !== -1) {
                    // Remove user from the list if exist
                    this.savedUsers.splice(index, 1);
                }
                else {
                    // Add new user to the list if not exist
                    this.savedUsers.push(user);
                    this.selected = index;
                    try {
                        this.show_branch = true;
                        branch_title = this.second_branch_menu.title;
                        branch_users = this.second_branch_menu;
                    }
                    catch (TypeError) {
                        this.show_branch = false;
                        return false;
                    }
                }
            },
            _getMoreBranches: function (id) {
                this.show_third_branch = true;
                try {
                    th_branch_title = this.third_branch_menu.title;
                    th_branch_content = this.third_branch_menu;
                }
                catch (TypeError) {
                    this.show_third_branch = false;
                    return false;
                }
            },
            get getUserBranches() {
                return this._getUserBranches;
            },
            get getMoreBranches() {
                return this._getMoreBranches;
            },
            set getUserBranches(value) {
                this._getUserBranches = value;
            },
            set getMoreBranches(value) {
                this._getMoreBranches = value;
            },
            // Listen to any click outside (click-outside) directive
            outside: function(e) {
                this.show_branch = false;
                this.show_third_branch = false;
                this.savedUsers = [];
                // this.clickOutside += 1
                // console.log(e)
            },
            // Listen to any click inside (click-outside) directive
            inside: function(e) {
                // console.log(e)
                // this.clickInside += 1;
                return false;
            },
            switchLists: function(){
                this.nav_menu = this.dynamicList[0];
                this.second_branch_menu = this.dynamicList[1];
                this.third_branch_menu = this.dynamicList[2];
                this.newDataLoaded = false;
                return 0;
            }
        },
        computed: {
            filteredItems: function() {
                return this.savedUsers;
                // return user.indexOf(this.savedUsers) !== -1;
            }
        },
        directives: {
            'click-outside': {
                bind: function(el, binding, vNode) {
                    // Provided expression must evaluate to a function.
                    if (typeof binding.value !== 'function') {
                        const compName = vNode.context.name;
                        let warn = `[v-click-outside:] this expression '${binding.expression}' is not a function`;
                        if (compName) { warn += `Found in component '${compName}'` }
                        console.warn(warn);
                    }
                    // Define Handler and cache it on the element
                    const cacher = binding.modifiers.cacher;
                    const handler = (e) => {
                        if (cacher || (!el.contains(e.target) && el !== e.target)) {
                            binding.value(e);
                        }
                    }
                    el.__vueClickOutside__ = handler;

                    // add Event Listeners
                    document.addEventListener('click', handler);
                },
                unbind: function(el, binding) {
                    // Remove Event Listeners
                    document.removeEventListener('click', el.__vueClickOutside__);
                    el.__vueClickOutside__ = null;

                }
            }
        }
    }
)