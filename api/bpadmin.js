const ticketData = require('./data.json')


const fs = require("fs");
const fabric = require('fabric').fabric;

const { createCanvas, Image } = require('canvas')
const path = require('path')

const fcanvas = new fabric.StaticCanvas(null, { width: 568, height: 222 });
const fontpaht = path.join(__dirname, '../font/OpenSans-ExtraBoldItalic.ttf')
const fontpahtreg = path.join(__dirname, '../font/OpenSans-Regular.ttf')
const fontpahfun = path.join(__dirname, '../font/ShadowsIntoLight-Regular.ttf')


fabric.Object.prototype.objectCaching = false;
fabric.nodeCanvas.registerFont(fontpaht, {
  family: 'OpenSans', weight: 'regular', style: 'italic'
});

fabric.nodeCanvas.registerFont(fontpahtreg, {
  family: 'OpenSansRegular', weight: 'regular', style: 'normal'
});

fabric.nodeCanvas.registerFont(fontpahfun, {
  family: 'ShadowsIntoLight', weight: 'regular', style: 'normal'
});




//let ticketdata;
let ticketNumbers = [];
let sortedNumbers = []
let squares = []
let dices = []
let dataUrls = [];


const canvas = createCanvas(89, 29)
const ctx = canvas.getContext('2d')

