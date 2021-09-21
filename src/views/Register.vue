<template>
    <div class="container mt-4 mx-auto ">
        <div class="bg-white">
            <div class="flex min-h-screen bg-white">
                <div class="md:w-1/2 max-w-lg mx-auto my-24 px-4 py-5 shadow-none">
                    <div class="text-left p-0 font-sans">
                        <h1 class=" text-gray-800 text-3xl font-medium text-center">
                            Sign up
                        </h1>
                    </div>
                    <Form class="p-0">
                        <div class="mt-5">
                            <Field
                                name="username"
                                v-model="name"
                                type="user"
                                class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                                id="name"
                                :rules="validateUsername"
                                placeholder="User-name"
                            />
                            <ErrorMessage name="username"/>
                        </div>

                        <div class="mt-5">
                            <Field
                                name="email"
                                v-model="email"
                                type="email"
                                id="email"
                                class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                                :rules="validateEmail"
                                placeholder="Email"
                            />
                            <ErrorMessage name="Email"/>
                        </div>

                        <div class="mt-5">
                            <Field
                                name="password"
                                v-model="password"
                                type="password"
                                id="password"
                                class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                                :rules="validatePassword"
                                placeholder="Password"
                            />
                            <ErrorMessage name="password"/>
                        </div>

                        <div class="mt-5">
                            <Field
                                name="confirmation"
                                v-model="passwordConfirm"
                                type="password"
                                id="passwordConfirm"
                                class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                                rules="confirmed:@password"
                                placeholder="Password-Confirm"
                            />
                            <ErrorMessage name="confirmation"/>
                        </div>

                        <div class="wrapper-btn flex">
                            <div class="mt-10 m-auto">
                                <button
                                    type="submit "
                                    class=" focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg "
                                    @click.prevent="register"
                                >
                                    Registration
                                </button>
                            </div>
                        </div>
                        <div class="hr mt-5">
                            <hr/>
                        </div>
                    </Form>
                    <p class="text-center mt-5">
                        Do you have an account?
                        <router-link class="router text-yellow-400" to="/login">
                            Login
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Field, Form, ErrorMessage, defineRule} from "vee-validate";
import * as yup from "yup";
import {values} from "lodash";
import {useRouter} from "vue-router";
import {mapActions} from "vuex";


const router = useRouter();

defineRule("confirmed", (value, [target]) => {
    if (value === target) {
        return true;
    }

    return "Passwords must match";
});

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            validateUsername: yup.string().required().trim(),
            validatePassword: yup.string().required().min(6).trim(),
        };
    },
    methods: {
        ...mapActions({
            createUser: 'auth/createUser'
        }),
        /* onSubmit(values) {
          alert(JSON.stringify(values, null, 2));
        }, */
        validateEmail(value) {
            // if the field is empty
            if (!value) {
                return "This field is required";
            }

            // if the field is not a valid email
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                return "This field must be a valid email";
            }

            // All is good
            return true;
        },

        async register() {
            try {
                await this.createUser({email: this.email, password: this.password, user: this.name})
                await this.$store.dispatch('auth/login', { username: this.email, password: this.password })
            } catch (error) {
                this.errorMessage = error
            }
        }

    },
};
</script>

<style lang="scss" scoped></style>
