export default class VideoPreload {
    constructor() {
      this.init();
    }
  
    init() {
      const videoSrc = window.matchMedia("(min-width: 768px)").matches
        ? "./img/index/video-desktop.mp4"
        : "./img/index/video-mobile.mp4";
  
      this.preloadVideo(videoSrc);
    }
  
    preloadVideo(src) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = src;
      link.as = "video";
      link.type = "video/mp4";
      
      document.head.appendChild(link);
    }
  }
  