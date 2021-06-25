import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import {useRouter} from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()
  const { handleSubmit, isSubmitting } = useForm();

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required()
      .email()
  );

  const onSubmit = handleSubmit(async values => {
    console.log("Form: ", values);
    console.log('STORE', store);
    await store.dispatch("auth/login", values)
    router.push('/')
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
    
  };
 
  
}
