<template>
    <div class="container mx-auto">
        <div v-if="isError">Произошла ошибка</div>
        <router-view v-if="$store.state.auth.auth_checked"/>
        <div v-else >Загрузка</div>
    </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            isError: false
        }
    },
    created() {
        this.$store.dispatch('initApp').catch(err => {
            if (err.code !== 401) {
                this.isError = true
            }
        })
    }
};
</script>

<style>
.auth-body {
    max-width: 400px;
    margin: 50px auto;
}

#app {
    min-height: 100vh;
    background: radial-gradient(123.22% 129.67% at 100.89% -5.6%, #2C1D47 0%, #18153A 100%)
}

#app .container {
    max-width: 1280px;
}

.icon {
    display: inline-block;
}

.user-icon {
    width: 23px;
    height: 24px;
    background: url('assets/images/user-icon.svg');
}

.select .option {
    display: block;
    font-family: Gilroy;
    background: rgba(2, 3, 14, 0.226);
    color: #ffffff;
    background: rgb(33 25 63);
    padding: 5px 10px;
}
</style>