module.exports = async (req, res) => {

  let bpindex = req.body.value;
  var found = getCountryByCode(bpindex);

  const bplogo = `<svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 28"><path id="dice" d="M18.06,14.46l-1.7-9.58a.94.94,0,0,0-1.12-.8L5.2,5.83a1.49,1.49,0,0,0-.75.38S1.9,8.62,1.53,9A1.76,1.76,0,0,0,1,10.63L3,21.6a1,1,0,0,0,1.15.81c.42-.06,10.31-1.8,10.82-1.91a2.12,2.12,0,0,0,1.43-1.17L17.89,16A2.08,2.08,0,0,0,18.06,14.46ZM12.67,6.14a4.49,4.49,0,0,1-1.77.59c-.7.1-1.05,0-.77-.23a4.54,4.54,0,0,1,1.78-.59C12.61,5.81,13,5.91,12.67,6.14Zm-1.61-.42-2.23.69H7.22l2.22-.69Zm-6,.52,2.21-.38-.67.7-2.24.36Zm-.92,15-.43-2.43,2.44-.43.42,2.43ZM6.1,17.69l-1.58-1.9.84-2.31L7,15.37Zm2.29-3.93a1.41,1.41,0,0,1-1.63-1.14,1.41,1.41,0,1,1,1.63,1.14Zm3.16-1.68L9.64,9.81l2.91-.51Zm1-4.69-2.18,0,2.81-.84ZM16.07,6l.11,2.54-.69-1.72Zm-.77,2.2c.14-.21.36.17.48.87a3.25,3.25,0,0,1,0,1.65c-.14.22-.35-.17-.48-.86A3.29,3.29,0,0,1,15.3,8.16Zm0,2.85.59,1.64L16,15l-.6-1.62ZM16,18.69l-.41-2.32.44-.88.4,2.28Z" style="fill:#feb700"/><path id="blog" d="M46.55,5.49c.38-3.95-2.72-3.59-4.44-2a2.7,2.7,0,0,0,1.63,4.7A2.84,2.84,0,0,0,46.55,5.49Zm0,7.25c0-.29,0-1.83-.61-2.41-1.38-1.28-3.86.44-3.72,2.69,0,.35.33,2.34.42,3l.55,3.18a2.54,2.54,0,0,0,.5,1.31c.92,1,2.85.66,3-.83,0-.23,0-1.27,0-3.59S46.55,12.74,46.55,12.74ZM28.34,16.6c.41,1.93,1.2,4.91,2.45,5.55,1.56.79,6.87-.19,8.53-2.81a6.28,6.28,0,0,0,1-3.57,6.76,6.76,0,0,0-2.58-5.26c2.12-4.29-1.14-8.09-4.72-7-3.95,1.23-5.38,2.75-5.38,5.88A36.82,36.82,0,0,0,28.34,16.6ZM32.83,6.32c.88-.36,1.83.42,1.7,1.68-.16,1.54-2.92,4.12-3.22,1.43C31.05,7.18,31.67,6.8,32.83,6.32Zm-.3,11.52c-.63-1.5-1.64-4.18,1.11-4.47a2.54,2.54,0,0,1,2.65,2.48C36.4,17.92,33.24,19.52,32.53,17.84Zm27-6.23c-.81-5.29-7-6.65-9.82-3.19-1,1.27-.53,4.82-.41,6.56s.35,3.83.35,3.83l.07.35c.4,2,3.22.88,3.83-.41a13.05,13.05,0,0,0,.06-3.59c0-1-.07-1.91-.07-1.91-.19-2.86,2.29-2.55,3-1.5A5.91,5.91,0,0,1,57,14.7c0,.94-.1,2.34-.1,2.34v.34c0,1.32,1.28.74,1.81.08a4.09,4.09,0,0,0,.75-1.66A12.24,12.24,0,0,0,59.51,11.61Zm20.78-3c-5.43,2.93-5,11.7.12,12.88,3.36.78,6.85-2.28,7.49-6.54C88.64,10,85.73,5.69,80.29,8.61Zm4.6,7.22c-.39,2.41-2.83,3.61-4.08,2-1.44-1.85.18-5.29,2.38-5C84.37,12.94,85.13,14.28,84.89,15.83ZM74.67,13.15C75,6.61,67.94,4.92,64.12,8.37c-4.33,3.92-2.5,10.91,3,11.32a7.31,7.31,0,0,0,2.46-.31c-.6,2.24-2.78,2.26-5.79,2.17C61,21.46,60.29,24.59,62,25c6.64,1.75,10.26-1.2,11.68-6.49A19.55,19.55,0,0,0,74.67,13.15Zm-3.76-.44c-.4,2.58-3.08,3.55-4.28,1.58s.31-5,2.4-4.73A2.58,2.58,0,0,1,70.91,12.71Z" style="fill:#fff"/><g id="registred"><path d="M92.44,8.81,92,8.13h-.21v.68h-.38V7h.65c.42,0,.68.15.68.56a.51.51,0,0,1-.36.5h0l.53.75ZM92,7.26h-.23v.6H92c.22,0,.33-.07.33-.3S92.24,7.26,92,7.26Z" style="fill:#fff"/><path d="M90.1,8a2,2,0,1,0,2-1.95A2,2,0,0,0,90.1,8Zm.38,0a1.57,1.57,0,1,1,1.57,1.57A1.57,1.57,0,0,1,90.48,8Z" style="fill:#fff"/></g></svg>`;


  function getCountryByCode(index) {
    return ticketData.filter(

      function (ticketData) {

        if (ticketData.index == index) {
          return ticketData
        }
      }

    );
  }

  var base = new fabric.Rect({
    name: base,
    hasControls: false,
    selectable: false,
    left: 0,
    top: 0,
    fill: '#a0d323',
    width: 590,
    height: 222
  });

  fcanvas.add(base);
  
  var shadow = {
    color: '#000000',
    blur: 4,
    offsetX: 1,
    offsetY: 1,
    opacity: 1
  }

  fabric.loadSVGFromString(bplogo, function (objects, options) {
    var obj = fabric.util.groupSVGElements(objects, options);
    obj.setShadow(shadow);
    fcanvas.add(obj).centerObject(obj).renderAll();
    obj.setCoords();
    obj.set({
      top: 192,
      left: 295,
      originX: 'left',
      originY: 'top'
    })
  });


  var idtext = new fabric.Text('ID: ' + found[0].index.toString(), {
    fontFamily: 'OpenSansRegular',
    textAlign: "left",
    selectable: false,
    selectable: false,
    left: 5,
    top: 200,
    fontSize: 15,
    fill: '#000000',
    originX: 'left',
    originY: 'top',
    // backgroundColor : 'rgba(0,200,0,0.5)',
    lineHeight: -5

  });
  idtext.width = 600;
  idtext.height = 50;
  fcanvas.add(idtext);

  var funtxt = new fabric.Text('                     et nummer hyggeligere', {
    fontFamily: 'ShadowsIntoLight',
    textAlign: "left",
    selectable: false,
    selectable: false,
    left: 204,
    top: 193,
    fontSize: 19,
    fill: '#ffffff',
    originX: 'left',
    originY: 'top',
    // backgroundColor : 'rgba(0,200,0,0.5)',
    lineHeight: -5

  });
  funtxt.width = 600;
  funtxt.height = 50;
  fcanvas.add(funtxt);


  for (var i = 0; i < found[0].numbers.length; i++) {

    var X = (i % 9) * 62;
    var Y = Math.floor(i / 9) * 62;


    var rect = new fabric.Rect({
      name: i,
      hasControls: false,
      selectable: false,
      left: X,
      top: Y,
      strokeWidth: 1,
      stroke: '#000000',
      fill: '#e7f5c5',
      width: 62,
      height: 62,
      originX: 'left',
      originY: 'top',
    });

    squares.push(rect);

  }

  //add the to canvas
  var squareGroup;
  squareGroup = new fabric.Group(squares, {
    left: 5,
    top: 5,
    hasControls: false,
    selectable: false,
  });

  fcanvas.add(squareGroup)

    //create the numbers
    function craeteTicketNumbers() {

      for (var i = 0; i < found[0].numbers.length; i++) {
  
        var thex = Math.round(squares[i].left);
        var they = Math.round(squares[i].top);
        var thebnum = found[0].numbers[i].toString()
  
  
        var text = new fabric.Text(thebnum, {
          fontFamily: 'OpenSans',
          textAlign: "center",
          selectable: false,
          selectable: false,
          left: thex,
          top: they,
          fontSize: 40,
          fill: '#4F4F4F',
          originX: 'left',
          originY: 'top',
          // backgroundColor : 'rgba(0,200,0,0.5)',
          lineHeight: -5
  
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
      selectable: false,
    });
  
    fcanvas.add(TicketNumberGroup)
    fcanvas.renderAll();



    let imagedata = fcanvas.toDataURL({ format: 'png' })
    let strImage = imagedata.split(',')[1];
  
    dataUrls.push(strImage);
  
    var objects = fcanvas.getObjects();
    for (var i = 0; i < objects.length; i++) {
  
      fcanvas.remove(objects[i]);
    } fcanvas.renderAll();
  
    squares = [];
    dices = [];
    ticketNumbers = [];
  
  
  
    // console.log('callback now')
  //
    res.status(200).json({ data: dataUrls })
    dataUrls = []



  
  //res.status(200).json({ data: found[0] })//.numbers
}

/*


 





*/