<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="findUser()"
        >
        <h3>Enter Email-Id</h3>
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="details.email"
            required
          />
          <!-- Find button -->
          <center>
            <button 
            class="btn btn-primary btn-block w-75 my-4" type="submit">
              Find Account
            </button>
          </center>
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
      details: {
        email: "",
      }
    };
  },
  methods:{ 
      async findUser() {
        try {
            let response = await this.$http.get(`/user/email/${this.details.email}`);
            let token = response.data.token;
            let user = response.data.user;
            let id = user[0]._id;
            let rol = user[0].role;
            //localStorage.setItem("jwt",token);
            if(response){
              swal("Success", "User found, please change password", "Error");
              this.$router.push(`/activate?token=${token}&id=${id}&roles=${rol}`);
            }
        }catch (err) {
            swal("Error", "Something Went Wrong", "error");
            console.log(err);
            }
      }
  }
//     async checkUser(user,token) {
//       try {
//         if(this.details.password == this.checkPassword){
//           let newMan = await this.$http.get(`/user/${user._id}`,
//               {headers:{'Authorization': `JWT ${token}`}});
//           let person =newMan.data.data;
//           person.password = this.details.password;
//           person.status = this.details.status;
//           console.log(typeof(person));
//           delete person.created;
//           delete person.hash_password;
//           delete person.__v;
//           delete person._id;
//           //console.log(person);
//           //console.log(`${user._id}`);
//             await this.$http.delete(`/user/${user._id}`,user,
//                 {headers:{'Authorization': `JWT ${token}`}});
//           let response = await this.$http.post(`/auth/register`,person);
//           // let response = await this.$http.put(`/user/${this.user._id}`,this.details, {headers: {'Authorization': `JWT ${token}`}});
//           console.log(response.data.token);
//           if(response){
//             localStorage.removeItem("jwt");
//             swal("Success", "Login Successful", "Error");
//             this.$router.push("/");
//             }
//         }
//         else{
//           swal("Error", "Password and confirm password doesn't match...", "error");
//         }
//       } catch (err) {
//         swal("Error", "Something Went Wrong", "error");
//          console.log(err);
//       }
//     }
// //     async checkPassword() {
// //       if(this.login.password = "defPass") {
// //         swal("error","Change password");
// //         this.router.push("/changePass");
// //       }
// //       else{
// //         swal("Success", "Login Successful", "Error");
// //         this.$router.push("/home");
// //     }}
//   }
 };
</script>
