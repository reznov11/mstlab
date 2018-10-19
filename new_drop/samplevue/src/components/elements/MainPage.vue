<template>
    <!-- Navbar block -->
    <nav id="navbar">
        <div class="wrap">
            <div class="logo">
                <img src="/static/imgs/logo_sita.png" alt="Logo sita">
            </div>
        </div>
        <div class="right-menu">
            <p>
                {{username}}
            </p>
            <small class="muted">{{welcomeMessage}}</small>
        </div>
        <DropDown />
    </nav>
</template>

<script>
import DropDown from './DropDown.vue'
export default {
    name: 'MainPage',
    components: {
        DropDown
    },
    data () {
        return {
            username: 'Нуждин Вячеслав',
            welcomeMessage: 'Привет, Вячеслав',
        }
    }
}
</script>