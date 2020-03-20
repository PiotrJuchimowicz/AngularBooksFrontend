import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-table-buttons',
  templateUrl: './table-buttons.component.html',
  styleUrls: ['./table-buttons.component.css']
})
export class TableButtonsComponent {

  @Input() doesActionsOnBookDisabled = true;
  @Output() bookDetailsButtonClicked = new EventEmitter<void>();
  @Output() addButtonClicked = new EventEmitter<void>();
  @Output() editButtonClicked = new EventEmitter<void>();
  @Output() deleteButtonClicked = new EventEmitter<void>();

  constructor() {
  }

  showAddDialog(): void {
    this.addButtonClicked.emit();
  }

  showEditDialog(): void {
    this.editButtonClicked.emit();
  }

  deleteSelected(): void {
    this.deleteButtonClicked.emit();
  }

  showBookDetails(): void {
    this.bookDetailsButtonClicked.emit();
  }
}
