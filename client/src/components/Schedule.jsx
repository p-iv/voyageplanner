import { useState } from "react";
import styles from "./Schedule.module.scss";
import { DatePicker, Space } from "antd";
import Button from "./UI/Button";
import { useTrip } from "../context/NewTripContext";
const { RangePicker } = DatePicker;

function Schedule() {
  const [date, setDate] = useState("");
  const { handleSubmitTrip } = useTrip();

  return (
    <div className={styles.schedule}>
      <h1>3 Step: Plan Your Schedule </h1>
      <Space direction="vertical" size={12}>
        <RangePicker
          className={styles.datePicker}
          showTime={{
            format: "HH:mm",
          }}
          format="YYYY-MM-DD HH:mm"
          onChange={(newDate) => {
            console.log(newDate);
            setDate(newDate);
          }}
        />
      </Space>
      <Button type="primary">Confirm Date</Button>
      <Button onClick={handleSubmitTrip} type="primary">
        Confirm Trip
      </Button>
    </div>
  );
}

export default Schedule;
