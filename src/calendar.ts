export class Calendar {
  firstWeekDay: number;

  constructor(firstWeekDay = 0) {
    this.firstWeekDay = firstWeekDay; // 0 = Sunday
  }

  weekStartDate(date: Date) {
    let startDate = new Date(date.getTime());
    while (startDate.getDay() !== this.firstWeekDay) {
      startDate.setDate(startDate.getDate() - 1);
    }
    return startDate;
  }

  monthDates(year: number, month: number, dayFormatter: any = null, weekFormatter: any = null) {
    let weeks: Array<any> = [],
      week: Array<any> = [],
      i = 0,
      date = this.weekStartDate(new Date(year, month, 1));
    do {
      for (i = 0; i < 7; i++) {
        week.push(dayFormatter ? dayFormatter(date) : date);
        date = new Date(date.getTime());
        date.setDate(date.getDate() + 1);
      }
      weeks.push(weekFormatter ? weekFormatter(week) : week);
      week = [];
    } while ((date.getMonth() <= month) && (date.getFullYear() === year));
    return weeks;
  }

  monthDays(year: number, month: number) {
    let getDayOrZero = function getDayOrZero(date: Date) {
      return date.getMonth() === month ? date : 0;
    };
    return this.monthDates(year, month, getDayOrZero);
  }

  monthText(year: number, month: number) {
    if (!year) {
      let now = new Date();
      year = now.getFullYear();
      month = now.getMonth();
    }
    let getDayOrBlank = function getDayOrBlank(date: Date) {
      let s = date.getMonth() === month ? date.getDate().toString() : '  ';
      while (s.length < 2) s = ' ' + s;
      return s;
    };
    let weeks = this.monthDates(year, month, getDayOrBlank,
      function (week: any) { return week.join(' '); });
    return weeks.join('\n');
  }
}

const months = 'JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ');
for (let i = 0; i < months.length; i++) {
  Calendar[months[i]] = i;
}

/*!
 * calendar: a port of the calendar module from Python
 * Copyright(c) 2011 Luciano Ramalho <luciano@ramalho.org>
 * MIT Licensed
 */
