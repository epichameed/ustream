import * as React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      size="small"
      onClick={() => setOpen?.((prev) => !prev)}
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: "fit-content", backgroundColor: "white" }}
    >
      {label ? `${label}` : "Pick a date"}
    </Button>
  );
}

ButtonField.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputProps: PropTypes.shape({
    "aria-label": PropTypes.string,
  }),
  InputProps: PropTypes.shape({
    endAdornment: PropTypes.node,
    startAdornment: PropTypes.node,
  }),
  label: PropTypes.node,
  setOpen: PropTypes.func,
};

export default function CustomDatePicker({ value, onDateChange }) {
  const [selectedValue, setSelectedValue] = React.useState(dayjs()); // Use the incoming value as the initial state
  const [open, setOpen] = React.useState(false);

  // Trigger onDateChange on mount with the initial value
  useEffect(() => {
    if (onDateChange && typeof onDateChange === "function") {
      onDateChange(selectedValue); // Send the initial value to the parent
    }
  }, []); // This runs only on component mount

  // Update the parent whenever the selected value changes
  useEffect(() => {
    console.log("Selected value:", selectedValue);
    if (onDateChange && typeof onDateChange === "function") {
      onDateChange(selectedValue); // Notify the parent on value change
    }
  }, [selectedValue, onDateChange]); // Listen to changes in selectedValue

  // Set minDate to March 2024
  const minDate = dayjs("2024-03-01");
  const maxDate = dayjs(); // Maximum date is the current date

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedValue}
        label={
          selectedValue == null ? null : selectedValue.format("MMM DD, YYYY")
        }
        onChange={(newValue) => {
          setSelectedValue(newValue);
          console.log("New value selected:", newValue); // Log the selected date
        }}
        minDate={minDate} // Set minimum selectable date
        maxDate={maxDate} // Disable dates after the current date
        slots={{ field: ButtonField }}
        slotProps={{
          field: { setOpen },
          nextIconButton: { size: "small" },
          previousIconButton: { size: "small" },
        }}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        views={["day", "month", "year"]}
      />
    </LocalizationProvider>
  );
}

CustomDatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(dayjs)])
    .isRequired,
  onDateChange: PropTypes.func.isRequired, // Make sure the prop is required
};
