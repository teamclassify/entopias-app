import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import countries from '@/data/countries.json';
import states from '@/data/states.json';

interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

interface CountryProps {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: string;
  subregion: string;
  subregion_id: string;
  nationality: string;
  timezones: Timezone[];
  translations: Record<string, string>;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

interface StateProps {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  state_code: string;
  type: string | null;
  latitude: string;
  longitude: string;
}

interface LocationSelectorProps {
  disabled?: boolean;
  value?: { country: string; state: string };
  onCountryChange?: (country: CountryProps | null) => void;
  onStateChange?: (state: StateProps | null) => void;
}

const LocationSelector = ({
  disabled,
  value = { country: '', state: '' },
  onCountryChange,
  onStateChange,
}: LocationSelectorProps) => {
  const [openCountryDropdown, setOpenCountryDropdown] = useState(false);
  const [openStateDropdown, setOpenStateDropdown] = useState(false);

  const countriesData = countries as CountryProps[];
  const statesData = states as StateProps[];

  const selectedCountry = countriesData.find((c) => c.name === value.country) || null;
  const availableStates = statesData.filter(
    (state) => state.country_id === selectedCountry?.id,
  );

  const handleCountrySelect = (country: CountryProps | null) => {
    onCountryChange?.(country);
    onStateChange?.(null); // Resetear estado al cambiar país
    setOpenCountryDropdown(false);
  };

  const handleStateSelect = (state: StateProps | null) => {
    onStateChange?.(state);
    setOpenStateDropdown(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Country Selector */}
      <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
        <PopoverTrigger>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCountryDropdown}
            disabled={disabled}
            className="w-full justify-between cursor-pointer"
            type="button"
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <span>{selectedCountry.emoji}</span>
                <span>{selectedCountry.name}</span>
              </div>
            ) : (
              <span>Selecciona un país...</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Buscar país..." />
            <CommandList>
              <CommandEmpty>No se encontró ningún país.</CommandEmpty>
              <CommandGroup>
              
                  {countriesData.map((country) => (
                    <CommandItem
                      key={country.id}
                      value={country.name}
                      onSelect={() => {
                        handleCountrySelect(country);
                      }}
                      className="flex cursor-pointer items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span>{country.emoji}</span>
                        <span>{country.name}</span>
                      </div>
                      <Check
                        className={cn(
                          'h-4 w-4',
                          selectedCountry?.id === country.id ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* State Selector */}
      <Popover open={openStateDropdown} onOpenChange={setOpenStateDropdown}>
        <PopoverTrigger>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openStateDropdown}
            disabled={!selectedCountry || disabled}
            className="w-full justify-between cursor-pointer"
            type="button"
          >
            {value.state ? (
              <span>{value.state}</span> // Mostrar el estado seleccionado
            ) : (
              <span>Selecciona un estado...</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Buscar estado..." />
            <CommandList>
              <CommandEmpty>No se encontró ningún estado.</CommandEmpty>
              <CommandGroup>
                  {availableStates.map((state) => (
                    <CommandItem
                      key={state.id}
                      value={state.name}
                      onSelect={() => {
                        handleStateSelect(state);
                      }}
                      className="flex cursor-pointer items-center justify-between text-sm"
                    >
                      <span>{state.name}</span>
                      <Check
                        className={cn(
                          'h-4 w-4',
                          value.state === state.name ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationSelector;