import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  newNote = { title: '', content: '' };
  error: string = '';
  loading: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.loading = true;
    this.api.getNotes().subscribe({
      next: (res) => {
        this.notes = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error || 'Failed to load notes.';
        this.loading = false;
      },
    });
  }

  addNote() {
    if (!this.newNote.title) return;

    this.api.createNote(this.newNote).subscribe({
      next: () => {
        this.newNote = { title: '', content: '' };
        this.loadNotes();
      },
      error: (err) => (this.error = err.error || 'Failed to add note.'),
    });
  }

  deleteNote(id: number) {
    this.api.deleteNote(id).subscribe({
      next: () => this.loadNotes(),
      error: (err) => (this.error = err.error || 'Failed to delete note.'),
    });
  }
}
