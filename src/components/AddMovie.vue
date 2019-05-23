<template>
  <!-- form to input movie descriptions -->
  <!-- v-model="valid" means form is not submitted until true -->
  <v-form v-model="valid" ref="form" lazy-validation>
     <v-text-field
       label="Movie Name"
       v-model="name"
       :rules="nameRules"
       required
      ></v-text-field>
      <v-text-field
        name="input-7-1"
        label="Movie Description"
        v-model="description"
        multi-line
        ></v-text-field>
      <v-select
        label="Movie Release Year"
        v-model="release_year"
        required
        :rules="releaseRules"
        :items="years"
        ></v-select>
      <v-text-field
        label="Movie Genre"
        required
        :rules="genreRules"
        v-model="genre"></v-text-field>
      <!-- on click Submit call submit() functioin in script-->
      <v-btn @click="submit" :disabled="!valid">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<!-- basic validations to the form -->
<script>
// required import to connect frontend and backend
import axios from 'axios';

// default values of the user inputs for new movie
export default {
  data: () => ({
    valid: true,
    name: '',
    description: '',
    genre: '',
    release_year: '',
    // list of rules fulfilled in order to validate the form
    nameRules: [
      v => !!v || 'Movie name is required',
    ],
    genreRules: [
      v => !!v || 'Movie genre is required',
      v => (v && v.length <= 80) || 'Genre should not exceed 80 characters.',
    ],
    releaseRules: [
      v => !!v || 'Movie release year is required',
    ],
    select: null,
    // dropdown options
    years: [
      '2019',
      '2018',
      '2017',
      '2016',
      '2015',
    ],
    checkbox: false,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          // save the record with parameters
          method: 'post',
          data: {
            name: this.name,
            description: this.description,
            release_year: this.release_year,
            genre: this.genre,
          },
          url: 'http://localhost:8081/movies',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            // flash success message
            this.$swal(
              'Great',
              'Movie added successfully!',
              'success',
            );
            // redirect to homepage and reset the text input
            this.$router.push({ name: 'Home' });
            this.$refs.form.reset();
          })
          .catch(() => {
            // flash error message
            this.$swal(
              'Oops...',
              'Could not add the movie! Please try again later.',
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
