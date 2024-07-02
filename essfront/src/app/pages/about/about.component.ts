import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FooterComponent,CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  images = [
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FR%20(8).jpeg?alt=media&token=4259a95a-3411-416c-a742-481f0efb4b36',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2Frsz_shutterstock_610533473.jpg?alt=media&token=ebc173e6-c464-4c27-9b69-464bde0bfc3a',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(2).jpeg?alt=media&token=1f927b89-6ed2-44b3-8760-3678e97edf6c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(2).jpeg?alt=media&token=1f927b89-6ed2-44b3-8760-3678e97edf6c',

    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP.jpeg?alt=media&token=b8608d8c-2aaa-4a6d-b6c7-f1ad0cbdca9a',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(2).jpeg?alt=media&token=1f927b89-6ed2-44b3-8760-3678e97edf6c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FR%20(7).jpeg?alt=media&token=839d6cba-fd9e-407a-b4da-25bc1e2d545e',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(3).jpeg?alt=media&token=781ac131-b7e4-4608-9642-6436755d8ad5',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(2).jpeg?alt=media&token=1f927b89-6ed2-44b3-8760-3678e97edf6c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(2).jpeg?alt=media&token=1f927b89-6ed2-44b3-8760-3678e97edf6c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(1).jpeg?alt=media&token=094ea90e-8ec9-465d-9b3d-34473b29247c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FR.png?alt=media&token=8c1705b0-24e6-4ca5-a636-67fdc0579f9e',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(2).jpeg?alt=media&token=1f927b89-6ed2-44b3-8760-3678e97edf6c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2Fgettyimages-1418544886-1024x1024.jpg?alt=media&token=91da41e1-4c70-4c8a-8027-bf831cd032f1',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(2).jpeg?alt=media&token=1f927b89-6ed2-44b3-8760-3678e97edf6c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FR%20(6).jpeg?alt=media&token=3c63e11c-84fe-40e8-9039-6a81bf15e206',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FR%20(3).jpeg?alt=media&token=44179343-9a47-4a35-af57-39a16b908fac',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(2).jpeg?alt=media&token=1f927b89-6ed2-44b3-8760-3678e97edf6c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FR%20(4).jpeg?alt=media&token=2176554e-aee5-4ec7-8fd3-422ba71e0b27',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FOIP%20(2).jpeg?alt=media&token=1f927b89-6ed2-44b3-8760-3678e97edf6c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2FR%20(2).jpeg?alt=media&token=f8f29e41-527a-421b-adab-eeef44aaa047',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-bcf6e.appspot.com/o/aboutus%2Fsolidarity.jpg?alt=media&token=7e72f813-68b4-4b86-b6f1-59b25097d196'
  ];

  ngAfterViewInit() {
    this.initializeGallery();
  }

  initializeGallery() {
    const gallery = document.querySelector('#gallery');
    if (!gallery) return;

    const getVal = (elem: Element, style: string): number => parseInt(window.getComputedStyle(elem).getPropertyValue(style));
    const getHeight = (item: Element): number => item.querySelector('.content')!.getBoundingClientRect().height;

    const resizeAll = () => {
      const altura = getVal(gallery, 'grid-auto-rows');
      const gap = getVal(gallery, 'grid-row-gap');
      gallery.querySelectorAll('.gallery-item').forEach((item: Element) => {
        const el = item as HTMLElement;
        el.style.gridRowEnd = `span ${Math.ceil((getHeight(item) + gap) / (altura + gap))}`;
      });
    };

    gallery.querySelectorAll('img').forEach((item: HTMLImageElement) => {
      item.classList.add('byebye');
      if (item.complete) {
        console.log(item.src);
      } else {
        item.addEventListener('load', function () {
          const altura = getVal(gallery, 'grid-auto-rows');
          const gap = getVal(gallery, 'grid-row-gap');
          const gitem = item.parentElement!.parentElement as HTMLElement;
          gitem.style.gridRowEnd = `span ${Math.ceil((getHeight(gitem) + gap) / (altura + gap))}`;
          item.classList.remove('byebye');
        });
      }
    });

    window.addEventListener('resize', resizeAll);

    gallery.querySelectorAll('.gallery-item').forEach((item: Element) => {
      item.addEventListener('click', function () {
        item.classList.toggle('full');
      });
    });
  }
}
