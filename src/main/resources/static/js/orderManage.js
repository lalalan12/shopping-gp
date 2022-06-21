window.onload = function () {
  var app = new Vue({
    el: '#app',
    data() {
      return {
        orders: null,
        changeState: {
         state: '', 
        },
        isShow: false,
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
        this.allOrder();
      }
    },
    filters:{
      dateFilter(date){
        if(date == null || date == ''){
          return ''
        }else {
          let d = new Date(date)
          let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1
          let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
          let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
          let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
          let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
          let times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
          return times
        }
      }
  },
    methods: {
      allOrder() {
        axios.post('api/order/allOrder')
          .then((response) => {
            this.orders = response.data;
          })
      },
      handleChange(index, row) {
        this.changeState = this.orders[index];
        this.isShow = true;
      },
      resetForm() {//重置表单数据
        this.$refs['myform'].resetFields();
        location.href = "orderManage.html";
      },
      submitState() {
        axios.post('api/order/orderState', this.changeState)
          .then(response => {
            // 返回数据为1，代表保存成功
            if(response.data){
              this.$message({
                message: '修改成功',
                type: 'success',
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        this.isShow = false;
      },
    },
    

  })
}