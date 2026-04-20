import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';
import { SectionTitle } from '../../../../../shared/models/blog.model';

@Component({
  selector: 'app-section-titles',
  imports: [NgClass],
  templateUrl: './section-titles.component.html',
  styleUrl: './section-titles.component.scss'
})
export class SectionTitlesComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() sectionTitles: SectionTitle[] = [];
  activeDomId = '';

  private scrollHost: HTMLElement | Window | null = null;
  private removeScrollListener: (() => void) | null = null;
  private rafId: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sectionTitles']?.currentValue?.length) {
      this.activeDomId = this.sectionTitles[0]?.domId ?? '';
      // Markdown headings get their ids attached asynchronously (on markdown ready),
      // so schedule an initial sync after inputs arrive.
      setTimeout(() => this.updateActiveFromScroll(), 0);
    }
  }

  ngAfterViewInit(): void {
    this.attachScrollListener();
    // Run once on init so the highlight matches the current scroll position.
    setTimeout(() => this.updateActiveFromScroll(), 0);
  }

  ngOnDestroy(): void {
    this.detachScrollListener();
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  onSectionTitleClick(sectionTitle: SectionTitle): void {
    const sectionElement = sectionTitle.domId ? document.getElementById(sectionTitle.domId) : null;
    if (!sectionElement) {
      return;
    }

    this.activeDomId = sectionTitle.domId;
    this.scrollToElement(sectionElement);
  }

  private attachScrollListener(): void {
    this.detachScrollListener();

    // Prefer the app's scroll container, fallback to window.
    const mainContent = document.getElementById('main-content');
    this.scrollHost = mainContent ?? window;

    const handler = () => {
      // Throttle to once per animation frame.
      if (this.rafId !== null) {
        return;
      }
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null;
        this.updateActiveFromScroll();
      });
    };

    if (this.scrollHost instanceof Window) {
      window.addEventListener('scroll', handler, { passive: true });
      this.removeScrollListener = () => window.removeEventListener('scroll', handler as EventListener);
      return;
    }

    this.scrollHost.addEventListener('scroll', handler, { passive: true });
    this.removeScrollListener = () => this.scrollHost?.removeEventListener('scroll', handler as EventListener);
  }

  private detachScrollListener(): void {
    this.removeScrollListener?.();
    this.removeScrollListener = null;
    this.scrollHost = null;
  }

  private updateActiveFromScroll(): void {
    if (!this.sectionTitles?.length) {
      return;
    }

    const container = document.getElementById('main-content');
    const containerTop = container ? container.getBoundingClientRect().top : 0;

    const sections = this.sectionTitles
      .map(st => ({
        domId: st.domId,
        el: st.domId ? document.getElementById(st.domId) : null
      }))
      .filter(s => !!s.domId && !!s.el) as { domId: string; el: HTMLElement }[];

    if (!sections.length) {
      return;
    }

    // Prefer the last heading that has crossed the "reading line".
    const readingLineOffset = 140; // px from top of scroll container
    const readingLine = containerTop + readingLineOffset;

    let best: { domId: string; top: number } | null = null;
    for (const s of sections) {
      const top = s.el.getBoundingClientRect().top;
      if (top <= readingLine) {
        if (!best || top > best.top) {
          best = { domId: s.domId, top };
        }
      }
    }

    const nextActiveDomId = best?.domId ?? sections[0].domId;
    if (nextActiveDomId && nextActiveDomId !== this.activeDomId) {
      this.activeDomId = nextActiveDomId;
    }
  }

  private scrollToElement(targetElement: HTMLElement): void {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const offset = 24;
    const targetTop = targetElement.getBoundingClientRect().top - mainContent.getBoundingClientRect().top + mainContent.scrollTop - offset;
    mainContent.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  }
}
