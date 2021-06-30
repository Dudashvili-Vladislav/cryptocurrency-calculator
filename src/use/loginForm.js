import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

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
    try {
      await store.dispatch("auth/login", values);
      router.push("/");
    } catch (e) {
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
