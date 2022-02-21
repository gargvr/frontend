<template>
  <div class="container">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <h3 class="navbar-brand">Supervisor Panel ({{head.region}} region)</h3>
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
          <li class="nav-link" @click="addNewUser()">Add User</li>
        </ul>
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link btn btn-primary btn-block my-4" @click="logUserOut()"> Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
      <table class="table">
        <thead>
          <tr>
            <th class="table-head">Name</th>
            <th class="table-head">Email</th>
            <th class="table-head">Status</th>
            <th class="table-head">Created At</th>
            <th class="table-head">Edit</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="user in tableData">
            <tr v-if="user.role === 'basic' && user.region === head.region" :key="user.email">
            <td>{{user.fullName}}</td>
            <td>{{user.email}}</td>
            <td>{{user.status}}</td>
            <td>{{user.created}}</td>
            <td @click="editUser">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </td>
            </tr>
          </template>
        </tbody>
      </table>
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
        supervisor:"",
        head:"",
        tableData: [],
        supervisorRole:""
      }
    },
    methods: {
      async getAll(token) {
        try {
          let id = localStorage.getItem("id");
          if(id){
            let superV = await this.$http.get(`/user/${id}`, 
            {headers: {
              'Authorization': `JWT ${token}`}
            });
            this.head = superV.data.data;
            let response = await this.$http.get("/users", 
            {headers: {
              'Authorization': `JWT ${token}`}
            });
          let usersList = response.data.users; 
          this.tableData = usersList;
          }
          else{
            let decoded = VueJwtDecode.decode(token);
            this.supervisor = decoded;
            let superV = await this.$http.get(`/user/${this.supervisor._id}`, 
              {headers: {
                'Authorization': `JWT ${token}`}
              });
              this.head = superV.data.data;
              let response = await this.$http.get("/users", 
              {headers: {
                'Authorization': `JWT ${token}`}
              });
            let usersList = response.data.users; 
            this.tableData = usersList;}
        }catch (err) {
          swal("Error", "Something Went Wrong", "error");
          console.log(err);
        }
      },
      addNewUser(){
        this.$router.push("/addUser");
      },
      backPage(){
        localStorage.removeItem("id");
},
      editUser(){
        this.$router.push("/editUser");
      },
      logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
    },
    created() {
      this.getAll(localStorage.getItem("jwt"));
      this.backPage();
    }
  };
</script>
