import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgStyle, NgFor, NgClass } from '@angular/common';
import { Random1 } from '../random1/random1';

@Component({
  selector: 'app-rain',
  imports: [NgIf, NgStyle, NgFor, NgClass, Random1],
  templateUrl: './rain.html',
  styleUrl: './rain.scss'
})
export class Rain implements AfterViewInit, OnChanges {
  @ViewChild('dvdImg', { static: false }) dvdImg!: ElementRef<HTMLImageElement>;
  @ViewChild('ballImg', { static: false }) ballImg!: ElementRef<HTMLImageElement>;
  @ViewChild('ball2Img', { static: false }) ball2Img!: ElementRef<HTMLImageElement>;
  @ViewChild('smugImg', { static: false }) smugImg!: ElementRef<HTMLImageElement>;
  @ViewChild('smug2Img', { static: false }) smug2Img!: ElementRef<HTMLImageElement>;
  @ViewChild('mainAudio', { static: false }) mainAudio!: ElementRef<HTMLAudioElement>;

  showCopyright = false;
  showClick = true;
  showElphelt = false;
  showWarning = false;
  showIntro = false;
  showVolume = true;

  private animationFrameId: number | null = null;
  private x = 0;
  private y = 0;
  private dx = 3;
  private dy = 3;

  // Ball rave effect
  ballRaveActive = false;
  ballRaveInterval: any = null;
  ballRavePosition = { top: '50%', left: '50%' };
  // Ball 2
  ball2RaveActive = false;
  ball2RaveInterval: any = null;
  ball2RavePosition = { top: '60%', left: '60%' };

  // Smug rave effect
  smugRaveActive = false;
  smugRaveInterval: any = null;
  smugRavePosition = { top: '40%', left: '40%' };
  // Smug 2
  smug2RaveActive = false;
  smug2RaveInterval: any = null;
  smug2RavePosition = { top: '30%', left: '30%' };

  // Ajout pour les barres musicales oscillantes
  musicBars: { color: string; boost: number }[] = [];
  musicBarInterval: any = null;

  private getRandomColor(): string {
    const colors = [
      '#ff00cc', '#00ffea', '#ffe600', '#ff0000', '#00ff00', '#00aaff', '#fff', '#ff8800', '#00ff88', '#ff0088'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private startMusicBars(bpm: number = 175) {
    if (this.musicBarInterval) clearInterval(this.musicBarInterval);
    const interval = Math.round(60000 / bpm);
    // Initialise les barres au démarrage
    this.musicBars = Array.from({ length: 48 }, () => ({ color: this.getRandomColor(), boost: 0 }));
    this.musicBarInterval = setInterval(() => {
      this.musicBars = this.musicBars.map(() => {
        // boost: 2 = très haut (rare), 1 = haut (fréquent), 0 = normal
        const rand = Math.random();
        let boost = 0;
        if (rand < 0.16) boost = 2; // 16% très haut
        else if (rand < 0.60) boost = 1; // 44% haut
        return { color: this.getRandomColor(), boost };
      });
    }, interval);
  }

  constructor(private renderer: Renderer2) {}

  // Empêche le retour arrière sur la page rain
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    history.pushState(null, '', location.href);
  }

  // Affiche un message de confirmation à la fermeture de l'onglet
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: any) {
    event.preventDefault();
    event.returnValue = 'Êtes-vous sûr de vouloir quitter ce monde ?';
    return 'Êtes-vous sûr de vouloir quitter ce monde ?';
  }

  ngAfterViewInit() {
    setTimeout(() => this.startDVDBounce(), 0);
    this.enableAudioOnInteraction();
    // Empêche le retour arrière navigateur
    history.pushState(null, '', location.href);
  }

  ngOnDestroy() {
    if (this.ballRaveInterval) clearInterval(this.ballRaveInterval);
    if (this.ball2RaveInterval) clearInterval(this.ball2RaveInterval);
    if (this.smugRaveInterval) clearInterval(this.smugRaveInterval);
    if (this.smug2RaveInterval) clearInterval(this.smug2RaveInterval);
    if (this.musicBarInterval) clearInterval(this.musicBarInterval);
  }

  // Permet de lancer l'audio après une interaction utilisateur
  private enableAudioOnInteraction() {
    const audio = this.mainAudio?.nativeElement;
    if (!audio) return;
    audio.volume = 1.0;
    const startAt = 23; // temps de départ en secondes (modifie cette valeur selon le besoin)
    const playAudio = () => {
      this.showClick = false;
      this.showWarning = true;
      setTimeout(() => {
        this.showWarning = false;
        this.showIntro = true;
        setTimeout(() => {
          this.showIntro = false;
          audio.currentTime = startAt;
          audio.volume = 1.0;
          audio.play().catch(() => {});
          this.showCopyright = true;
          this.showElphelt = true;
          this.startBallRaveEffect();
          this.startSmugRaveEffect();
          this.startMusicBars(175);
        }, 600); // durée de l'intro en ms (2x plus court)
      }, 1600); // durée du warning en ms
      window.removeEventListener('click', playAudio);
      window.removeEventListener('touchstart', playAudio);
    };
    window.addEventListener('click', playAudio);
    window.addEventListener('touchstart', playAudio);
  }

