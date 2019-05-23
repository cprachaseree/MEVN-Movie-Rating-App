<template>
  <!-- form to register new users -->
  <v-form v-model="valid" ref="form" lazy-validation>
     <v-text-field
       label="Name"
       v-model="name"
       required
      ></v-text-field>
      <v-text-field
        label="Email"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        required
      ></v-text-field>
      <v-text-field
        name="input-7-1"
        label="Confirm Password"
        v-model="confirm_password"
      ></v-text-field>
      <!-- on click Submit call submit() functioin in script-->
      <v-btn @click="submit" :disabled="!valid">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<!-- basic validations to the form -->
<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /\S+@\S+\.\S+/.text(v) || 'Email must be valid',
    ],
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
          },
          url: 'http://localhost:8081/users/register',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            // flash success message
            this.$swal(
              'Great',
              'You have successfully registered!',
              'success',
            );
            // redirect to login
            this.$router.push({ name: 'Login' });
            this.$refs.form.reset();
          })
          .catch(() => {
            // flash error message
            this.$swal(
              'Oops...',
              'Unsuccessful registration. Please try a gain later.',
              'error',
            );
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
