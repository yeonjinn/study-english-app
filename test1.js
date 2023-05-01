const listUrl =
  'https://gist.githubusercontent.com/niceaji/d34fcd2d593bef75c277fe1f4a0ee519/raw/6698dab524040e1f0d48d4f8282476a5e5b53640/sentences.json';
const translateUr = 'https://translate.google.com/?sl=en&tl=ko&text=';

let timeLimit = 3000; //문제당 제한시간 3초

const $pages=document.getElementById('pages');
const $en=document.getElementById('en');
const $ko=document.getElementById('ko');
const $next=document.querySelector("#next");
const $timer=document.querySelector('.timer');
const $trans=document.querySelector("#translate");
const $loading = document.querySelector('#loading');
const $box = document.querySelector('#box');

let page=1;
let index=page-1;
let totalPage=0;
let data=[];

//랜덤출력
function RandomData() {
    const shuffledData= data.sort(() => Math.random() - 0.5);

    function Pages(index){
      const Train=shuffledData[index];
      $ko.innerText=Train["ko"];
      $en.innerText='';

      setTimeout(() => {
        $en.innerText=Train["en"];
      }, timeLimit); 
      
      start();
    }
    Pages(index);

    $next.addEventListener('click',()=>{
      //clearInterval(intervalID);
      $timer.style.width="0%";
      index++;
      //$en.innerText='';
      if(index===totalPage){
        index=0;
        shuffledData.sort(()=>Math.random()-0.5);
      }
      Pages(index);
      $pages.innerHTML = `${index+1}/${totalPage}`;
    });
}


//3초 프로그래스바

let intervalID;

function start(){
  let load=0;
  intervalID=setInterval(()=>{
    load++;
    $timer.style.width=`${load}%`;
    if(load>=100){
      clearInterval(intervalID);
    }
  },3);
}


$trans.addEventListener("click", () => {
  const encodedText=encodeURIComponent($en.innerText);
  window.open(`${translateUr}${encodedText}`, "_blank");
});

//box노출
function showBox() {
  $box.style.display = 'block';
  $loading.style.display = 'none';
}
//로딩중 box숨기기
function hideBox() {
  $box.style.display = 'none';
  $loading.style.display = 'block';
}


function Load(){
  hideBox();
  fetch(listUrl)
  .then(response => response.json())
  .then(result => {
    data=result;
    totalPage=data.length;
    RandomData();
    showBox();
  });
}

Load()

  // const shuffledData= data.sort(() => Math.random() - 0.5);
  // //console.log(shuffledData);
  // const Train=shuffledData[page-1];
  // page = (page + 1) % data.length;

  // $next.addEventListener('click',()=>{
  //   page
  //   shuffledData[page++];
  // })



// function showData(){
//   const Train=shuffledData[page-1];
//   console.log(shuffledData);
//   console.log(data);
//   $en.innerText=Train["en"];
//   $ko.innerText=Train["ko"];
//   index = (index + 1) % data.length;
// }

// //next 버튼이벤트
// // $next.addEventListener('click',()=>{
// //   RandomData();
// //   page++;
// //   $pages.innerHTML=`${page}/${totalPage}`
// // })


// // 최초 로딩시 실행되는 함수
// function onInitialLoad() {
//   fetch(listUrl)
//     .then(response => response.json())
//     .then(data => {
//       //console.log(shuffle(data));
//       RandomData(data);
      
//         // 랜덤 데이터 출력 함수 호출
//     });
// }
// onInitialLoad();
//  // 최초 로딩시 함수 호출
