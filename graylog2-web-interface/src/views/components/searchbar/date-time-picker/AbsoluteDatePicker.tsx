/*
 * Copyright (C) 2020 Graylog, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Server Side Public License, version 1,
 * as published by MongoDB, Inc.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Server Side Public License for more details.
 *
 * You should have received a copy of the Server Side Public License
 * along with this program. If not, see
 * <http://www.mongodb.com/licensing/server-side-public-license>.
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { DateUtils } from 'react-day-picker';
import moment from 'moment';

import { DatePicker } from 'components/common';
import { DATE_TIME_FORMATS } from 'util/DateTime';

type Props = {
  dateTime: string,
  onChange?: (string) => void,
  startDate?: Date,
}

const AbsoluteDatePicker = ({ dateTime, onChange, startDate }: Props) => {
  const initialDateTime = moment(dateTime).toObject();

  const _onDatePicked = (date) => {
    if (!!startDate && DateUtils.isDayBefore(date, startDate)) {
      return false;
    }

    const newDate = moment(date).toObject();

    return onChange(moment({
      ...initialDateTime,
      years: newDate.years,
      months: newDate.months,
      date: newDate.date,
    }).format(DATE_TIME_FORMATS.default));
  };

  return (
    <DatePicker date={dateTime}
                onChange={_onDatePicked}
                fromDate={startDate} />
  );
};

AbsoluteDatePicker.propTypes = {
  dateTime: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
};

AbsoluteDatePicker.defaultProps = {
  onChange: () => {},
  startDate: undefined,
};

export default AbsoluteDatePicker;
