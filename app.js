

let inp_title = document.getElementById("inp-title");
let inp_price = document.getElementById("inp-price");
let inp_ads = document.getElementById("inp-ads");
let inp_taxes = document.getElementById("inp-taxes");
let inp_discount = document.getElementById("inp-discount");
let inp_count = document.getElementById("inp-count");
let inp_category = document.getElementById("inp-category");
let btn_create = document.getElementById("btn-create");
let total_price = document.getElementById("total-price");
let btn_total = document.getElementById("btn-total");
let inp_search = document.getElementById("inp-search");


let mode = "create";
let index; 



// get total
function GetTotal(){
    if (inp_price.value != "") {
            total_price.innerHTML = Number(inp_price.value)  + Number(inp_ads.value) + Number(inp_taxes.value) - Number(inp_discount.value);
            btn_total.style.backgroundColor = "#31a4982d";
    }else{
        total_price.innerHTML = "";
        btn_total.style.backgroundColor = "rgba(255, 0, 0, 0.201)";
    }

}

let data_products;
if (localStorage.porduct != null){
    data_products = JSON.parse(localStorage.porduct);
}else{
    data_products = [];
}
// save data in local storage
function CreateProduct(){
    let porduct = {
        title : inp_title.value,
        price : inp_price.value,
        ads : inp_ads.value,
        taxes : inp_taxes.value,
        discount : inp_discount.value,
        total : total_price.innerHTML,
        count : inp_count.value,
        category : inp_category.value,
    };
if (porduct.title != "" && porduct.price != "" && porduct.category != "" ){
    if (porduct.count <= 100){
        if (mode == "create"){
            if (Number(porduct.count) > 1){
                for (let x = 0 ; x < Number(porduct.count) ; x++){
                        data_products.push(porduct);
                        localStorage.setItem("porduct" ,JSON.stringify(data_products));
                    };
            }else{
                data_products.push(porduct);
                localStorage.setItem("porduct" ,JSON.stringify(data_products));       
            };
            ClearData();
            ReadData();
        }else{
            data_products[index] = porduct;
            localStorage.setItem("porduct" ,JSON.stringify(data_products));
            ClearData();
            ReadData();
            mode = "create";
            btn_create.innerHTML = "Create";
            inp_count.style.display = "block";
        };
        
    }else{
     alert("The count must be <= 100 ");   
    };

}else{
    alert("Please check the data");
};
};

// clear data
function ClearData(){
    inp_title.value = "";
    inp_price.value = "";
    inp_ads.value = "";
    inp_taxes.value = "";
    inp_discount.value = "";
    total_price.innerHTML = "";
    btn_total.style.backgroundColor = "rgba(255, 0, 0, 0.201)";
    inp_count.value = "";
    inp_category.value = "";
}

// read data
function ReadData(){
    let tbody = '';
    if (screen.availWidth <= 500){
        for (let i= 0 ; i < data_products.length ; i++){
                    tbody +=`
                        <tr>
                            <td>${i+1}</td>
                            <td>${data_products[i].title}</td>
                            <td>${data_products[i].price}</td>
                            <td>${data_products[i].total}</td>
                            <td>${data_products[i].category}</td>
                            <td><button onclick="UpdateData(${i})" id="btn-update"><i class="fa-solid fa-pen-to-square"></i></button></td>
                            <td><button onclick="DeleteItem(${i})" id="btn-delete"><i class="fa-solid fa-trash"></i></button></td>
                        </tr>
                    `
        };
    }else{
        for (let i= 0 ; i < data_products.length ; i++){
                    tbody +=`
                        <tr>
                            <td>${i+1}</td>
                            <td>${data_products[i].title}</td>
                            <td>${data_products[i].price}</td>
                            <td>${data_products[i].taxes}</td>
                            <td>${data_products[i].ads}</td>
                            <td>${data_products[i].discount}</td>
                            <td>${data_products[i].total}</td>
                            <td>${data_products[i].category}</td>
                            <td><button onclick="UpdateData(${i})" id="btn-update"><i class="fa-solid fa-pen-to-square"></i></button></td>
                            <td><button onclick="DeleteItem(${i})" id="btn-delete"><i class="fa-solid fa-trash"></i></button></td>
                        </tr>
                    `
        };
    }
    document.getElementById("tbody").innerHTML = tbody;
    let btnbtn_delete_all = document.getElementById("btn-delete-all");
    if (data_products.length > 0){
        btnbtn_delete_all.style.display = "block";
        let porducts_number = data_products.length;
        document.getElementById("btn-delete-all-span").innerHTML = `(${porducts_number})`;
    }else{
        btnbtn_delete_all.style.display = "none";
    }
}
ReadData();

