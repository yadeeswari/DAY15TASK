let optdiv = document.createElement('div');
optdiv.setAttribute('class', 'tableData')


let curpage = 0;
let recordsperpage = 10;
let maxpages = Math.ceil(100 / recordsperpage);

function prevPage() {
    if (curpage > 1) {
        changePage(curpage - 1)
    }
}

function nextPage() {
    if (curpage < maxpages) {
        changePage(curpage + 1)
    }
}

function changePage(num) {
    if (num < 1) num = 1;
    if (num > maxpages) num = maxpages;

    let startPoint = (num - 1) * maxpages;
    let endPoint = (num) * maxpages;

    curpage = num;
    CreateDataTable(startPoint, endPoint);

    if (num === 1) {
        document.getElementById('prev').style.visibility = "hidden";
    } else {
        document.getElementById('prev').style.visibility = "visible";
    }

    if (num === max_pages) {
        document.getElementById('next').style.visibility = "hidden";
    } else {
        document.getElementById('next').style.visibility = "visible";
    }
}


function CreateDataTable(start, end) {
    optdiv.innerHTML = " ";
    let request = new XMLHttpRequest();
    let url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";

    request.open('GET', url, true);
    request.send();

    request.onload = function() {
        let data = JSON.parse(this.response);

        let table = document.createElement('table');
        table.setAttribute('class', 'dataTable');
        table.id = "DataTable";

        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        let tr1 = document.createElement('tr');
        let th1 = document.createElement('th');
        th1.innerHTML = "Id";

        let th2 = document.createElement('th');
        th2.innerHTML = "Name";

        let th3 = document.createElement('th');
        th3.innerHTML = "E-Mail";

        optdiv.append(table);
        table.append(thead, tbody);
        thead.append(tr1);
        tr1.append(th1, th2, th3);

        for (let i = start; i < end; i++) {
            let tr2 = document.createElement('tr');

            let td1 = document.createElement('td');
            td1.innerHTML = data[i]["id"];
            let td2 = document.createElement('td');
            td2.innerHTML = data[i]["name"];
            let td3 = document.createElement('td');
            td3.innerHTML = data[i]["email"];

            tr2.append(td1, td2, td3);
            tbody.append(tr2);
        }

        console.log(cur_page);
    }



}

//------------------pagination

var d = document.createElement('div');
d.setAttribute('class', 'anchorlist');

var prev = document.createElement('a');
prev.href = `javascript:prev_Page()`;
prev.id = "prev";
prev.innerHTML = "&laquo;";

var next = document.createElement('a');
next.href = `javascript:next_Page()`;
next.id = "next";
next.innerHTML = "&raquo;";

var arr = createAnchorList();


function createAnchorList() {
    var ar = [];
    for (let i = 1; i <= 10; i++) {

        var a = document.createElement('a');
        a.href = `javascript:changePage(${i})`;
        a.innerHTML = i;
        if (i === 1) {
            a.setAttribute('class', 'active');
        }
        ar.push(a);
    }
    return ar;
}

var heading = document.createElement('div');
heading.innerHTML = "PAGINATION"
heading.setAttribute('class', 'heading');


document.body.append(heading, optdiv, d);
d.append(prev, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], next);

changePage(1);