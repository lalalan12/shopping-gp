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
       var checkImage = (rule, value, callback) => {
         var reg = /\w(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/i;
         if (reg.test(value)) {
           callback()
         } else {
           callback(new Error("图片格式不正确！"))
         }
       };
      return {
        shoppings: null,
        changeShopping: {
          pid: null,
          pname: null,
          price: null,
          num: null,
          description: null,
          image: null,
          tid: null
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
        isShow: false,
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
          image: [{
            validator: checkImage,
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
          tid: [{
            required: true,
            message: '商品类型不能为空！',
            trigger: 'blur'
          }],
        }
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
        this.allShopping();
      }
      
    },
    methods: {
      allShopping() {
        axios.post('/api/shopping/allShopping')
          .then((response) => {
            this.shoppings = response.data;
          })
      },
      handleChange(index, row) {
        this.changeShopping = this.shoppings[index];
        this.isShow = true;
        this.value = this.changeShopping.tid;
      },
      handleDelete(index, row) {
        this.$confirm('确定删除该商品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/api/shopping/deleteShopping', this.shoppings[index])
            .then(response => {
              if (response.data) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                  showClose: true,
                  onClose() {
                    location = 'shoppingManage.html'
                  }
                });
              } else {
                alert("删除失败！")
              }
            })
            .catch(error => {
              alert(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      resetForm() {//重置表单数据
        this.$refs['myform'].resetFields();
      },
      submitShopping() {
        axios.post('api/shopping/updateShoppingAdmin', this.changeShopping)
          .then(response => {
            // 返回数据为1，代表保存成功
            console.log("1");
            if(response.data){
              this.$message({
                message: '修改成功',
                type: 'success',
                showClose: true,
                onClose() {
                  location = "shoppingManage.html";
                }
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        this.isShow = false;
      },
      submitImage() {
        const secounds = 1
        let num = 0
        const timer = setInterval(() => {
          if(num < secounds) {
            num++
          }else {
            clearInterval(timer)
            this.changeShopping.image = this.$refs.iframe.contentWindow.document.body.innerHTML;
          }
        }, 1000)
      },
    }

  })
}