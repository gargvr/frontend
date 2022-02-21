<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="loginUser"
        >
        <h3>Log-In</h3>
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
            required
          />

          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
            required
          />

          <!-- <p>
            Dont have an account??
            <router-link to="/register">
              click here
            </router-link>
          </p> -->

          <!-- Sign in button -->
          <center>
            <button 
            class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
          </center>
          <p>
            <router-link to="/forgot">
              Forgot Password
            </router-link>
          </p>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      token:""
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/auth/sign_in", this.login);
        let token = response.data.token;
        let user = response.data.user;
        console.log(user.status);
        if (token){
          if(this.login.password =="defPass"){
          //if (user.status =="Pending"){
            this.setPass(token);
          }else{
            localStorage.setItem("jwt", token);
            swal("Success", "Login Successful", "Error");
            this.$router.push("/home");
          }
        }
      }catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err);
      }
    },
    async setPass(token) {
        swal("error","Change password");
        this.$router.push(`/activate?token=${token}`);
      }
  }
};
</script>
