export interface ShoppingItem {
    id: string;
    name: string;
    category: string;
    weightClass: number; // 3 = Pesado, 2 = Médio, 1 = Leve (Frágil)
    checked: boolean;
}

export interface ItemGroup {
    groupName: string;
    items: ShoppingItem[];
}

export const CATEGORY_ORDER = [
    'Limpeza',
    'Bebidas',
    'Mercearia',
    'Açougue e Frios',
    'Hortifruti',
    'Padaria',
    'Outros'
];