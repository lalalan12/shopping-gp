window.onload=function () {
  var app = new Vue({
    el: '#app',
    data() {
      return {
        user: {
          username: null,
          password: null,
          checked: false
        },
        rules: {
          username: [{
             required: true,
             message: '用户名不能为空！',
             trigger: 'blur'
           }],
          password: [{
             required: true,
             message: '密码不能为空！',
             trigger: 'blur'
           }],
        }
      }
    },
    methods: {
      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.user.checked) {
                axios.post('/api/admin/login', this.user)
                .then(response => {
                if (response.data) {
                  //把token存储在本地
                  sessionStorage.setItem("token",response.data)
                  sessionStorage.setItem("username",this.user.username)
                  location.href="admin.html"
                } else {
                    this.$message({
                      message: '用户名或密码错误',
                      type: 'warning'
                    });
                }
              })
              .catch(function (error) {
                alert(error);
              });
            } else {
                axios.post('/api/user/login', this.user)
              .then(response => {
                if (response.data) {
                  //把token存储在本地
                  sessionStorage.setItem("token",response.data)
                  sessionStorage.setItem("username",this.user.username)
                  location.href="index.html"
                } else {
                    this.$message({
                      message: '用户名或密码错误',
                      type: 'warning'
                    });
              }
              })
              .catch(function (error) {
                alert(error);
              });
            }
          } else {
            alert('请输入用户名和密码!!');
            return false;
          }
        });
      }
    }
  })
}