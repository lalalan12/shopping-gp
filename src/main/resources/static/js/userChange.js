window.onload = function () {
  var app = new Vue({
    el: '.app',
    data() {
       var checkTel = (rule, value, callback) => {
         var reg = /^\d{11}$/;
         // value是输入，reg是规则，test是验证
         if (reg.test(value)) {
           callback()
         } else {
           callback(new Error("手机号码格式不正确!"))
         }
       };
       var checkPassword = (rule, value, callback) => {
         var reg = /^\w{5,20}$/;
         if (reg.test(value)) {
           callback()
         } else {
           callback(new Error("密码格式不正确！"))
         }
       };
       var checkPasswordAgain = (rule, value, callback) => {
         if (value === '') {
           callback(new Error('请再次输入密码'));
         } else if (value !== this.user.password) {
           callback(new Error('两次输入密码不一致！'));
         } else {
           callback()
         }
       };
      return {
         activeIndex: '5',
         activeIndex2: '5',
         searchdata: '',
         user: {
           tel: null,
           username: '',
           name: '',
           address: '',
           password: null,
           passwordAgain: null,
           passwordGet: null,
           passwordCheck: null
         },
         rules: {
           tel: [{
             validator: checkTel,
             trigger: 'blur'
           }],
           password: [{
             validator: checkPassword,
             trigger: 'blur'
           }],
           passwordAgain: [{
             validator: checkPasswordAgain,
             trigger: 'blur'
           }],
           address: [{
             required: true,
             message: '地址不能为空！',
             trigger: 'blur'
           }],
           name: [{
             required: true,
             message: '真实姓名不能为空！',
             trigger: 'blur'
           }],
         }
       }
     },
    methods: {
      searchSubmit() {
        if (this.searchdata) {
          window.sessionStorage.setItem("search",this.searchdata);
          location.href = "searchShopping.html"
        } else {
          alert("请输入需要搜索的商品名称/类型！")
        }   
      },
      getUserMessage() {
        this.user.username = window.sessionStorage.getItem("username");
        if (this.user.username && this.user.username!=='admin') {
          axios.post('/api/user/userMessage', this.user)
          .then(response => {
            if (response.data) {
              this.user.tel = response.data.tel;
              this.user.name = response.data.name;
              this.user.address = response.data.address;
              this.user.passwordGet = response.data.password;
            }
          })
          .catch(function (error) {
            alert(error);
          });
        } else {
          this.$message({
                message: '未登录！',
                type: 'warning',
                showClose: true,
                onClose() {
                  location = 'login.html'
                }
          });
        }
      },
      okChange(formName) {
        if (this.user.passwordCheck === this.user.passwordGet) {
          if (this.user.username && this.user.name && this.user.tel && this.user.password && this.user.passwordCheck && this.user.address && this.user.passwordAgain) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                axios.post('/api/user/userChange', this.user)
                  .then(response => {
                    if (response.data) {
                      this.$message({
                        message: '恭喜你，修改成功！',
                        type: 'success',
                        showClose: true,
                        onClose() {
                          location = 'user.html'
                        }
                      });
                    }
                  })
                  .catch(function (error) {
                    alert(error);
                  })
              } else {
                alert('error submit!!');
                return false;
              }
            });
          } else {
            alert("请填写完整！")
          }
        } else {
          alert("原密码不正确！")
        }
      },
      cancelChange() {
        location.href = "user.html"
      }
    },
    created() {
      this.getUserMessage();
    }
  })
}