import { Component, ViewChildren, ElementRef, QueryList, AfterViewInit, NgZone, OnDestroy, OnInit } from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { Subscription } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Network } = Plugins;



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {

  longPressActive=  false;
 reload = false;
people = [
    {
      name: 'Bananas are curved because they grow towards the sun.',
      image: 'bannana.png',
      description: 'Bananas go through a process called “negative geotropism.” Instead of growing towards the ground, they start growing towards the sun.',
      power: 0,
      source: 'thefacttsite.com'
    },
    {
      name: 'Polar bears could eat as many as 86 penguins in a single meal.',
      image: 'polar.png',
      description: 'If they didn’t live at opposite ends of the earth! Polar bears live in the arctic, whereas  penguins usually live in Antarctica.',
      power: 0,
      source: 'thefacttsite.com'
    },
    {
      name: 'Bananas are curved because they grow towards the sun.',
      image: 'bannana.png',
      description: 'Bananas go through a process called “negative geotropism.” Instead of growing towards the ground, they start growing towards the sun.',
      power: 0,
      source: 'thefacttsite.com'
    },
    {
      name: 'Polar bears could eat as many as 86 penguins in a single meal.',
      image: 'polar.png',
      description: 'If they didn’t live at opposite ends of the earth! Polar bears live in the arctic, whereas  penguins usually live in Antarctica.',
      power: 0,
      source: 'thefacttsite.com'
    },
  ];

  
  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>;

  constructor(
    private gestureCtrl: GestureController,
    private zone: NgZone,
    private platform: Platform,
    private commonService: CommonService,

  ) {}

  ngOnInit(): void {

  }
  

  ngAfterViewInit() {    
   
      
    
    const cardArray = this.cards.toArray();
      this.useTinderSwipe(cardArray);

    // this.useLongPress(cardArray);
    
  }


  useLongPress(cardArray) {
    console.log("asdasd");

    for(let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];
      //console.log('card : ', card);
      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'long-press',
        onStart: ev=> {
          this.longPressActive = true;
          this.increasePower(i);
          console.log("dasdasd");

        },
        onEnd: ev => {
          this.longPressActive = false;
        }
      }, true);
      // The `true` above ensures that callbacks run inside NgZone.

      gesture.enable(true);
    }

  }

  

  increasePower(i) {
    console.log('this.power', i)
    setTimeout( ()=> {
      if(this.longPressActive) {
        this.zone.run(() => {
          this.people[i].power++;
          this.increasePower(i);
        });
      }
    }, 200);

   

  }

  useTinderSwipe(cardArray) {
    console.log(cardArray);
    for(let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];
      card.nativeElement.style.transform = "";
      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'swipte',
        onStart: ev=> {
         console.log(ev);

        },
        onMove: ev => {
          console.log(ev);
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX/10}deg)`;
         // this.setCardColor(ev.deltaX, card.nativeElement)
        },
        onEnd: ev => {
          //this.longPressActive = false;
          card.nativeElement.style.transition = "0.3s ease-out";

          if(ev.deltaX > 150){ 

            card.nativeElement.style.transform = `translateX(${this.platform.width() * 2}px) 
              rotate(${ev.deltaX/10}deg)`;

          }else if(ev.deltaX < -150){
            card.nativeElement.style.transform = `translateX(-${this.platform.width() * 2}px) 
              rotate(${ev.deltaX/10}deg)`;


          }else {
            card.nativeElement.style.transform = "";
          }

          if(i == 0 ){

          this.addCar();

            console.log(this.cards);

            
           
          }
          
        }
      }, true);
      // The `true` above ensures that callbacks run inside NgZone.

      gesture.enable(true);
    }

  }

  setCardColor(x, element) {
    let color= '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
   const hexCode = this.decimalToHex(min, 2)

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    }else {
      color = "#" + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;

  }

  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

addCar() {

 let cardd:any;




 const cardArray = this.cards.toArray();
  this.useTinderSwipe(cardArray);
}

ngOnDestroy() {
  console.log('Items destroyed');
}

}
