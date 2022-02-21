<template>
  <div class="container">
    <div class="row">
{{this.user}}
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="checkUser(id, tokenName, role)"
        >
        <h3>Log-In</h3>
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="New Password"
            v-model="details.password"
            required
          />
          <!-- Password -->
          <input
            type="text"
            id="password1"
            class="form-control mb-5"
            placeholder="confirm Password"
            v-model="checkPassword"
            required
          />
          <!-- Sign in button -->
          <center>
            <button 
            class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

import swal from "sweetalert";
export default {
  data() {
    return {
      details: {
        password: "",
        status:"Active",
        role:""
      },
      checkPassword: "",
      tokenName:"",
      user:"",
      id:"",
    };
  },
  mounted() {
    let tokenName = this.$route.query.token;
    let id = this.$route.query.id;
    let role = this.$route.query.roles ||"basic";
    this.id = id;
    this.details.role = role;
    localStorage.setItem("jwt",tokenName);
  },
  methods:{ 
    //   getUserDetails() {
    //     let token = localStorage.getItem("jwt");
    //     let decoded = VueJwtDecode.decode(token);
    //     let user = decoded;
    //     this.token = token;
    //     console.log(user);
    // },
    async checkUser(token) {
      try {
        let token = localStorage.getItem("jwt");
        let decoded = VueJwtDecode.decode(token);
        let user = decoded;
        this.token = token;
        let id = user._id;
        console.log(user);
        console.log(this.details);
        if(this.details.password == this.checkPassword){
          // let newMan = await this.$http.get(`/user/${user._id}`,
          //     {headers:{'Authorization': `JWT ${token}`}});
          // let person =newMan.data.data;
          // person.password = this.details.password;
          // person.status = this.details.status;
          // delete person.created;
          // delete person.hash_password;
          // delete person.__v;
          // delete person._id;
          // //console.log(person);
          //   await this.$http.delete(`/user/${user._id}`,user,
          //       {headers:{'Authorization': `JWT ${token}`}});
          // let response = await this.$http.post(`/auth/register`,person);
          let response = await this.$http.put(`/user/pass/${id}`,this.details, {headers: {'Authorization': `JWT ${token}`}});
          if(response){
            localStorage.removeItem("jwt");
            swal("Success", "Login Successful", "Error");
            this.$router.push("/");
            }
        }
        else{
          swal("Error", "Password and confirm password doesn't match...", "error");
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
         console.log(err);
      }
    }
//     async checkPassword() {
//       if(this.login.password = "defPass") {
//         swal("error","Change password");
//         this.router.push("/changePass");
//       }
//       else{
//         swal("Success", "Login Successful", "Error");
//         this.$router.push("/home");
//     }}
   },
  //  created() {
  //    this.getUserDetails();
  //    this.checkUser(localStorage.getItem("jwt"));
  //  }
};
</script>