// delete data
function DeleteItem(i){
    data_products.splice(i,1);
    localStorage.removeItem(localStorage.porduct[i]);
    localStorage.setItem("porduct" ,JSON.stringify(data_products));
    ReadData();
}
function DeleteAll(){
    localStorage.clear();
    data_products.splice(0);
    ReadData();
}

function UpdateData(i){
    inp_title.value = data_products[i].title;
    inp_price.value = data_products[i].price;
    inp_ads.value = data_products[i].ads;
    inp_taxes.value = data_products[i].taxes;
    inp_discount.value = data_products[i].discount;
    inp_count.style.display = "none";
    inp_category.value = data_products[i].category;
    GetTotal();
    btn_create.innerHTML = "Update";
    mode = "update";
    index = i;
    scroll({
        top : 0,
        behavior : "smooth"
    });
};



let searchmode = "title";
function GetSearchMode(id){
    if (id == "btn-search-title"){
        searchmode = "title";
    }else{
        searchmode = "category";
    }
    inp_search.value = "";
    inp_search.placeholder = `search by ${searchmode}`;
    ReadData();
    inp_search.focus();
}

function SearchData(value){
    let tbody = '';
    for (let x = 0 ; x < data_products.length ; x++){
        if(searchmode == "title"){
                if (data_products[x].title.toLowerCase().includes(value.toLowerCase())){
                    if(screen.availWidth <= 500){
                        tbody +=`
                            <tr>
                                <td>${x+1}</td>
                                <td>${data_products[x].title}</td>
                                <td>${data_products[x].price}</td>
                                <td>${data_products[x].total}</td>
                                <td>${data_products[x].category}</td>
                                <td><button onclick="UpdateData(${x})" id="btn-update"><i class="fa-solid fa-pen-to-square"></i></button></td>
                                <td><button onclick="DeleteItem(${x})" id="btn-delete"><i class="fa-solid fa-trash"></i></button></td>
                            </tr>
                        `;
                    }else{
                        tbody +=`
                            <tr>
                                <td>${x+1}</td>
                                <td>${data_products[x].title}</td>
                                <td>${data_products[x].price}</td>
                                <td>${data_products[x].taxes}</td>
                                <td>${data_products[x].ads}</td>
                                <td>${data_products[x].discount}</td>
                                <td>${data_products[x].total}</td>
                                <td>${data_products[x].category}</td>
                                <td><button onclick="UpdateData(${x})" id="btn-update"><i class="fa-solid fa-pen-to-square"></i></button></td>
                                <td><button onclick="DeleteItem(${x})" id="btn-delete"><i class="fa-solid fa-trash"></i></button></td>
                            </tr>
                        `;
                    };
                };
        }else{
                if (data_products[x].category.toLowerCase().includes(value.toLowerCase())){
                    if(screen.availWidth <= 500){
                        tbody +=`
                            <tr>
                                <td>${x+1}</td>
                                <td>${data_products[x].title}</td>
                                <td>${data_products[x].price}</td>
                                <td>${data_products[x].total}</td>
                                <td>${data_products[x].category}</td>
                                <td><button onclick="UpdateData(${x})" id="btn-update"><i class="fa-solid fa-pen-to-square"></i></button></td>
                                <td><button onclick="DeleteItem(${x})" id="btn-delete"><i class="fa-solid fa-trash"></i></button></td>
                            </tr>
                        `;
                    }else{
                        tbody +=`
                            <tr>
                                <td>${x+1}</td>
                                <td>${data_products[x].title}</td>
                                <td>${data_products[x].price}</td>
                                <td>${data_products[x].taxes}</td>
                                <td>${data_products[x].ads}</td>
                                <td>${data_products[x].discount}</td>
                                <td>${data_products[x].total}</td>
                                <td>${data_products[x].category}</td>
                                <td><button onclick="UpdateData(${x})" id="btn-update"><i class="fa-solid fa-pen-to-square"></i></button></td>
                                <td><button onclick="DeleteItem(${x})" id="btn-delete"><i class="fa-solid fa-trash"></i></button></td>
                            </tr>
                        `;
                    };
                };
            
        };
    };
    document.getElementById("tbody").innerHTML = tbody;

};
