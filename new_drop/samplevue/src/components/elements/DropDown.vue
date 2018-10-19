<template>
    <div class="new-design mandragora">
      <div class="side-wrap" id="main_menu">
        <div class="wcontent">
          <div class="menu-header">
                <h1>{{username}}</h1>
                <button id="sBu" type="button" v-on:click="clickButton()">
                    <img src="/static/imgs/chevron-icon.svg" class="chevron_icon" v-bind:class="{ animate_chevron: menuOpened }">
                    <span class="textSbu" v-if="selectedItems == 0">
                        Не выбрано
                    </span>
                    <span class="textSbu" v-else>
                        Выбрано: {{selectedItems}}
                    </span>
                </button>
                <div id="itemsBody" v-if="menuOpened">
                    <div class="content_head">
                        <img src="/static/imgs/search-icon.svg" class="search_icon">
                        <input id="iBu" type="text" v-model="search" placeholder="Поиск">
                    </div>
                    <div class="clear line"></div>
                    
                    <div class="content">
                        <div class="col-sm-12">
                            <div class="custom-control custom-checkbox mt-3" v-for="(key, value) in filteredList" :key="value">
                                <input class="custom-control-input" type="checkbox" :id="'customCheck'+value" v-model="allChecked" :value="key.id" v-on:click="toggleSelect(value, key.id)" :checked="key.selected">
                                <label class="custom-control-label" :for="'customCheck'+value">{{key.name}}</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="line clear"></div>
                    <div class="action">
                        <label>
                            <template v-if="!selectAll">
                                <input type="checkbox" id="sAll" class="switchButton form-control" value="Отметить все" v-model="checkAll">
                            </template>
                            <template v-else>
                                <input type="checkbox" id="sAll" class="switchButton form-control" value="Отменить все" v-model="uncheckAll">
                            </template>
                        </label>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss">
    @import "../../assets/styles";
</style>

<script>
    // Initiate
    export default {
        name: 'main_menu',
        data () {
            let word = "";
            let maxWords = 500;
            let texts = [];
            let letters = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
            let wordLength = Math.floor(Math.random() * 7) + 3;
            for (var i = 0; i < maxWords; i++){
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
                username: 'Нуждин Вячеслав',
                search: '',
                menuOpened: false,
                selectAll: false,
                selectedItems: 0,
                min_symbols: 3,
                randomWords: null,
                allChecked: [],
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
                    console.log(allChecked.length);
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
</script>
