

  function showtime() {
    
    var mv= document.querySelector(".minut-vier");
    var tv=  document.querySelector(".time-viser");
    var sv =  document.querySelector(".sekund-viser"); 
    var time  =  document.querySelector(".time"); 

    mv.style.transformOrigin="25px 25px";
    tv.style.transformOrigin="25px 24px";
    sv.style.transformOrigin="25px 25px";
   
    
    setInterval( function() {
      var seconds = new Date().getSeconds();
      var sdegree = seconds * 6;
      var srotate = "rotate(" + sdegree + "deg)";
      sv.style.transform=srotate;  
    }, 1000 );
    

    setInterval( function() {
      var hours = new Date().getHours();
      var mins = new Date().getMinutes();
      var hdegree = hours * 30 + (mins / 2);
      var hrotate = "rotate(" + hdegree + "deg)";
    
      tv.style.transform=hrotate;  
      time.setAttribute("title", hours+':'+Math.floor(mins));
    }, 1000 );

    setInterval( function() {
      var mins = new Date().getMinutes();
      var mdegree = mins * 6;
      var mrotate = "rotate(" + mdegree + "deg)";

      mv.style.transform=mrotate;

    }, 1000 );

    gettickets(4)
  }


      function gotime(){
        var nbp= document.querySelectorAll(".nbp"),result;

      for (var i = 0; i < nbp.length; i++) {
       
        result = nbp[i];
        result.addEventListener('click', function() {
        let numprint=this.textContent;;

          if(isNaN(numprint)){
            window.print()
          }else{
            gettickets(numprint)
          }

      });
    }


      }
var terning=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><g id="Isolation_Mode" data-name="Isolation Mode"><path d="M46.81,28.14,42.46,3.62a2.41,2.41,0,0,0-2.88-2L13.9,6.07A3.66,3.66,0,0,0,12,7s-6.51,6.17-7.47,7.14a4.59,4.59,0,0,0-1.27,4.15l5,28.09a2.54,2.54,0,0,0,3,2.06c1.07-.16,26.38-4.61,27.7-4.89a5.43,5.43,0,0,0,3.65-3l3.9-8.42C47.09,30.59,47.12,30.22,46.81,28.14Z" style="fill:#feb700"/><path d="M33,6.85a11.61,11.61,0,0,1-4.54,1.51c-1.8.26-2.67,0-2-.59a11.61,11.61,0,0,1,4.54-1.51C32.86,6,33.74,6.27,33,6.85Z" style="fill:#a0d323"/><polygon points="28.89 5.77 23.17 7.53 19.06 7.51 24.74 5.75 28.89 5.77" style="fill:#a0d323"/><polygon points="13.57 7.12 19.22 6.12 17.5 7.92 11.77 8.85 13.57 7.12" style="fill:#a0d323"/><polygon points="11.21 45.54 10.12 39.32 16.34 38.22 17.44 44.45 11.21 45.54" style="fill:#a0d323"/><polygon points="16.21 36.4 12.15 31.56 14.29 25.63 18.36 30.47 16.21 36.4" style="fill:#a0d323"/><path d="M22.05,26.35A3.6,3.6,0,1,1,25,22.18,3.6,3.6,0,0,1,22.05,26.35Z" style="fill:#a0d323"/><polygon points="30.13 22.06 25.25 16.25 32.72 14.93 30.13 22.06" style="fill:#a0d323"/><polygon points="32.8 10.04 27.24 10.15 34.41 7.99 32.8 10.04" style="fill:#a0d323"/><polygon points="41.7 6.4 42 12.88 40.23 8.48 41.7 6.4" style="fill:#a0d323"/><path d="M39.74,12c.36-.56.91.43,1.22,2.21s.28,3.66-.09,4.22S40,18,39.65,16.26,39.38,12.59,39.74,12Z" style="fill:#a0d323"/><polygon points="39.71 19.31 41.23 23.51 41.53 29.63 39.99 25.47 39.71 19.31" style="fill:#a0d323"/><polygon points="41.6 38.97 40.55 33.03 41.68 30.77 42.71 36.62 41.6 38.97" style="fill:#a0d323"/></g></svg>`

function gettickets(numprint){
  
  imgwrap= document.querySelector('.imgwrap');

  var number = {
    value: numprint
    }

   var xhr = new window.XMLHttpRequest()
   xhr.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
          
           imgwrap.innerHTML=" ";
           
           var result = xhr.responseText;

           var imgJSON = JSON.parse(result);
           
           
           for(i=0; i<imgJSON.data.length; i++){
             
           var datatype='data:image/png;base64,';
           let imagedate=`<img src="${datatype+imgJSON.data[i]}" >`
         
           imgwrap.innerHTML += imagedate;
           }
           
       }else{
        imgwrap.innerHTML='<div class="loader">'+terning+'</div>'
       }
     
     
   };
       xhr.open('POST', '/api/tickets', true)
       xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
       xhr.send(JSON.stringify(number))
}







      
      if (document.readyState === 'loading') {  
        document.addEventListener('DOMContentLoaded', showtime);
      } else { 
      showtime();
      gotime();
      }