import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'decodeHtml',
})
export class DecodeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): any {
    const doc = new DOMParser().parseFromString(value, 'text/html');
    return doc.documentElement.textContent;
  }
}
