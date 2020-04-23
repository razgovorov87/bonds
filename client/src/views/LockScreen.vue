<template>
    <div class="login__page">
        
        <v-list-item class="mb-5">
            <v-list-item-avatar
                v-if="avatar"
                size="52px"
            >
                <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-icon v-else size="52px" class="mr-4">mdi-account-outline</v-icon>
            <v-list-item-title class="title">{{name}}</v-list-item-title>
        </v-list-item>
        <form @submit.prevent="submitHandler"
        >
            <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Пароль"
                :rules="passwordRules"
                prepend-icon="mdi-lock-outline"
                @click:append="show = !show"
            >

            </v-text-field>

            <div class="form__buttons d-flex justify-end mt-2">
                <v-btn
                    type="submit"
                    color="primary"
                    class="font-weight-bold"
                >
                    Войти
                </v-btn>
            </div>
        </form>
    </div>   
</template>

<style>
.login__page {
    min-width: 380px;
}
</style>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
export default {
    name: 'LockScreen',
    data: () => ({
        show: false,
        userEmail: '',
        password: '',
        passwordRules: [
            v => !!v || 'Введите пароль',
            v => v.length > 6 || 'Минимальная длина пароля 6 символов'
        ]
    }),
    computed: {
        name() {
            return this.$store.getters.info.name
        },
        avatar() {
            return this.$store.getters.info.avatar
        }
    },
    validations: {
        password: {required, minLength: minLength(6)}
    },
    async mounted() {
        const uid = this.$store.dispatch('getUid')
        

        if (!uid) {
            this.$route.push('/login')
        }

        if (!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo')
        }
        this.userEmail = this.$store.getters.info.email
    },
    methods: {
        async submitHandler() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                email: this.userEmail,
                password: this.password
            }
            
            try {
                await this.$store.dispatch('login', formData)
                this.$router.push('/')
            } catch (e) {}
        }
    },
    created () {
      this.$vuetify.theme.dark = false
    }
}
</script>