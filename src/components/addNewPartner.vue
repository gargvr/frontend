<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <h3 class="navbar-brand">Add Channel Partners</h3>
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
          @submit.prevent="addPartners"
        >
        <h5 class="text-left">Email:</h5>
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model = "newPartner.email"
            required
          />
          <h5 class="text-left">Full name:</h5>
          <input
            type="text"
            id="fullName"
            class="form-control mb-5"
            placeholder="Name"
            v-model = "newPartner.fullName"
            required
          />
          <h5 class="text-left">Region:</h5>
          <input
            type="text"
            id="region"
            class="form-control mb-5"
            placeholder="Region"
            v-model = "newPartner.region"
            required
          />
          <h5 class="text-left">Address:</h5>
          <input
            type="text"
            id="address"
            class="form-control mb-5"
            placeholder="Address"
            v-model = "newPartner.address"
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

export default {
  data() {
    return {
      newPartner: {
        email: "",
        fullName:"",
        region:"",
        address:"",
        password: "defPass",
        role:"supervisor",
        status:"Pending"
      }
    };
  },
    methods :{
      logUserOut() {
        localStorage.removeItem("jwt");
        this.$router.push("/");
      }
    ,
    async addPartners() {
              console.log(this.newPartner);
      try {
        let response = await this.$http.post("/auth/register", this.newPartner);
        console.log(this.response);
          swal(response);
          this.$router.push("/partners");
        }
       catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(response.data.json);
        console.log(err.response);
      }
    }
  }
}
</script>
