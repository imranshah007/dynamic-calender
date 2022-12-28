function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");


createYear = generate_year_range(1970, 2050);
/** or
 * createYear = generate_year_range( 1970, currentYear );
 */

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = "";
var days = "";

var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

if (lang == "en") {
    months = monthDefault;
    days = dayDefault;
} else if (lang == "id") {
    months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
} else if (lang == "fr") {
    months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
} else {
    months = monthDefault;
    days = dayDefault;
}


var $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    var firstDay = ( new Date( year, month ) ).getDay();

    tbl = document.getElementById("calendar-body");

    
    tbl.innerHTML = "";

    
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for ( var i = 0; i < 6; i++ ) {
        
        var row = document.createElement("tr");

        
        for ( var j = 0; j < 7; j++ ) {
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = `date-picker ${date}`
                // date4(cell);
                    // const ele1 = cell.getAttribute("data-date")
                cell.innerHTML = "<span>" + date + "</span>";


                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
                    console.log(cell);
                }
                cell.addEventListener('click', (date) => date3(date));

                row.appendChild(cell);
                date++;
                // const cell2 = document.getElementsByClassName(date);
                // console.log(cell2);
            }
        }

        tbl.appendChild(row);
    }

}

// const cell2 = document.getElementsByClassName("button1");
// cell2[0].addEventListener("click", date3);


// function date4(cell){
//     console.log(cell);
    // const ele1 = cell.getAttribute("data-date");
//     const ele4 = document.getElementsByClassName(ele1);
//     console.log(ele4);
//     cell.addEventListener("click", date3(ele1));
//     console.log(cell);

// }
// var cells = document.querySelectorAll("td");

// for (var cell of cells) {
//     console.log(cell);

// }


function date5(){
    const value = document.getElementById("value").value;

    const ele = document.getElementsByClassName(value);
    console.log(ele);
    if(ele >= 32){
        alert("no date is available");
        return;
    }

    ele[0].className += ` selected2`

    value.value =" ";
}

const btn = document.getElementsByClassName("button1");
console.log(btn);
btn[0].addEventListener('click',date5);



function date3(cell){
    console.log(cell.path);
    console.log(cell);

    console.log(cell.path[0].innerHTML);

    const date  = cell.path[0].innerHTML;
    const ele = document.getElementsByClassName(date);
    console.log(ele[0].className);
    if(ele[0].className == `date-picker ${date}`){
        ele[0].className += ` selected2`
    }else{
        ele[0].className = `date-picker ${date}`
    }
}
    

    // const focusedElement  = document.getElementsByClassName("selected");
    // console.log(focusedElement[0].className);
    // focusedElement[0].className = `date-picker ${ele}`;





// const element3 = document.getElementsByTagName("td");
// element3.addEventListner('click', date3)


const elements = document.getElementsByTagName("td");
console.log(elements);

// elements.map(element => {
//     console.log(element);
// //    element.addEventListner('click', (e)=>{
// //      console.log('someone hit me');
// //    });
// });



// const ele = document.getElementById("10");
// console.log(ele);
// ele.setAttribute("imran","sai111");


// const element = document.getElementsByTagName("td");
// console.log(element);
// const element2 = element.getAttribute("className").value;
// console.log(element2);
// const element3 = document.getElementsByClassName("selected");
// console.log(element3);



// const ele2 = document.getElementsByTagName("td")[10];
// console.log(ele2);
// const ele1 = ele2.getAttribute("data-date");
// console.log(ele1);

// alert(document.getElementById("Name"+this.getAttribute("id")).getAttribute(this.getAttribute("attribute")));



function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


let array = [];

var i =5;
 while(i>=0){
    array[i] = i;
    console.log(array[i]);
    i--;
 }


 console.log(array);