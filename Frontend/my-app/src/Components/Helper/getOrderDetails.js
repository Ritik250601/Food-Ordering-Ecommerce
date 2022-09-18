
export const orderDetails =  (token, fun1) => {
   
    // fetch("http://localhost:8080/admin/orderDetails", {
        fetch("https://spring-boot-food-ordering-app.herokuapp.com/admin/orderDetails", {

        method:'GET',
        headers:{'Content-Type':'application/json', 
        Authorization: `Bearer ${token}`,
    }

       }).then((response) => response.json())
       .then((response) => {
        fun1(response);
       }
       )
    .catch(error => console.log(error))

}

