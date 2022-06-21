window.onload = function () {
  var app = new Vue({
    el: '#app',
    data() {
      return {
        users: null,
        findData: '',
        isShow: false,
        findUser: [],
        username: '',
      }
    },
    created() {
      this.username = window.sessionStorage.getItem("username");
      if (!this.username || this.username != "admin") {
        this.$message({
          message: '未登录！',
          type: 'warning',
          showClose: true,
          onClose() {
            location = 'login.html'
          }
        });
      } else {
        this.allUser();
      }
    },
    methods: {
      findByUsername() {
        axios.get('/api/user/findByUsername/'+this.findData)
          .then((response) => {
            if (response.data) {
              this.findUser = [];
              this.findUser.push(response.data);
              this.isShow = true;
            } else {
              alert("该用户不存在！")
            }
          })
          .catch((error) => {
            alert(error);
          })
      },
      handleDelete(index, row) {
        axios.post('/api/user/deleteUser', this.users[index])
          .then((response) => {
            if (response.data) {
              alert("注销成功！");
              this.allUser();
            } else {
              alert("注销失败！")
            }
          })
          .catch((error) => {
            alert(error);
          })
      },
      allUser() {
        axios.post('api/user/allUser')
          .then((response) => {
            this.users = response.data;
            this.isShow = false;
          })
      }
    }
  })
}