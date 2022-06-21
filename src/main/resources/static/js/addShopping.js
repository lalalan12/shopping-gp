window.onload = function () {
  var app = new Vue({
    el: '#app',
    data() {
       var checkNumber = (rule, value, callback) => {
         var reg =  /^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+|0)$)/;
         // value是输入，reg是规则，test是验证
         if (reg.test(value)) {
           callback()
         } else {
           callback(new Error("数据格式不正确!"))
         }
       };
      return {
        shopping: {
          pname: null,
          price: null,
          image: null,
          description: null,
          num: null,
          tid: null,
        },
        username: '',
        options: [{
          value: 1,
          label: '1.上衣'
        }, {
          value: 2,
          label: '2.下裤'
        }, {
          value: 3,
          label: '3.鞋子'
        }, {
          value: 4,
          label: '4.裙子'
        }], 
        value: '',
        rules: {
          pname: [{
            required: true,
            message: '商品名称不能为空！',
            trigger: 'blur'
          }],
          price: [{
            validator: checkNumber,
            trigger: 'blur'
          }],
          description: [{
            required: true,
            message: '商品描述不能为空！',
            trigger: 'blur'
          }],
          num: [{
            validator: checkNumber,
            trigger: 'blur'
          }],
          image: [{
            required: true,
            message: '图片不能为空！',
            trigger: 'blur'
          }],
        }
      };
    },
    created() {
      this.username = window.sessionStorage.getItem("username");
      console.log(this.username)
      if (!this.username || this.username != "admin") {
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
    methods: {
      addShopping() {
        this.$refs['shoppingForm'].validate((valid) => {
          if (valid) {
            this.shopping.tid = this.value;
            axios.post('api/shopping/addShopping', this.shopping)
              .then(response => {
                if (response.data) {
                  this.$message({
                    message: '添加成功！',
                    type: 'success',
                    showClose: true,
                    onClose() {
                      location = 'addShopping.html'
                    }
                  });
                } else {
                  alert("添加失败！")
                }
              })
              .catch(error => {
                alert(error);
              })
          } else {
            alert("请填写完整！")
          }
        })
      },
      resetShopping() {
        location.href="addShopping.html"
      },
      submitImage() {
        const secounds = 1
        let num = 0
        const timer = setInterval(() => {
          if(num < secounds) {
            num++
          }else {
            clearInterval(timer)
            this.shopping.image = this.$refs.iframe.contentWindow.document.body.innerHTML;
          }
        }, 1000)
      },
    },
  })
}