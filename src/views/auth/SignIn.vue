<script setup>
import { reactive } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue/usetoast";
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { useRouter } from "vue-router";
import { updateAuthorizationHeader } from "@/services/api";
import { STORE_AUTH } from "@/services/stores";
import { appLocalStorage, ENUM, COMMON } from "@/utils";

const toast = useToast();
const router = useRouter();

const { onActionSignIn } = STORE_AUTH.StoreAuth();

const resolver = zodResolver(
  z.object({
    email: z.string().min(1, { message: "Email is required." }),
    password: z.string().min(1, { message: "Password is required." }),
  })
);

const onFormSubmit = async ({ valid, values }) => {
  if (valid) {
    const res = await onActionSignIn(values);

    console.log(res);

    if (res.status == 200) {
      appLocalStorage.value.userData = res?.data || ENUM.USER_DATA;
      appLocalStorage.value.accessToken = res?.data?.token || "";

      router.push("/");
      // toast.add({
      //   severity: "success",
      //   summary: "Signed in successfully.",
      //   life: 3000,
      // });
    } else {
      toast.add({
        severity: "error",
        summary: "Login failed",
        detail: res.message || "Email or password is incorrect.",
        life: 3000,
      });
    }
  }
};
</script>

<template>
  <div class="flex justify-content-center pt-7">
    <Form
      :resolver
      @submit="onFormSubmit"
      class="flex flex-column gap-4 sm:w-56 shadow-2 p-6"
    >
      <p class="text-center text-3xl font-semibold">Sign in</p>
      <FormField
        v-slot="$field"
        as="section"
        name="email"
        initialValue=""
        class="flex flex-column gap-2"
      >
        <InputText type="text" placeholder="Email" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField v-slot="$field" asChild name="password" initialValue="">
        <section class="flex flex-column gap-2">
          <Password
            type="text"
            placeholder="Password"
            :feedback="false"
            toggleMask
            fluid
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </section>
      </FormField>
      <div class="flex flex-column gap-1">
        <Button
          type="submit"
          severity="secondary"
          label="SIGN IN"
          class="text-sm bg-bluegray-700 text-white hover:bg-bluegray-900"
        />
        <!-- <span class="font-semibold text-center">Or</span>
        <Button
          label="CONTINUE WITH GOOGLE"
          class="text-sm bg-red-700 text-white hover:bg-red-800"
        /> -->
      </div>
      <div className="flex gap-2">
        <p>Don't have an account?</p>
        <router-link to="/sign-up">
          <span class="text-blue-700">Sign up</span>
        </router-link>
      </div>
    </Form>
  </div>
</template>
