window.onload = function () {
  var app = new Vue({
    el: '.app',
    data() {
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
           agree: false
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
      changeUser() {
        location.href="userChange.html"
      },
      exitUser() {
        location.href="login.html"
      }
    },
    created() {
      this.getUserMessage();
    }
  })
}