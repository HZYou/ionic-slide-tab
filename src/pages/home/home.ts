import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('homeSlides') slides: Slides;
  tabs: number = 0;
  pageNo = [1, 1];
  hasNext = [true, true];
  infinite: boolean = true;
  tab1: Array<any> = [];
  tab2: Array<any> = [];
  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  ionViewDidEnter() {
    this.fetchList();
  }


  slideChanged() {
    const activeIndex = this.slides.getActiveIndex();
    if (activeIndex >= 2) return;

    this.tabs = this.slides.getActiveIndex();
    if (this.tabs && this.tab2.length === 0) {
      this.fetchList();
    }
    this.contentResize();
  }

  segmentChanged() {
    this.slides.slideTo(this.tabs);
    // this.content.scrollToTop();
  }

  contentResize() {
    this.infinite = false
    setTimeout(() => {
      this.infinite = true;
    }, 1500);
  }

  // 加载更多
  async loadMore(event: any) {
    if (this.pageNo[this.tabs] == 10) {
      this.hasNext[this.tabs] = false;
      this.showToast('到底了！我是有底线的！');
      return;
    }
    this.pageNo[this.tabs]++;
    if (this.tabs === 0)
      this.fetchList(event);
    else
      this.fetchList(event);
  }

  fetchList(event?: any) {

    for (let i = 0; i < 10; i++) {
      const item = TimeWords[Math.floor(Math.random() * 5)] + NameWords[Math.floor(Math.random() * 5)] + DoWords[Math.floor(Math.random() * 5)];
      if (this.tabs)
        this.tab2.push(item);
      else
        this.tab1.push(item);

    }
    if (this.pageNo[this.tabs] >= 10) {
      this.hasNext[this.tabs] = false;
    }
    this.showToast(`第${this.pageNo[this.tabs]}页`);


    event && event.complete();
    if (event && this.hasNext[this.tabs]) {
      this.contentResize();
    }
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }
}

const TimeWords = ['今日', '昨日', '前日', '明日', '后日', '未来几天'];
const NameWords = ['李弘基', '张奇艺', '童稚', '悟空', '倪妮', '韩子新'];
const DoWords = ['直播写代码', '计划通过集资上市', '开通移动支付', '使用❤心型农具', '发生意外事件', '开发出一款新应用'];
