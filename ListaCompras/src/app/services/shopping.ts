import { Injectable, signal, computed } from '@angular/core';
import { ShoppingItem, ItemGroup, CATEGORY_ORDER } from '../models/shopping-item.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
    private itemsSignal = signal<ShoppingItem[]>([]);

    private dictionary: Record<string, { category: string, weightClass: number }> = {
        'arroz': { category: 'Mercearia', weightClass: 3 },
        'feijão': { category: 'Mercearia', weightClass: 3 },
        'macarrão': { category: 'Mercearia', weightClass: 2 },
        'biscoito': { category: 'Mercearia', weightClass: 1 },
        'óleo': { category: 'Mercearia', weightClass: 2 },
        'refrigerante': { category: 'Bebidas', weightClass: 3 },
        'leite': { category: 'Bebidas', weightClass: 3 },
        'suco': { category: 'Bebidas', weightClass: 3 },
        'sabão em pó': { category: 'Limpeza', weightClass: 3 },
        'amaciante': { category: 'Limpeza', weightClass: 3 },
        'detergente': { category: 'Limpeza', weightClass: 2 },
        'esponja': { category: 'Limpeza', weightClass: 1 },
        'carne': { category: 'Açougue e Frios', weightClass: 3 },
        'frango': { category: 'Açougue e Frios', weightClass: 3 },
        'queijo': { category: 'Açougue e Frios', weightClass: 2 },
        'presunto': { category: 'Açougue e Frios', weightClass: 2 },
        'tomate': { category: 'Hortifruti', weightClass: 2 },
        'alface': { category: 'Hortifruti', weightClass: 1 },
        'ovo': { category: 'Hortifruti', weightClass: 1 },
        'pão': { category: 'Padaria', weightClass: 1 },
        'açúcar': { category: 'Mercearia', weightClass: 3 },
        'creme de leite': {category: 'Doces e Coberturas', weightClass: 1},
        'leite condensado': {category: 'Doces e coberturas', weightClass: 1},
        'leite moça': {category: 'Doces e coberturas', weightClass: 1},
        'doce de leite': {category: 'Doces e coberturas', weightClass: 1},
        'paçoca': {category: 'Doces e coberturas', weightClass: 1},
        'nutela': {category: 'Doces e coberturas', weightClass: 1},
        'chocolate': {category: 'Doces e coberturas', weightClass: 1},
        'Água sanitaria': {category: 'Limpeza', weightClass: 3},
        'qboa': {category: 'Limpeza', weightClass: 3},
        'bucha': {category: 'Limpeza', weightClass: 1},
        'saco de lixo': {category: 'Limpeza', weightClass: 1}
    };

    public groupedAndSortedList = computed<ItemGroup[]>(() => {
        const items = this.itemsSignal();
        const groupsMap = new Map<number, ShoppingItem[]>();

        // Agrupa por Peso (weightClass)
        items.forEach(item => {
            if (!groupsMap.has(item.weightClass)) {
                groupsMap.set(item.weightClass, []);
            }
            groupsMap.get(item.weightClass)!.push(item);
        });

        const groupsArray: ItemGroup[] = [];
        const weightLabels: Record<number, string> = {
            3: '🧱 Pesados (Fundo do carrinho)',
            2: '📦 Médios (Meio do carrinho)',
            1: '🥚 Leves/Frágeis (Topo do carrinho)'
        };

        // Itera do mais pesado (3) para o mais leve (1)
        [3, 2, 1].forEach(weight => {
            if (groupsMap.has(weight)) {
                const weightItems = groupsMap.get(weight)!;

                // Ordena internamente pela ordem dos corredores
                weightItems.sort((a, b) => {
                    const indexA = CATEGORY_ORDER.indexOf(a.category);
                    const indexB = CATEGORY_ORDER.indexOf(b.category);

                    const posA = indexA === -1 ? 999 : indexA;
                    const posB = indexB === -1 ? 999 : indexB;

                    return posA - posB;
                });

                groupsArray.push({
                    groupName: weightLabels[weight],
                    items: weightItems
                });
            }
        });

        return groupsArray;
    });

    public addItem(name: string): void {
        const cleanName = name.toLowerCase().trim();
        let category = 'Outros';
        let weightClass = 2;

        for (const [key, config] of Object.entries(this.dictionary)) {
            if (cleanName.includes(key)) {
                category = config.category;
                weightClass = config.weightClass;
                break;
            }
        }

        const newItem: ShoppingItem = {
            id: crypto.randomUUID(),
            name: name.trim(),
            category,
            weightClass,
            checked: false
        };

        this.itemsSignal.update(items => [...items, newItem]);
    }

    public toggleItem(id: string): void {
        this.itemsSignal.update(items =>
            items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
        );
    }

    public removeItem(id: string): void {
        this.itemsSignal.update(items => items.filter(item => item.id !== id));
    }
}