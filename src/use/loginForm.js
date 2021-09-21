import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      admin: (state) => state.auth.admin,
    }),
  },
};

export function useLoginForm() {
  const store = useStore();
  const router = useRouter();
  let error = ref("");

  const { handleSubmit, isSubmitting } = useForm();

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required()
      .email()
  );

  const onSubmit = handleSubmit(async (values) => {

    console.log(values)

    try {
      await store.dispatch("auth/login", { username: values.email, password: values.password });
      /* if (this.admin) {
        this.$router.push({ name: "siteadmin" });
      } else {
        console.log("AAAAAAAAAAAAA");
        this.$router.push({ name: "home" });
      // } */
      // router.push("/");

    } catch (e) {
      console.log("E",e);
      error = e;
    }
  });

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required()
      .min(8)
  );

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    error,
  };
}
