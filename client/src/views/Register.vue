<template>
    <div class="login__page">
        <div class="login__header">
            <h3 class="display-1 text--darken-4 font-weight-bold">Регистрация в <span class="blue--text text--darken-3">BONDS</span></h3>
            <p class="subtitle">Уже есть аккаунт? <span><router-link class="font-weight-bold blue--text text--darken-3" to="/login">Войти</router-link></span></p>
        </div>
        <form @submit.prevent="submitHandler"
        >
            <v-text-field
                v-model.trim="name"
                label="Имя"
                :rules="nameRules"
                prepend-icon="mdi-account-outline"
            >
            </v-text-field>
            <v-text-field
                v-model.trim="email"
                label="Email"
                :rules="emailRules"
                prepend-icon="mdi-email-outline"
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
                    Регистрация
                </v-btn>
            </div>
        </form>
    </div>   
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
    name: 'Login',
    data: () => ({
        show: false,
        name: '',
        nameRules: [
            v => !!v || 'Введите имя'
        ],
        email: '',
        emailRules: [
            v => !!v || 'Введите Email',
            v => /.+@.+/.test(v) || 'Неверный Email',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Введите пароль',
            v => v.length > 6 || 'Минимальная длина пароля 6 символов'
        ]
    }),
    validations: {
        name: {required},
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
                name: this.name,
                email: this.email,
                password: this.password
            }
            try {
                await this.$store.dispatch('register', formData)
                this.$router.push('/login?message=registerSuccess')
            } catch (e) {
                console.log(e)
            }
        }
    },
    created () {
      this.$vuetify.theme.dark = false
    },
}
</script>