  @HostListener('window:resize')
  onResize() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.startDVDBounce();
  }

  startDVDBounce() {
    const img = this.dvdImg?.nativeElement;
    if (!img) return;
    const speed = 3;
    const imgW = img.offsetWidth;
    const imgH = img.offsetHeight;
    const maxX = window.innerWidth - imgW;
    const maxY = window.innerHeight - imgH;
    this.x = Math.random() * maxX;
    this.y = Math.random() * maxY;
    this.dx = speed * (Math.random() > 0.5 ? 1 : -1);
    this.dy = speed * (Math.random() > 0.5 ? 1 : -1);

    const animate = () => {
      this.x += this.dx;
      this.y += this.dy;
      if (this.x <= 0 || this.x >= maxX) this.dx *= -1;
      if (this.y <= 0 || this.y >= maxY) this.dy *= -1;
      img.style.transform = `translate(${this.x}px, ${this.y}px)`;
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }

  startBallRaveEffect() {
    if (this.ballRaveInterval) clearInterval(this.ballRaveInterval);
    if (this.ball2RaveInterval) clearInterval(this.ball2RaveInterval);
    if (!this.showCopyright) return;
    this.ballRaveActive = true;
    this.ball2RaveActive = true;
    const bpm = 175;
    const interval = Math.round(60000 / bpm); // ms
    const moveBall = () => {
      if (!this.ballImg || !this.ballImg.nativeElement) return;
      const img = this.ballImg.nativeElement;
      const ballW = img.offsetWidth || 140;
      const ballH = img.offsetHeight || 140;
      const maxX = window.innerWidth - ballW;
      const maxY = window.innerHeight - ballH;
      const left = Math.random() * maxX;
      const top = Math.random() * maxY;
      this.ballRavePosition = { top: `${top}px`, left: `${left}px` };
    };
    const moveBall2 = () => {
      if (!this.ball2Img || !this.ball2Img.nativeElement) return;
      const img = this.ball2Img.nativeElement;
      const ballW = img.offsetWidth || 90;
      const ballH = img.offsetHeight || 90;
      const maxX = window.innerWidth - ballW;
      const maxY = window.innerHeight - ballH;
      const left = Math.random() * maxX;
      const top = Math.random() * maxY;
      this.ball2RavePosition = { top: `${top}px`, left: `${left}px` };
    };
    moveBall();
    moveBall2();
    this.ballRaveInterval = setInterval(moveBall, interval);
    this.ball2RaveInterval = setInterval(moveBall2, interval);
    this.startSmugRaveEffect();
  }

  startSmugRaveEffect() {
    if (this.smugRaveInterval) clearInterval(this.smugRaveInterval);
    if (this.smug2RaveInterval) clearInterval(this.smug2RaveInterval);
    if (!this.showCopyright) return;
    this.smugRaveActive = true;
    this.smug2RaveActive = true;
    const bpm = 175;
    const interval = Math.round(60000 / bpm); // ms
    const moveSmug = () => {
      if (!this.smugImg || !this.smugImg.nativeElement) return;
      const img = this.smugImg.nativeElement;
      const smugW = img.offsetWidth || 100;
      const smugH = img.offsetHeight || 100;
      const maxX = window.innerWidth - smugW;
      const maxY = window.innerHeight - smugH;
      const left = Math.random() * maxX;
      const top = Math.random() * maxY;
      this.smugRavePosition = { top: `${top}px`, left: `${left}px` };
    };
    const moveSmug2 = () => {
      if (!this.smug2Img || !this.smug2Img.nativeElement) return;
      const img = this.smug2Img.nativeElement;
      const smugW = img.offsetWidth || 60;
      const smugH = img.offsetHeight || 60;
      const maxX = window.innerWidth - smugW;
      const maxY = window.innerHeight - smugH;
      const left = Math.random() * maxX;
      const top = Math.random() * maxY;
      this.smug2RavePosition = { top: `${top}px`, left: `${left}px` };
    };
    moveSmug();
    moveSmug2();
    this.smugRaveInterval = setInterval(moveSmug, interval);
    this.smug2RaveInterval = setInterval(moveSmug2, interval);
  }

  // Watch for showCopyright changes to trigger the effect
  ngOnChanges(changes: SimpleChanges) {
    if (changes['showCopyright']) {
      if (this.showCopyright && !this.ballRaveActive) {
        this.startBallRaveEffect();
      } else if (!this.showCopyright && this.ballRaveActive) {
        this.ballRaveActive = false;
        this.ball2RaveActive = false;
        if (this.ballRaveInterval) clearInterval(this.ballRaveInterval);
        if (this.ball2RaveInterval) clearInterval(this.ball2RaveInterval);
      }
      if (this.showCopyright && !this.smugRaveActive) {
        this.startSmugRaveEffect();
      } else if (!this.showCopyright && this.smugRaveActive) {
        this.smugRaveActive = false;
        this.smug2RaveActive = false;
        if (this.smugRaveInterval) clearInterval(this.smugRaveInterval);
        if (this.smug2RaveInterval) clearInterval(this.smug2RaveInterval);
      }
    }
  }
}
