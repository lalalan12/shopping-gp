window.onload = function () {
     var app = new Vue({
     el: '#app',
     data() {
       var checkUsername = (rule, value, callback) => {
         // value是输入，reg是规则，test是验证
         if (value) {
           // 判断后端的接口数据库有没有
           axios.get('/api/user/get/' + value)
             .then(function (response) {
               if (response.data) {
                 callback(new Error("用户名已被注册，请更换！"))
               } else {
                 callback()
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         } else {
           callback(new Error("请输入用户名!"))
         }
       };
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
         user: {
           tel: null,
           username: '',
           name: '',
           address: '',
           password: null,
           passwordAgain: null,
           agree: false
         },
         rules: {
           tel: [{
             validator: checkTel,
             trigger: 'blur'
           }],
           username: [{
             validator: checkUsername,
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
      login() {
          location.href = 'login.html';    
       },
       register(formName) {
         this.$refs[formName].validate((valid) => {
           if (valid) {
             axios.post('/api/user/register', this.user)
               .then(response => {
                 if (response.data) {
                   this.$message({
                     message: '恭喜你，注册成功！',
                     type: 'success',
                     showClose: true,
                     onClose() {
                       location = 'login.html'
                     }
                   });
                 } else {
                   this.$message({
                     message: '注册失败！',
                     type: 'warning'
                   });
                 }
               })
               .catch(function (error) {
                 alert(error);
               });

           } else {
             alert('error submit!!');
             return false;
           }
         });
       }
     }
   })
}