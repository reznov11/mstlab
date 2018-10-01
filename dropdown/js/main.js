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
            var word = "";
            var texts = [];
            var letters = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
            var wordLength = Math.floor(Math.random() * 7) + 3;
            for (var i = 0; i < 500; i++){
                let word = "";
                for(var j = 0; j < wordLength; j++) {
                  word += letters.charAt(Math.floor(Math.random() * letters.length));
                }
                texts.push(
                    {
                        "id":i,
                        "name":word,
                        selected: false
                    }
                )
            }
            this.randomWords = texts
            
            return {
                username: navbar.$data.username,
                search: '',
                menuOpened: false,
                selectAll: false,
                selectedItems: 0,
                min_symbols: 3,
                randomWords: null,
                allChecked: [],
                selectedList: [],
                selections: this.randomWords
            }
        },
        methods: {
            clickButton: function(){
                if(this.menuOpened == true){
                    this.menuOpened = false;
                } else {
                    this.menuOpened = true;
                }
            },
            getSelected: function(){
                return this.selections.filter((x,i) => { return x.selected ? x.selected = true: 0; }).length;
            },
            toggleSelect: function(index, id){
                if(this.selections[index].selected){
                    this.selections[index].selected = false
                    // this.selectedItems = this.allChecked.length;
                    // this.allChecked.push(item.id);
                } else {
                    this.selections[index].selected = true;
                }
                this.selectedItems = this.getSelected();             
            }
        },
        computed: {
            checkAll: {
                get: function(){
                    return this.selections ? this.allChecked.length == this.selections.length: false;
                },
                set: function(value){
                    var allChecked = [];
                    if(value){
                        this.selections.forEach(function(item){
                            item.selected = true;
                            allChecked.push(item.id);
                        });
                    }
                    this.allChecked = allChecked;
                    this.selectedItems = allChecked.length;
                    this.selectAll = true;
                }
            },
            uncheckAll: {
                get: function(){
                    return this.selections ? this.allChecked.length == this.selections.length: false;
                },
                set: function(value){
                    var allChecked = [];
                    if(value){
                        this.selections.forEach(function(item){
                            item.selected = false;
                            allChecked.splice(item.id);
                        });
                    }
                    this.allChecked = allChecked;
                    this.selectedItems = 0;
                    this.selectAll = false;
                }
            },
            filteredList() {
                if(this.search.length > this.min_symbols){
                    return this.selections.filter(item => {
                        return item.name.toLowerCase().includes(this.search.toLowerCase());
                    })
                } else {
                    return this.selections;
                }
            }
        }
    }
)