import PropTypes from "prop-types";
import Label, { labelTypes } from "../../atoms/Label";
import SelectInput from "../../atoms/SelectInput";

const hours = [
  { name: '12 am', value: 0 },
  { name: '1 am', value: 1 },
  { name: '2 am', value: 2 },
  { name: '3 am', value: 3 },
  { name: '4 am', value: 4 },
  { name: '5 am', value: 5 },
  { name: '6 am', value: 6 },
  { name: '7 am', value: 7 },
  { name: '8 am', value: 8 },
  { name: '9 am', value: 9 },
  { name: '10 am', value: 10 },
  { name: '11 am', value: 11 },
  { name: '12 pm', value: 12 },
  { name: '1 pm', value: 1 },
  { name: '2 pm', value: 2 },
  { name: '3 pm', value: 3 },
  { name: '4 pm', value: 4 },
  { name: '5 pm', value: 5 },
  { name: '6 pm', value: 6 },
  { name: '7 pm', value: 7 },
  { name: '8 pm', value: 8 },
  { name: '9 pm', value: 9 },
  { name: '10 pm', value: 10 },
  { name: '11 pm', value: 11 },
];

const hoursEU = [
  { name: '12', value: 12 },
  { name: '13', value: 13 },
  { name: '14', value: 14 },
  { name: '15', value: 15 },
  { name: '16', value: 16 },
  { name: '17', value: 17 },
  { name: '18', value: 18 },
  { name: '19', value: 19 },
  { name: '20', value: 20 },
  { name: '21', value: 21 },
  { name: '22', value: 22 },
  { name: '23', value: 23 },
  { name: '24', value: 24 },
];

const minutes = [
  { name: '00', value: 0 },
  { name: '01', value: 1 },
  { name: '02', value: 2 },
  { name: '03', value: 3 },
  { name: '04', value: 4 },
  { name: '05', value: 5 },
  { name: '06', value: 6 },
  { name: '07', value: 7 },
  { name: '08', value: 8 },
  { name: '09', value: 9 },
  { name: '10', value: 10 },
  { name: '11', value: 11 },
  { name: '12', value: 12 },
  { name: '13', value: 13 },
  { name: '14', value: 14 },
  { name: '15', value: 15 },
  { name: '16', value: 16 },
  { name: '17', value: 17 },
  { name: '18', value: 18 },
  { name: '19', value: 19 },
  { name: '20', value: 20 },
  { name: '21', value: 21 },
  { name: '22', value: 22 },
  { name: '23', value: 23 },
  { name: '24', value: 24 },
  { name: '25', value: 25 },
  { name: '26', value: 26 },
  { name: '27', value: 27 },
  { name: '28', value: 28 },
  { name: '29', value: 29 },
  { name: '30', value: 30 },
  { name: '31', value: 31 },
  { name: '32', value: 32 },
  { name: '33', value: 33 },
  { name: '34', value: 34 },
  { name: '35', value: 35 },
  { name: '36', value: 36 },
  { name: '37', value: 37 },
  { name: '38', value: 38 },
  { name: '39', value: 39 },
  { name: '40', value: 40 },
  { name: '41', value: 41 },
  { name: '42', value: 42 },
  { name: '43', value: 43 },
  { name: '44', value: 44 },
  { name: '45', value: 45 },
  { name: '46', value: 46 },
  { name: '47', value: 47 },
  { name: '48', value: 48 },
  { name: '49', value: 49 },
  { name: '50', value: 50 },
  { name: '51', value: 51 },
  { name: '52', value: 52 },
  { name: '53', value: 53 },
  { name: '54', value: 54 },
  { name: '55', value: 55 },
  { name: '56', value: 56 },
  { name: '57', value: 57 },
  { name: '58', value: 58 },
  { name: '59', value: 59 },
  { name: '60', value: 60 }
];

function TimeInput({ paddingStyle, disableFocus }) {
  return (
    <div className={`flex flex-col gap-16 420:gap-24 ${paddingStyle}`}>

      {/* From */}
      <div>
        <Label size={labelTypes.big} as={labelTypes.h3} center>From</Label>
        <div className="flex gap-32">
          <SelectInput
            name="hour"
            options={hoursEU}
            smallLabel="Hour"
            widthStyle="w-80 420:w-96"
            disableFocus={disableFocus}
          />

          <SelectInput
            name="minute"
            options={minutes}
            smallLabel="Minute"
            widthStyle="w-80 420:w-96"
            disableFocus={disableFocus}
          />
        </div>
      </div>

      {/* To */}
      <div>
        <Label size={labelTypes.big} as={labelTypes.h3} center>To</Label>
        <div className="flex gap-32">
          <SelectInput
            name="hour"
            options={hoursEU}
            smallLabel="Hour"
            widthStyle="w-80 420:w-96"
            disableFocus={disableFocus}
          />

          <SelectInput
            name="minute"
            options={minutes}
            smallLabel="Minute"
            widthStyle="w-80 420:w-96"
            disableFocus={disableFocus}
          />
        </div>
      </div>

    </div>
  );
}

TimeInput.propTypes = {
  paddingStyle: PropTypes.string,
  disableFocus: PropTypes.bool
};

export default TimeInput;