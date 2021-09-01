import { ResponsiveCalendar } from '@nivo/calendar'
import { ICalendarData } from '../../App/app-state.interface';

interface ICalendarProps {
  data: ICalendarData | undefined;
  colors: string[];
}

const Calendar =  ({ data, colors }: ICalendarProps) => {

  // For sane year ranges fallback if no data
  const thisYear = new Date().getFullYear();

  const from = data?.length ? data.reduce((prev, current) => ((prev.day < current.day) ? prev : current)).day : `${thisYear-2}`;
  const to = data?.length ? data?.reduce((prev, current) => ((prev.day > current.day) ? prev : current)).day : `${thisYear}`;

  return (
    <div className="calendar-container">
       <ResponsiveCalendar
        data={data || []}
        from={from}
        to={to}
        emptyColor="#eeeeee"
        colors={colors}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
      />
    {/* <svg width="100" height={31*colors.length}>
      {
        colors.map((color, i) => (<rect x="10" y={29.4*i} fill={color} width="29.4" height="29.4" stroke-width="2" stroke="rgb(255, 255, 255)"></rect>))
      }
    </svg> */}
    </div>
  );
}

export default Calendar;
