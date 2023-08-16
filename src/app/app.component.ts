import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to fetch SVG file
import { InfoService } from './info.service'; // Import InfoService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  svgPaths: any[] = []; 
  selectedPath: any;
  countryInfo: any;

  constructor(
    private http: HttpClient,
    private infoService: InfoService
  ) {}

  ngOnInit() {
    this.http.get('assets/world-map.svg', { responseType: 'text' }).subscribe((svgContent: string) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
      const paths = svgDoc.querySelectorAll('path');

      paths.forEach((path: SVGPathElement) => {
        this.svgPaths.push({
          d: path.getAttribute('d'),
          id: path.getAttribute('id'),
          fill: path.getAttribute('fill')
        });
      });
    });
  }

  onPathMouseOver(event: any) {
    this.selectedPath = event.path;
    this.fetchCountryInfo(); // Call fetchCountryInfo function directly
  }

  onPathMouseDown(event: any) {
    this.selectedPath = event.path;
    this.fetchCountryInfo(); // Call fetchCountryInfo function directly
  }

  fetchCountryInfo() {
    if (this.selectedPath) {
      const countryCode = this.selectedPath.id;
      this.infoService.getCountryInfo(countryCode).subscribe(
        (data) => {
          this.countryInfo = data[1][0];
        },
        (error) => {
          console.error('Error fetching country info', error);
        }
      );
    }
  }
}

