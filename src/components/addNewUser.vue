<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <h3 class="navbar-brand">Add Users</h3>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link btn btn-primary btn-block my-4" @click="logUserOut"> Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
          <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="addUsers"
        >
        <h5 class="text-left">Email:</h5>
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model = "newUser.email"
            required
          />
          <h5 class="text-left">Full name:</h5>
          <input
            type="text"
            id="fullName"
            class="form-control mb-5"
            placeholder="Name"
            v-model = "newUser.fullName"
            required
          />
          <!-- <h5 class="text-left">Region:</h5>
          <input
            type="text"
            id="region"
            class="form-control mb-5"
            placeholder="Region"
            v-model = "newUser.region"
            required
          /> -->
          <h5 class="text-left">Address:</h5>
          <input
            type="text"
            id="address"
            class="form-control mb-5"
            placeholder="Address"
            v-model = "newUser.address"
            required
          />
          <!-- Send mail button -->
          <center>
            <button 
            class="btn btn-primary btn-block w-75 my-4" type="submit">
              Submit
            </button>
          </center>
          </form>
        </div>
    </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      newUser: {
        email: "",
        fullName:"",
        region:"",
        address:"",
        password: "defPass",
        role:"basic",
        status:"Pending"
      },
      head:""
    };
  },
    methods :{
    async onLoad(token){
        let decoded = VueJwtDecode.decode(token);
          this.supervisor = decoded;
          let superV = await this.$http.get(`/user/${this.supervisor._id}`, 
            {headers: {
              'Authorization': `JWT ${token}`}
            });
            this.head = superV.data.data.region;
      }
    ,
      logUserOut() {
        localStorage.removeItem("jwt");
        this.$router.push("/");
      }
    ,
    async addUsers() {
      this.newUser.region = this.head;
      console.log(this.newUser);
      try {
        let response = await this.$http.post("/auth/register", this.newUser);
        console.log(response);
          swal("Success","User added successfully");
          this.$router.push("/users");
        }
       catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(response.data.json);
        console.log(err.response);
      }
    }
  },
  created() {
      this.onLoad(localStorage.getItem("jwt"));
    }
}
</script>
