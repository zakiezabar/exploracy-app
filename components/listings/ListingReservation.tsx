'use client';
import { useRouter } from 'next/navigation';

import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface ListingReservationProps {
  listingId: string;  // Newly added
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  listingId,    // Added this
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
  const router = useRouter();

  const handleReservation = () => {
    const startDate = dateRange.startDate?.toISOString() || '';
    const endDate = dateRange.endDate?.toISOString() || '';

    console.log('ListingId being passed:', listingId);

    // Construct URL with query parameters
    const queryString = new URLSearchParams({
      listingId,    // Added this
      price: price.toString(),
      startDate,
      endDate,
      totalPrice: totalPrice.toString(),
    }).toString();

    console.log('Query string:', queryString); // Add this log
    router.push(`/listings/review?${queryString}`);
  };

  return ( 
    <div
    className="
      bg-mono-100
      rounded-xl
      border-[1px]
      border-neutral-200
      overflow-hidden
      
    ">
      <div className="
        flex flex-row items-center gap-1 p-4 ">
          <div className="text-2xl font-semibold">
            MYR {price}
          </div>
          <div className="font-light text-neutral-600">
            /person
          </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      
      <div className="
        p-4
        flex
        flex-row
        items-center
        justify-between
        font-semibold
        text-lg
      ">
        <div>
          Total
        </div>
        <div>
          MYR {totalPrice}
        </div>
      </div>
      <div className="p-4">
        <Button
          disabled={disabled}
          label="Reserve"
          onClick={handleReservation}
        />
      </div>
    </div>
   );
}
 
export default ListingReservation;