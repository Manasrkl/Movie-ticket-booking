const container=document.querySelector('.container');
const seats=document.querySelectorAll('.seat');
const count=document.getElementById('count');
const total=document.getElementById('total');
const mselect=document.getElementById('movie');
populateUI()
let ticketprice = +mselect.value;
//save selected movie index and price
function setmoviedata(movieindex,movieprice){
localStorage.setItem('selectedmovieindex',movieindex);
localStorage.setItem('selectedmovieprice',movieprice);
}

function updateSelectedCount() {
const selectedseats = document.querySelectorAll('.row .seat.selected');

const seatindex = [...selectedseats].map(function(seat){
    return [...seats].indexOf(seat);
})
localStorage.setItem('selectedseats',JSON.stringify(seatindex));

const selectedseatcount = selectedseats.length;
count.innerText = selectedseatcount;
total.innerText = selectedseatcount * ticketprice;
}
function populateUI(){
    const selectedseats=JSON.parse(localStorage.getItem('selectedseats'));
    if (selectedseats !== null && selectedseats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedseats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
        
    
}
mselect.addEventListener('change',(e)=>{
    ticketprice = +e.target.value;
    setmoviedata(e.target.selectedindex,e.target.value);
    updateSelectedCount();
})
container.addEventListener('click',(e)=>{
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    console.log(e.target.classList.toggle('selected'));
}
updateSelectedCount();
});
updateSelectedCount()
