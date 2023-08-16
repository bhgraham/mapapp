import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Input() svgPaths: any[] = [];
  @Output() pathMouseOver = new EventEmitter<any>();
  @Output() pathMouseDown = new EventEmitter<any>();

  onPathMouseOver(event: MouseEvent, path: any) {
    this.pathMouseOver.emit({ event, path });
    this.highlightPath(path);
  }

  onPathMouseDown(event: MouseEvent, path: any) {
  }

  onMouseMove(event: MouseEvent) {
  }

  onMouseDown(event: MouseEvent) {
  }

  private highlightPath(path: any) {
    this.resetHighlight();
    path.highlighted = true;
  }

  private resetHighlight() {
    this.svgPaths.forEach((path) => {
      path.highlighted = false;
    });
  }
}
