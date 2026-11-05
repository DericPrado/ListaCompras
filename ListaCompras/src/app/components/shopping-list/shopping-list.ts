import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingService } from '../../services/shopping';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-list.html',
  styleUrls: ['./shopping-list.css']
})
export class ShoppingListComponent {
  private shoppingService = inject(ShoppingService);

  public newItemName = signal('');
  public groupedList = this.shoppingService.groupedAndSortedList;

  public addNewItem(): void {
    if (this.newItemName().trim()) {
      this.shoppingService.addItem(this.newItemName());
      this.newItemName.set(''); // Limpa o input
    }
  }

  public toggle(id: string): void {
    this.shoppingService.toggleItem(id);
  }

  public remove(id: string): void {
    this.shoppingService.removeItem(id);
  }

  // Função auxiliar para exibir ícones baseados no peso
  public getWeightIcon(weight: number): string {
    switch (weight) {
      case 3: return '🧱 Pesado';
      case 2: return '📦 Médio';
      case 1: return '🥚 Leve/Frágil';
      default: return '';
    }
  }
}