window.onload = function () {
  var app = new Vue({
    el: '.app',
    data() {
      return {
        isShow: false,
        activeIndex: '7',
        activeIndex2: '7',
        car: {
          username: '',
        },
        searchdata: '',
        cars: [],
        allMoney: 0,
        allCount: 0,
        isChecked: false,
        shopping: {
          pid: '',
          num: 0,
          address: '',
          name: '',
          tel: '',
        }
      };
    },
    created() {
      this.getCar();
    },
    updated(){
      this.isChecked = this.cars.find(item => item.checked === false) === undefined;
      if (this.cars.length == 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    computed: {
      allCounter(){
        this.allCount = this.cars.filter(item => item.checked).length;
        return this.allCount;
      },
      allMoneyer() {
        this.allMoney = 0;
        for (let item of this.cars) {
          if (item.checked) {
            this.allMoney += item.allprice;
          }
        }
        return this.allMoney;
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
      getCar() {
        this.car.username = window.sessionStorage.getItem('username');
        if (this.car.username && this.car.username!=='admin') {
          axios.post('/api/car/getCar', this.car)
            .then(response => {
              this.cars = response.data;
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
      deleteCar(index) {
        this.$confirm('是否将商品从购物车中删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          axios.post('/api/car/deleteCar', this.cars[index])
            .then(response => {
              if (response.data) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                  showClose: true,
                  onClose() {
                    location = 'car.html'
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
      },
      checkedActive(index) {
        this.cars[index].checked = !this.cars[index].checked;
        axios.post('/api/car/updateCar', this.cars[index])
      },
      checkedAll() {
        let checkedFalse = this.cars.find(item => !item.checked)
        if(checkedFalse){
          this.cars.forEach(item => {
            item.checked = true
          })
        }else {
          this.cars.forEach(item =>{
            item.checked = false
          })
        }
        this.isChecked = this.cars.find(item => item.checked === false) === undefined
        for (let i of this.cars) {
          axios.post('/api/car/updateCar', i)
        }
      },
      sumup() {
        this.$confirm('确定购买?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          for (let item of this.cars) {
            if (item.checked) {
              axios.get('api/user/findByUsername/'+this.car.username)
                .then(response=>{
                  item.address = response.data.address;
                  item.name = response.data.name;
                  item.tel = response.data.tel;
                  axios.post('/api/order/saveOrder', item)
                    .then(response => {
                      if (response.data) {
                        this.shopping.pid = item.pid;
                        this.shopping.num = item.num;
                        this.$message({
                          type: 'success',
                          message: '购买成功!',
                        });
                        axios.post('/api/car/deleteCar', item);
                        axios.post('/api/shopping/updateShopping', this.shopping);
                        this.getCar();
                      } else {
                        this.$message({
                          type: 'warning',
                          message: '购买失败！'
                        })
                      }
                    }).catch((error) => {
                  alert(error)
                });
              })

            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消购买'
          });          
        });
      }
    },

  })
}