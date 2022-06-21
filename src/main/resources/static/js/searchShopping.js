window.onload = function () {
  var app = new Vue({
    el: '.app',
    data() {
      return {
        activeIndex: '0',
        activeIndex2: '0',
        searchdata: '',
        shopping: null,
        addCar: {
          pid: null,
          pname: null,
          price: null,
          num: 1,
          allprice: null,
          username: null,
          image: null,
          description: null,
          checked: false 
        },
        isShow: false
      };
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
      searchShopping() {
        this.shopping = "";
        axios.get('/api/shopping/searchShopping/'+this.searchdata)
          .then(response => {
            if (response.data) {
              this.shopping = response.data;
            } else {
              this.$message({
                message: '无数据！',
                type: 'warning'
              });
            }
          })
          .catch(function (error) {
            alert(error);
          });
      },
      openAdd(index) {
        this.addCar.pid = this.shopping[index].pid;
        this.addCar.pname = this.shopping[index].pname;
        this.addCar.price = this.shopping[index].price;
        this.addCar.image = this.shopping[index].image;
        this.addCar.allprice = this.shopping[index].price;
        this.addCar.description = this.shopping[index].description;
        this.addCar.username = window.sessionStorage.getItem("username");
        if (this.addCar.username) {
          this.$confirm('是否将商品加入购物车?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            if (this.shopping[index].num > 0) {
              axios.post('/api/car/saveCar', this.addCar)
              .then(response => {
                if (response.data) {
                  this.$message({
                    type: 'success',
                    message: '加入成功!'
                  });
                } else {
                  this.$message({
                    type: 'warning',
                    message: '加入失败！'
                  })
                }
              })
            } else {
              alert("该商品缺货中！")
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消加入'
            });
          });
        } else {
          this.$message({
            type: 'warning',
            message: '请登录！',
            showClose: true,
            onClose() {
              location = 'login.html'
            }
          })
        }
      }
    },
    created() {
      this.searchdata = window.sessionStorage.getItem('search');
      this.searchShopping();
    }
  })
}