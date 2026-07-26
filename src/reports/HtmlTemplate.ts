import { ReportStatistics } from "./ReportStatistics";

export class HtmlTemplate {

    public static render(

        statistics: ReportStatistics,

        generatedAt: string,

        rows: string

    ): string {

        return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0">

<title>SmokeGuard Report</title>

<link
href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>

*{

margin:0;

padding:0;

box-sizing:border-box;

}

body{

font-family:'Inter',sans-serif;

background:#eef2f7;

color:#111827;

padding:30px;

}

.container{

max-width:1800px;

margin:auto;

}

.header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:35px;

}

.title h1{

font-size:38px;

font-weight:700;

margin-bottom:8px;

}

.title p{

color:#6b7280;

font-size:15px;

}

.health{

width:170px;

height:170px;

border-radius:50%;

background:linear-gradient(

135deg,

#16a34a,

#22c55e

);

display:flex;

justify-content:center;

align-items:center;

flex-direction:column;

color:white;

box-shadow:

0 10px 30px

rgba(22,163,74,.35);

}

.health h2{

font-size:46px;

font-weight:700;

}

.health span{

font-size:15px;

opacity:.95;

}

.cards{

display:grid;

grid-template-columns:

repeat(

auto-fit,

minmax(

220px,

1fr

)

);

gap:20px;

margin-bottom:35px;

}
.card{

background:#ffffff;

border-radius:14px;

padding:24px;

box-shadow:

0 4px 15px

rgba(0,0,0,.08);

transition:.25s;

}

.card:hover{

transform:translateY(-4px);

}

.card-title{

font-size:14px;

font-weight:500;

color:#6b7280;

margin-bottom:12px;

}

.card-value{

font-size:34px;

font-weight:700;

}

.green{

color:#16a34a;

}

.red{

color:#dc2626;

}

.blue{

color:#2563eb;

}

.orange{

color:#ea580c;

}

.purple{

color:#7c3aed;

}

.summary{

display:grid;

grid-template-columns:

2fr 1fr;

gap:25px;

margin-bottom:35px;

}

.panel{

background:#ffffff;

border-radius:14px;

padding:24px;

box-shadow:

0 4px 15px

rgba(0,0,0,.08);

}

.panel h2{

font-size:20px;

margin-bottom:20px;

}

.info-grid{

display:grid;

grid-template-columns:

repeat(

2,

1fr

);

gap:16px;

}

.info{

padding:14px;

background:#f9fafb;

border-radius:10px;

border-left:4px solid #2563eb;

}

.info label{

display:block;

font-size:13px;

color:#6b7280;

margin-bottom:6px;

}

.info strong{

font-size:18px;

font-weight:600;

display:block;

}

.chart-box{

height:340px;

position:relative;

}
table{

width:100%;

border-collapse:collapse;

background:#ffffff;

border-radius:14px;

overflow:hidden;

box-shadow:

0 4px 15px

rgba(0,0,0,.08);

}

thead{

background:#111827;

color:#ffffff;

}

th{

padding:16px;

font-size:14px;

font-weight:600;

text-align:left;

white-space:nowrap;

}

td{

padding:14px;

border-bottom:1px solid #eceff3;

vertical-align:top;

font-size:14px;

}

tbody tr{

transition:.2s;

}

tbody tr:hover{

background:#f8fafc;

}

tr.slow{

background:#fff7ed;

}

.badge{

display:inline-block;

padding:7px 14px;

border-radius:20px;

font-size:12px;

font-weight:700;

letter-spacing:.3px;

}

.pass{

background:#dcfce7;

color:#15803d;

}

.fail{

background:#fee2e2;

color:#b91c1c;

}

img{

width:140px;

border-radius:8px;

border:1px solid #d1d5db;

transition:.25s;

}

img:hover{

transform:scale(1.08);

}

.search-box{

margin-bottom:25px;

display:flex;

justify-content:flex-end;

}

.search-box input{

width:320px;

padding:12px 16px;

border:1px solid #d1d5db;

border-radius:10px;

font-size:14px;

outline:none;

transition:.2s;

}

.search-box input:focus{

border-color:#2563eb;

box-shadow:

0 0 0 3px

rgba(37,99,235,.15);

}

.footer{

margin-top:35px;

text-align:center;

color:#6b7280;

font-size:13px;

}
@media(max-width:1400px){

.summary{

grid-template-columns:1fr;

}

}

@media(max-width:992px){

.header{

flex-direction:column;

align-items:flex-start;

gap:25px;

}

.health{

width:140px;

height:140px;

}

.health h2{

font-size:36px;

}

.cards{

grid-template-columns:

repeat(

2,

1fr

);

}

.info-grid{

grid-template-columns:1fr;

}

.search-box{

justify-content:stretch;

}

.search-box input{

width:100%;

}

table{

display:block;

overflow-x:auto;

white-space:nowrap;

}

}

@media(max-width:640px){

body{

padding:15px;

}

.cards{

grid-template-columns:1fr;

}

.title h1{

font-size:28px;

}

.panel{

padding:18px;

}

.card{

padding:18px;

}

}

</style>

</head>

<body>

<div class="container">

<div class="header">

<div class="title">

<h1>

🚀 SmokeGuard QA Report

</h1>

<p>

Generated on

<strong>

${generatedAt}

</strong>

</p>

</div>

<div class="health">

<h2>

${statistics.passRate}%

</h2>

<span>

Health Score

</span>

</div>

</div>

<div class="cards">

<div class="card">

<div class="card-title">

Total Pages

</div>

<div class="card-value blue">

${statistics.total}

</div>

</div>

<div class="card">

<div class="card-title">

Passed

</div>

<div class="card-value green">

${statistics.passed}

</div>

</div>

<div class="card">

<div class="card-title">

Failed

</div>

<div class="card-value red">

${statistics.failed}

</div>

</div>

<div class="card">

<div class="card-title">

Average Load Time

</div>

<div class="card-value orange">

${statistics.averageExecutionTime} ms

</div>

</div>

<div class="card">

<div class="card-title">

Total Execution Time

</div>

<div class="card-value purple">

${statistics.totalExecutionTime} ms

</div>

</div>

</div>
<div class="summary">

<div class="panel">

<h2>

📊 Executive Summary

</h2>

<div class="info-grid">

<div class="info">

<label>

Pass Rate

</label>

<strong>

${statistics.passRate}%

</strong>

</div>

<div class="info">

<label>

Fastest Page

</label>

<strong>

${statistics.fastestPage}

</strong>

</div>

<div class="info">

<label>

Slowest Page

</label>

<strong>

${statistics.slowestPage}

</strong>

</div>

<div class="info">

<label>

Slow Pages

</label>

<strong>

${statistics.slowPages}

</strong>

</div>

<div class="info">

<label>

Console Errors

</label>

<strong>

${statistics.totalConsoleErrors}

</strong>

</div>

<div class="info">

<label>

Network Errors

</label>

<strong>

${statistics.totalNetworkErrors}

</strong>

</div>

</div>

</div>

<div class="panel">

<h2>

⚡ Component Summary

</h2>

<div class="info-grid">

<div class="info">

<label>

Buttons

</label>

<strong>

${statistics.totalButtons}

</strong>

</div>

<div class="info">

<label>

Inputs

</label>

<strong>

${statistics.totalInputs}

</strong>

</div>

<div class="info">

<label>

Tables

</label>

<strong>

${statistics.totalTables}

</strong>

</div>

<div class="info">

<label>

Dropdowns

</label>

<strong>

${statistics.totalDropdowns}

</strong>

</div>

<div class="info">

<label>

Checkboxes

</label>

<strong>

${statistics.totalCheckboxes}

</strong>

</div>

<div class="info">

<label>

Radios

</label>

<strong>

${statistics.totalRadios}

</strong>

</div>

<div class="info">

<label>

Textareas

</label>

<strong>

${statistics.totalTextareas}

</strong>

</div>

<div class="info">

<label>

Images

</label>

<strong>

${statistics.totalImages}

</strong>

</div>

<div class="info">

<label>

File Uploads

</label>

<strong>

${statistics.totalFileUploads}

</strong>

</div>

<div class="info">

<label>

Search Boxes

</label>

<strong>

${statistics.totalSearchBoxes}

</strong>

</div>

<div class="info">

<label>

Paginations

</label>

<strong>

${statistics.totalPaginations}

</strong>

</div>

<div class="info">

<label>

Filters

</label>

<strong>

${statistics.totalFilters}

</strong>

</div>

</div>

</div>

</div>

<div class="panel" style="margin-bottom:30px;">

<h2>

📈 SmokeGuard Overview

</h2>

<div class="chart-box">

<canvas id="summaryChart"></canvas>

</div>

</div>

<div class="search-box">

<input

id="searchInput"

type="text"

placeholder="Search pages...">

</div>

<table id="resultTable">

<thead>

<tr>

<th>

Page

</th>

<th>

Time

</th>

<th>

Loaded

</th>

<th>

Ready

</th>

<th>

Buttons

</th>

<th>

Inputs

</th>

<th>

Tables

</th>

<th>

Search

</th>

<th>

Pagination

</th>

<th>

Filter

</th>

<th>

Console

</th>

<th>

Network

</th>

<th>

Validations

</th>

<th>

Screenshot

</th>

<th>

Status

</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>
<script>

const table = document.getElementById("resultTable");

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener(

"keyup",

function () {

const value =
this.value.toLowerCase();

const rows =
table.querySelectorAll("tbody tr");

rows.forEach(row => {

const text =
row.innerText.toLowerCase();

row.style.display =
text.includes(value)
? ""
: "none";

});

}

);

const ctx =

document
.getElementById("summaryChart")
.getContext("2d");

new Chart(

ctx,

{

type:"doughnut",

data:{

labels:[

"Passed",

"Failed"

],

datasets:[{

data:[

${statistics.passed},

${statistics.failed}

],

backgroundColor:[

"#16a34a",

"#dc2626"

],

borderWidth:0

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

position:"bottom",

labels:{

padding:20,

font:{

size:14,

family:"Inter"

}

}

},

tooltip:{

enabled:true

}

},

animation:{

animateRotate:true,

animateScale:true

}

}

}

);

</script>

<div class="footer">

<hr
style="margin:35px 0;border:none;border-top:1px solid #e5e7eb;">

<p>

Generated by

<strong>

SmokeGuard AI Smoke Testing Framework

</strong>

</p>

<p
style="margin-top:8px;">

© ${new Date().getFullYear()}

SmokeGuard

•

Automated Smoke Test Report

</p>

</div>

</div>

</body>

</html>

`;

    }

}
