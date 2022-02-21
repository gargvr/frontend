<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
        <ul class="navbar-nav">
          <li class="nav-link" v-if="user.role === 'admin'" @click="allPartners(user.role)">Channel Partners</li>
          <li class="nav-link" v-else-if="user.role === 'supervisor'" @click="allUsers(user.role)">Users List</li>
        </ul>
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link btn btn-primary btn-block my-4" @click="logUserOut"> Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">Name : {{ user.fullName }}</li>
              <li class="list-group-item">Email : {{ user.email }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import swal from "sweetalert"
import VueJwtDecode from "vue-jwt-decode";
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
    async allPartners(role){
      try{
      if(role === "admin"){
       this.$router.push("/partners");
       console.log(role)
       }
      else{
        swal("error");
      }
      }
      catch (err) {
        
        console.log(err);

    }
    },
    async allUsers(role){
      try{
       this.$router.push("/users");
       console.log(role)
      }
      catch (err) {
        console.log(err);
    }
    },
  },

  created() {
    this.getUserDetails();
  }
};
</script>

<style scoped></style>
