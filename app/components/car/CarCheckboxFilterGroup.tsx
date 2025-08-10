
interface CheckboxItem {
    label: string;
    count: number;
}

interface CheckboxFilterGroupProps {
    title?: string;
    items: CheckboxItem[];
    selectedItems: string[];
    onToggle: (label: string) => void;
}

const CarCheckboxFilterGroup = ({
    title,
    items,
    selectedItems,
    onToggle
}: CheckboxFilterGroupProps) => (
    <div className="space-y-2 text-sm">
        {items.map((item) => (
            <label key={item.label} className="flex items-center">
                <input
                    type="checkbox"
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    checked={selectedItems.includes(item.label)}
                    onChange={() => onToggle(item.label)}
                />
                {item.label} ({item.count})
            </label>
        ))}
    </div>
);
export { CarCheckboxFilterGroup };