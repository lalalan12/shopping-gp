window.onload = function () {
  var app = new Vue({
    el: '.app',
    data() {
      return {
        activeIndex: '6',
        activeIndex2: '6',
        searchdata: '',
        username: '',
        orders: null,
        isShow: false,
      };
    },
    created() {
      this.getOrder();
    },
    updated() {
      if (this.orders.length == 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
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
      getOrder() {
        this.username = window.sessionStorage.getItem('username');
        if (this.username && this.username!=='admin') {
          axios.get('/api/order/getOrder/'+this.username)
            .then(response => {
              this.orders = response.data;
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
      deleteOrder(index) {
        if (this.orders[index].state == "已完成") {
          this.$confirm('是否删除该订单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            axios.post('/api/order/deleteOrder', this.orders[index])
              .then(response => {
                if (response.data) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!',
                    showClose: true,
                    onClose() {
                      location = 'order.html'
                    }
                  });
                } else {
                  this.$message({
                    type: 'warning',
                    message: '删除失败！'
                  })
                }
              })
              .catch(function(error) {
                alert(error);
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        } else {
          alert("订单暂未完成，无法删除！")
        }
        
      }
    }
  })
}