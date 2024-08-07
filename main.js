let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let sudmit = document.getElementById('sudmit')


   let mood = 'create';
   let tmp;


//console.log(title,price,taxes,ads,discount,total,count,category,submit)

//get Total
function getTotal() 
{
   if (price.Value != '') {
      let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
      total.innerHTML = result;
      total.style.background = '#040';
   }
   else {
      total.innerHTML = '';
      total.style.background = '#a00d02';

   }
}

//create prodact

let datapro;
if (localStorage.product != null) 
{
   datapro = JSON.parse(localStorage.product)
} else{

   datapro = [];
}

 //butoom

sudmit.onclick = function ()
{
   let newpro =
   {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
   }

   if(title.value != '' && price.value != ''
       && category.value != '' && newpro.count<101 ){

      if(mood === 'create' ){

         if (newpro.count > 1) {
            for (let i = 0; i < newpro.count; i++)
               datapro.push(newpro);
      
         } else {
            datapro.push(newpro);
         }
      
      }else{
         datapro[  tmp    ] = newpro;
         mood = 'create';
         sudmit.innerHTML = 'create';
         count.style.display ='block';
      }
      clearData()
   }

  

 


   // save localstorage
   localStorage.setItem('product', JSON.stringify(datapro))

   total.style.background = '#a00d02';


   showData()
   
}


//  clear Data

function clearData()
{
   title.value = "";
   price.value = "";
   ads.value = "";
   taxes.value = "";
   discount.value = "";
   total.innerHTML = "";
   count.value = "";
   category.value = "";

}

//read data shw Data 
function showData() 
{
   let table = '';
   for (let i = 0; i < datapro.length; i++) {

      table += `
            
             <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                 <td>${datapro[i].total}</td>
                 <td>${datapro[i].category}</td>

                <td><button onclick=updateData(${i}) id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                  </tr>
            
            `;
   }

   document.getElementById('tbody').innerHTML = table;
   let btnDeleat = document.getElementById('deleteAil');
   if (datapro.length > 0) {
      btnDeleat.innerHTML = `
      
      <button onclick="deleteAil()">Delete Ail (${datapro.length})</button>
      `
   } else {
      btnDeleat.innerHTML = '';
   }

}




//Delete
function deleteData(i) 
{
   datapro.splice(i, 1);
   localStorage.product = JSON.stringify(datapro);

   showData()

}



//Deleat Ail
function deleteAil() 
{
   localStorage.clear()
   datapro.splice(0)
   showData()

}

//updata Data
function updateData(i)
{
   title.value = datapro[i].title;
   price.value = datapro[i].price;
   taxes.value = datapro[i].taxes;
   ads.value = datapro[i].ads;
   discount.value = datapro[i].discount;
   getTotal()
   count.style.display = 'none';
   category.value = datapro[i].category;
   sudmit.innerHTML ='Update';
   mood = 'Update';
   tmp = i ;
   scroll({
      top:0,
      behavior: 'smooth'
   })
}


// serach
let searchMood = 'title';

function getserachData(id)
{
  let search = document.getElementById('search');
  
  if(id == 'searchTitle')
  {
   searchMood = 'title';
  }
  else
  {

   searchMood = 'category';
  }

  search.focus();
  search.placeholder = (" search By " + searchMood ) ;
  search.value = '';
  showData()
}


//طريقه البحث عن طريق الكاتجري وي التايتال بيلازم لوب عشان هي اللي بتبحث في المصفوفه

function searchData(value)
{
   let table = '';
   for(let i = 0; i< datapro.length;i++)
   {
         if(datapro[i].title.includes(value))
         {
            table += `
            
             <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                 <td>${datapro[i].total}</td>
                 <td>${datapro[i].category}</td>

                <td><button onclick=updateData(${i}) id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                  </tr>
            
            `;
         }
         
     if(searchMood == 'title' ) //Search title
       {
         
       }
      else //Search catgeory
       {
   
       }
   }


      
   document.getElementById('tbody').innerHTML = table;

}


showData()

//count

