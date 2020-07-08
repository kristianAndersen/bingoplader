const fs = require("fs"); 
const   fabric = require('fabric').fabric;
const fcanvas = new fabric.StaticCanvas(null, {width:568,height:222});
const ticketData =require('./data.json')
const path = require('path')
const fontpaht=path.join(__dirname,'../font/OpenSans-ExtraBoldItalic.ttf')
const fontpahtreg=path.join(__dirname,'../font/OpenSans-Regular.ttf')

fabric.Object.prototype.objectCaching = false;
fabric.nodeCanvas.registerFont(fontpaht, {
    family: 'OpenSans', weight: 'regular', style: 'italic'
  });

  fabric.nodeCanvas.registerFont(fontpahtreg, {
    family: 'OpenSansRegular', weight: 'regular', style: 'normal'
  });

//let ticketdata;
let ticketNumbers=[];
let sortedNumbers=[]
let squares=[]
let dataUrls=[];

module.exports = async (req, res) => {
    
    let quantity =req.body.value;

    //shuffle / randomize 
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    
    //get x random tickets from json
    function getMeRandomTickets(sourceArray, neededElements) {
        var result = [];
        for (var i = 0; i < neededElements; i++) {
            var index = Math.floor(Math.random() * sourceArray.length);
            result.push(sourceArray[index]);
            sourceArray.splice(index, 1);
        }

        return result;

    }

    let tickets = getMeRandomTickets(ticketData, quantity)
    
    for (let j = 0; j < tickets.length; j++) {

        
    
        //create base for the bingo ticket
            var base = new fabric.Rect({
                name:base,
                hasControls: false,
                selectable : false,
                left: 0,
                top: 0,
                fill: '#a0d323',
                width: 590,
                height: 222
            });
          //  console.log("base don") 
            fcanvas.add(base);
    
            //id number
            
            var idtext = new fabric.Text(tickets[j].index.toString(), {
                fontFamily:'OpenSansRegular',
                textAlign: "left",
                 selectable : false,
                 selectable : false,
                left: 5,
                top: 200,
                fontSize: 15,
                fill: '#000000',
                originX: 'left',
                originY: 'top',
               // backgroundColor : 'rgba(0,200,0,0.5)',
                lineHeight:-5
                
            });
            idtext.width = 600;
            idtext.height = 50;
            fcanvas.add(idtext);
    
    
    
            function craeteSquares(){
    
                for(i=0; i<27; i++){
                    
                    
                    var X = (i % 9) * 62;
                    var Y = Math.floor(i / 9) * 62;
                
                   // console.log('row:'+i+' x:'+X+' y:'+Y)
                   
            
                    var rect = new fabric.Rect({
                        name: i,
                        hasControls: false,
                        selectable : false,
                        left: X,
                        top: Y,
                        strokeWidth: 1, 
                        stroke:'#000000',
                        fill: '#e7f5c5',
                        width: 62,
                        height: 62,
                        originX: 'left',
                        originY: 'top',
                    });
            
                    squares.push( rect );
              
               }
            }
            craeteSquares()
          
            
            //add the to canvas
            var squareGroup;
            squareGroup = new fabric.Group(squares, {
              left: 5,
              top: 5,
              hasControls: false,
              selectable : false,
            });
            
            fcanvas.add( squareGroup )
    
    //create the numbers
    function craeteTicketNumbers(){
    
        for(i=0; i<tickets[j].numbers.length; i++){
            //
           
               
               
            var thex=Math.round(squares[i].left);
               if(i<5){
                    
                       
                }
                if(i<10){
                    
                   
                }
                if(i<15){
                    
                    /*var pos = getMeRandomTickets([19,20,21,22,23,24,25,26,27], 5)
                    pos.sort();
                    var thex=Math.round(squares[pos[i]].left);
                    */
                }
                var thex=Math.round(squares[i].left);
                var they=Math.round(squares[i].top);
                 var thebnum=tickets[j].numbers[i].toString()
          
         // console.log(tickets[j].numbers[i])
            

          //
//
            var text = new fabric.Text(thebnum, {
                fontFamily:'OpenSans',
                textAlign: "center",
                 selectable : false,
                 selectable : false,
                left: thex,
                top: they,
                fontSize: 40,
                fill: '#000000',
                originX: 'left',
                originY: 'top',
               // backgroundColor : 'rgba(0,200,0,0.5)',
                lineHeight:-5
                
            });
            text.width = 62;
            text.height = 62;
          
            ticketNumbers.push(text) 
        
      
       }
    }
    
    craeteTicketNumbers()
    
    var TicketNumberGroup;
    TicketNumberGroup = new fabric.Group(ticketNumbers, {
      left: 5,
      top: 20,
      hasControls: false,
      selectable : false,
    });
    
    fcanvas.add( TicketNumberGroup )
    fcanvas.renderAll(); 
    
        let imagedata =fcanvas.toDataURL({ format: 'png' })
        let strImage = imagedata.split(',')[1];
       
         dataUrls.push( strImage );
         
         var objects = fcanvas.getObjects();
         for(var i = 0; i < objects.length; i++){
               
           fcanvas.remove(objects[i]);
         }fcanvas.renderAll();
    
        squares=[];
        ticketNumbers=[];
    }
    
    
    if(dataUrls.length==quantity){
       // console.log('callback now')
       
        res.status(200).json({data:dataUrls})
        dataUrls=[]
        
    }





}
