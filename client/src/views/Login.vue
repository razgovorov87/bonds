<template>
    <div class="login__page">
        <div class="login__header">
            <h3 class="display-1 text--darken-4 font-weight-bold">Авторизация в <span class="blue--text text--darken-3">BONDS</span></h3>
            <p class="subtitle">Нет аккаунта? <span><router-link class="font-weight-bold blue--text text--darken-3" to="/register">Создать аккаунт</router-link></span></p>
        </div>
        
        <form @submit.prevent="submitHandler"
        >
            <v-text-field
                v-model.trim="email"
                label="Email"
                :rules="emailRules"
                prepend-icon="mdi-account-outline"
            >
            </v-text-field>
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
        <v-snackbar
        v-model="snackbar"
        :timeout="5000"
        bottom
        left
        color="error"
        >
            {{ snackbarText }}
            <v-btn
                class="font-weight-bold white--text"
                text
                @click="snackbar = false"
            >
                Закрыть
            </v-btn>
        </v-snackbar>
    </div>   
</template>

<script>
import error from '@/error'
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
    name: 'Login',
    data: () => ({
        show: false,
        snackbar: false,
        snackbarText: '',
        email: '',
        emailRules: [
            v => !!v || 'Введите Email',
            v => /.+@.+/.test(v) || 'Неверный Email',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Введите пароль',
            v => v.length >= 6 || 'Минимальная длина пароля 6 символов'
        ]
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)}
    },
    methods: {
        async submitHandler() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                email: this.email,
                password: this.password
            }
            
            try {
                await this.$store.dispatch('login', formData)
                this.$router.push('/')
            } catch (e) {
                this.snackbar = false
                this.snackbar = true
                if( error[e.code] ) {
                    this.snackbarText = error[e.code]
                } else this.snackbarText = 'Что-то пошло не так!'
            }
        }
    },
    created () {
      this.$vuetify.theme.dark = false
    },
}
</script>