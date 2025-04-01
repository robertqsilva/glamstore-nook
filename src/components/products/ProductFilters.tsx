
interface FilterOption {
  id: string;
  label: string;
}

interface ProductFiltersProps {
  categories: FilterOption[];
  colors: FilterOption[];
  sizes: FilterOption[];
  priceRanges: FilterOption[];
  selectedFilters: {
    category: string | null;
    colors: string[];
    sizes: string[];
    priceRange: string | null;
    inStock: boolean;
  };
  onFilterChange: (filterType: string, value: any) => void;
}

export const ProductFilters = ({
  categories,
  colors,
  sizes,
  priceRanges,
  selectedFilters,
  onFilterChange,
}: ProductFiltersProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Categorias</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="radio"
                id={`category-${category.id}`}
                name="category"
                className="mr-2 h-4 w-4 text-rose-500 focus:ring-rose-400"
                checked={selectedFilters.category === category.id}
                onChange={() => onFilterChange('category', category.id)}
              />
              <label htmlFor={`category-${category.id}`} className="text-gray-700">
                {category.label}
              </label>
            </div>
          ))}
          <div className="flex items-center mt-1">
            <input
              type="radio"
              id="category-all"
              name="category"
              className="mr-2 h-4 w-4 text-rose-500 focus:ring-rose-400"
              checked={selectedFilters.category === null}
              onChange={() => onFilterChange('category', null)}
            />
            <label htmlFor="category-all" className="text-gray-700">
              Todas as categorias
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Preço</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center">
              <input
                type="radio"
                id={`price-${range.id}`}
                name="priceRange"
                className="mr-2 h-4 w-4 text-rose-500 focus:ring-rose-400"
                checked={selectedFilters.priceRange === range.id}
                onChange={() => onFilterChange('priceRange', range.id)}
              />
              <label htmlFor={`price-${range.id}`} className="text-gray-700">
                {range.label}
              </label>
            </div>
          ))}
          <div className="flex items-center mt-1">
            <input
              type="radio"
              id="price-all"
              name="priceRange"
              className="mr-2 h-4 w-4 text-rose-500 focus:ring-rose-400"
              checked={selectedFilters.priceRange === null}
              onChange={() => onFilterChange('priceRange', null)}
            />
            <label htmlFor="price-all" className="text-gray-700">
              Todos os preços
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Cores</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedFilters.colors.includes(color.id)
                  ? 'border-rose-500'
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: color.id }}
              onClick={() => {
                const newColors = selectedFilters.colors.includes(color.id)
                  ? selectedFilters.colors.filter((c) => c !== color.id)
                  : [...selectedFilters.colors, color.id];
                onFilterChange('colors', newColors);
              }}
              aria-label={`Cor ${color.label}`}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Tamanhos</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              className={`h-8 min-w-[2rem] px-2 flex items-center justify-center rounded-md border ${
                selectedFilters.sizes.includes(size.id)
                  ? 'bg-rose-100 border-rose-300 text-rose-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                const newSizes = selectedFilters.sizes.includes(size.id)
                  ? selectedFilters.sizes.filter((s) => s !== size.id)
                  : [...selectedFilters.sizes, size.id];
                onFilterChange('sizes', newSizes);
              }}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="inStock"
            className="mr-2 h-4 w-4 text-rose-500 focus:ring-rose-400"
            checked={selectedFilters.inStock}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
          />
          <label htmlFor="inStock" className="text-gray-700">
            Somente itens em estoque
          </label>
        </div>
      </div>
    </div>
  );
};
