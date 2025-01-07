<script setup>
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue/usetoast";
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { useRouter } from "vue-router";
import { STORE_AUTH } from "@/services/stores";

const toast = useToast();
const router = useRouter();

const { onActionSignUp } = STORE_AUTH.StoreAuth();

const resolver = zodResolver(
  z
    .object({
      username: z.string().min(1, { message: "Name is required." }),
      email: z.string().email({ message: "Invalid email." }), // Kiểm tra định dạng email
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }), // Đảm bảo mật khẩu >= 6 ký tự
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords must match.",
    })
);

const onFormSubmit = async ({ valid, values }) => {
  onActionSignUp(values).then((res) => {
    console.log(res);
    if (res.status === 201) {
      router.push({ name: "SignIn" });
    }
  });
};
</script>

<template>
  <div class="flex justify-content-center pt-4">
    <Form
      :resolver
      @submit="onFormSubmit"
      class="flex flex-column gap-4 sm:w-56 shadow-2 p-6"
    >
      <p class="text-center text-3xl font-semibold">Sign up</p>
      <FormField
        v-slot="$field"
        as="section"
        name="username"
        initialValue=""
        class="flex flex-column gap-2"
      >
        <InputText type="text" placeholder="Name" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
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
      <FormField v-slot="$field" asChild name="confirmPassword" initialValue="">
        <section class="flex flex-column gap-2">
          <Password
            type="text"
            placeholder="Confirm password"
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
      <Button
        type="submit"
        severity="secondary"
        label="SIGN UP"
        class="text-sm bg-bluegray-700 text-white hover:bg-bluegray-900"
      />
      <div className="flex gap-2">
        <p>Have an account?</p>
        <router-link to="/sign-in">
          <span class="text-blue-700">Sign in</span>
        </router-link>
      </div>
    </Form>
  </div>
</template>
